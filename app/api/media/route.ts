import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc, query, where, serverTimestamp } from "firebase/firestore";
import cloudinary from "@/lib/cloudinary";
import { Media } from "@/lib/types";

// Configuration des timeouts - optimisés pour éviter les timeouts
const CLOUDINARY_TIMEOUT = 300000; // 5 minutes
const API_TIMEOUT = 320000; // 5 minutes 20 secondes
const FIRESTORE_TIMEOUT = 30000; // 30 secondes pour Firestore

// Utility to extract Cloudinary public_id from URL
const extractPublicIdFromUrl = (url: string): string => {
  try {
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];
    return fileName.split(".")[0];
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return "";
  }
};

// Utility to validate video file
const validateVideoFile = (file: File): { isValid: boolean; error?: string } => {
  const validTypes = ['video/mp4', 'video/webm', 'video/mov', 'video/avi', 'video/quicktime'];
  const maxSize = 100 * 1024 * 1024; // 100MB

  if (!validTypes.includes(file.type)) {
    return { isValid: false, error: "Format supporté: MP4, WebM, MOV, AVI uniquement" };
  }

  if (file.size > maxSize) {
    return { isValid: false, error: "Taille maximale: 100MB" };
  }

  return { isValid: true };
};

// Upload ultra-optimisé vers Cloudinary avec configuration spéciale pour éviter les timeouts
const uploadVideoToCloudinary = async (file: File): Promise<{
  secure_url: string; 
  public_id: string; 
  duration: number;
  width: number;
  height: number;
  format: string;
  bytes: number;
}> => {
  console.log("Starting Cloudinary upload...");
  const buffer = Buffer.from(await file.arrayBuffer());
  
  return new Promise((resolve, reject) => {
    // Timeout de sécurité
    const timeout = setTimeout(() => {
      console.error("Cloudinary upload timeout after 5 minutes");
      reject(new Error('Upload timeout - file too large or slow connection'));
    }, CLOUDINARY_TIMEOUT);

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video",
        folder: "media",
        // Configuration ULTRA optimisée pour éviter les timeouts
        transformation: {
          quality: "auto:low", // Qualité réduite pour vitesse
          width: 854, // Résolution modérée (480p)
          height: 480,
          crop: "limit",
          format: "mp4",
          video_codec: "h264", // Codec efficace
          audio_codec: "aac", // Codec audio efficace
          bit_rate: "1000k", // Bitrate contrôlé
        },
        // Options pour éviter les timeouts
        chunk_size: 6000000, // 6MB chunks pour upload progressif
        timeout: CLOUDINARY_TIMEOUT,
        use_filename: false,
        unique_filename: true,
        overwrite: false,
        eager_async: true, // Upload asynchrone pour plus de rapidité
        notification_url: undefined,
        invalidate: false,
        // Désactiver les features coûteuses
        faces: false,
        colors: false,
        image_metadata: false,
        phash: false,
      },
      (error, result) => {
        clearTimeout(timeout);
        
        if (error) {
          console.error("Cloudinary upload error:", error);
          
          // Messages d'erreur plus spécifiques
          let errorMessage = "Upload failed";
          if (error.message?.includes('timeout') || error.http_code === 499) {
            errorMessage = "Upload timeout - try with a smaller file or better connection";
          } else if (error.http_code === 413) {
            errorMessage = "File too large";
          } else if (error.message?.includes('Invalid')) {
            errorMessage = "Invalid file format";
          }
          
          reject(new Error(errorMessage));
        } else if (result) {
          console.log("Cloudinary upload successful:", {
            public_id: result.public_id,
            duration: result.duration,
            bytes: result.bytes
          });
          
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
            duration: result.duration || 0,
            width: result.width || 0,
            height: result.height || 0,
            format: result.format || 'mp4',
            bytes: result.bytes || 0
          });
        } else {
          reject(new Error("No result from Cloudinary"));
        }
      }
    );

    uploadStream.end(buffer);
  });
};

// Suppression sécurisée de Cloudinary
const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    const result = await Promise.race([
      cloudinary.uploader.destroy(publicId, { resource_type: "video" }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Delete timeout')), 15000)
      )
    ]);
    console.log(`Video deleted from Cloudinary: ${publicId}`);
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    // Continue silently - deletion n'est pas critique pour l'utilisateur
  }
};

// Version optimisée de vérification de titre avec retry
const checkTitleExists = async (title: string, excludeId?: string, retryCount = 0): Promise<boolean> => {
  const maxRetries = 2;
  
  try {
    console.log(`Checking title uniqueness (attempt ${retryCount + 1})...`);
    
    const mediaCol = collection(db, "media");
    const q = query(mediaCol, where("title", "==", title.trim()));
    
    const querySnapshot = await Promise.race([
      getDocs(q),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Firestore timeout')), FIRESTORE_TIMEOUT)
      )
    ]) as any;
    
    let exists = false;
    if (excludeId) {
      const conflictingDocs = querySnapshot.docs.filter((doc: any) => doc.id !== excludeId);
      exists = conflictingDocs.length > 0;
    } else {
      exists = !querySnapshot.empty;
    }
    
    console.log(`Title check result: ${exists ? 'exists' : 'available'}`);
    return exists;
    
  } catch (error) {
    console.error(`Title check attempt ${retryCount + 1} failed:`, error);
    
    // Vérification de type pour l'erreur
    if (retryCount < maxRetries && error instanceof Error && error.message?.includes('timeout')) {
      console.log(`Retrying title check... (${retryCount + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s
      return checkTitleExists(title, excludeId, retryCount + 1);
    }
    
    console.warn("Title check failed, allowing creation (fail-safe mode)");
    return false; // En cas d'erreur persistante, on permet la création
  }
};

export async function GET() {
  try {
    const mediaCol = collection(db, "media");
    const mediaSnapshot = await getDocs(mediaCol);
    
    const media = mediaSnapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      ...docSnapshot.data(),
      createdAt: docSnapshot.data().createdAt?.toDate ? 
        docSnapshot.data().createdAt.toDate().toISOString() : 
        docSnapshot.data().createdAt || null,
      updatedAt: docSnapshot.data().updatedAt?.toDate ? 
        docSnapshot.data().updatedAt.toDate().toISOString() : 
        docSnapshot.data().updatedAt || null,
    } as Media));
    
    return NextResponse.json({ success: true, data: media });
  } catch (error) {
    console.error("GET /api/media error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch media" }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  let apiTimeout: NodeJS.Timeout | null = null;

  try {
    // Timeout global pour l'API
    apiTimeout = setTimeout(() => {
      throw new Error(`API timeout after ${API_TIMEOUT/1000} seconds`);
    }, API_TIMEOUT);

    console.log("Starting video upload process...");
    
    // Vérification du Content-Type
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('multipart/form-data')) {
      if (apiTimeout) clearTimeout(apiTimeout);
      return NextResponse.json(
        { success: false, error: "Content-Type doit être multipart/form-data" }, 
        { status: 400 }
      );
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch (error) {
      console.error("FormData parsing error:", error);
      if (apiTimeout) clearTimeout(apiTimeout);
      return NextResponse.json(
        { success: false, error: "Erreur de parsing des données du formulaire" }, 
        { status: 400 }
      );
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const src = formData.get("src") as File;

    console.log("Received data:", {
      title: title?.substring(0, 50),
      description: description?.substring(0, 50),
      category,
      fileSize: src?.size,
      fileName: src?.name,
      fileType: src?.type
    });

    // Validations rapides
    if (!title?.trim()) {
      if (apiTimeout) clearTimeout(apiTimeout);
      return NextResponse.json(
        { success: false, error: "Le titre est requis" }, 
        { status: 400 }
      );
    }

    if (!src || !(src instanceof File)) {
      if (apiTimeout) clearTimeout(apiTimeout);
      return NextResponse.json(
        { success: false, error: "Le fichier vidéo est requis" }, 
        { status: 400 }
      );
    }

    console.log(`File details: ${src.name}, Size: ${(src.size / (1024*1024)).toFixed(2)}MB, Type: ${src.type}`);

    const validation = validateVideoFile(src);
    if (!validation.isValid) {
      if (apiTimeout) clearTimeout(apiTimeout);
      return NextResponse.json(
        { success: false, error: validation.error }, 
        { status: 400 }
      );
    }

    // STRATÉGIE OPTIMISÉE : Upload d'abord, vérification de titre après
    // Cela évite d'attendre Firestore avant l'upload
    console.log("Starting upload to Cloudinary (parallel with title check)...");
    
    // Lancer l'upload et la vérification de titre en parallèle
    const [uploadResult, titleExists] = await Promise.all([
      uploadVideoToCloudinary(src),
      checkTitleExists(title.trim())
    ]);

    console.log("Upload completed, checking title conflict...");
    
    if (titleExists) {
      console.log("Title conflict detected, cleaning up uploaded file...");
      // Nettoyage en arrière-plan (non bloquant)
      deleteFromCloudinary(uploadResult.public_id).catch(console.error);
      
      if (apiTimeout) clearTimeout(apiTimeout);
      return NextResponse.json(
        { success: false, error: "Une vidéo avec ce titre existe déjà" }, 
        { status: 400 }
      );
    }

    // Sauvegarde dans Firestore
    const mediaData = {
      title: title.trim(),
      description: description?.trim() || "",
      src: uploadResult.secure_url,
      category: category?.trim() || "general",
      duration: uploadResult.duration || 0,
      views: 0,
      publicId: uploadResult.public_id,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format,
      fileSize: uploadResult.bytes,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    console.log("Saving to Firestore...");
    const mediaCol = collection(db, "media");
    
    // Sauvegarde avec timeout
    const docRef = await Promise.race([
      addDoc(mediaCol, mediaData),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Firestore save timeout')), FIRESTORE_TIMEOUT)
      )
    ]) as any;
    
    console.log("Firestore save completed:", docRef.id);
    
    if (apiTimeout) clearTimeout(apiTimeout);

    const response = {
      id: docRef.id,
      ...mediaData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, data: response }, { status: 201 });
    
  } catch (error) {
    if (apiTimeout) clearTimeout(apiTimeout);
    console.error("POST /api/media error:", error);
    
    let errorMessage = "Échec du téléversement de la vidéo";
    let statusCode = 500;
    
    if (error instanceof Error) {
      const errorMsg = error.message.toLowerCase();
      
      if (errorMsg.includes('timeout')) {
        errorMessage = "Timeout: Fichier trop volumineux ou connexion lente. Essayez avec un fichier plus petit.";
        statusCode = 408;
      } else if (errorMsg.includes('too large') || errorMsg.includes('413')) {
        errorMessage = "Fichier trop volumineux. Maximum 100MB.";
        statusCode = 413;
      } else if (errorMsg.includes('network') || errorMsg.includes('connection')) {
        errorMessage = "Erreur de réseau. Vérifiez votre connexion internet.";
        statusCode = 502;
      } else if (errorMsg.includes('invalid') || errorMsg.includes('format')) {
        errorMessage = "Format de fichier non supporté.";
        statusCode = 400;
      }
    }
    
    return NextResponse.json(
      { success: false, error: errorMessage, details: error.message }, 
      { status: statusCode }
    );
  }
}

export async function PUT(request: Request) {
  let apiTimeout: NodeJS.Timeout | null = null;

  try {
    apiTimeout = setTimeout(() => {
      throw new Error(`API timeout after ${API_TIMEOUT/1000} seconds`);
    }, API_TIMEOUT);

    const formData = await request.formData();
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const src = formData.get("src") as File | null;

    if (!id || !title?.trim()) {
      if (apiTimeout) clearTimeout(apiTimeout);
      return NextResponse.json(
        { success: false, error: "ID et titre requis" }, 
        { status: 400 }
      );
    }

    const mediaDocRef = doc(db, "media", id);
    const mediaDoc = await getDoc(mediaDocRef);
    
    if (!mediaDoc.exists()) {
      if (apiTimeout) clearTimeout(apiTimeout);
      return NextResponse.json(
        { success: false, error: "Vidéo non trouvée" }, 
        { status: 404 }
      );
    }

    const existingData = mediaDoc.data();
    let updateData = {
      title: title.trim(),
      description: description?.trim() || "",
      category: category?.trim() || "general",
      updatedAt: serverTimestamp(),
    } as any;

    // Si nouveau fichier vidéo
    if (src && src instanceof File) {
      const validation = validateVideoFile(src);
      if (!validation.isValid) {
        if (apiTimeout) clearTimeout(apiTimeout);
        return NextResponse.json(
          { success: false, error: validation.error }, 
          { status: 400 }
        );
      }

      console.log("Uploading new video file...");
      const uploadResult = await uploadVideoToCloudinary(src);
      
      updateData = {
        ...updateData,
        src: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
        fileSize: uploadResult.bytes,
        duration: uploadResult.duration,
      };

      // Nettoyage ancien fichier en arrière-plan
      if (existingData.publicId) {
        deleteFromCloudinary(existingData.publicId).catch(console.error);
      }
    }

    // Vérification titre si changé
    if (title.trim() !== existingData.title) {
      const titleExists = await checkTitleExists(title.trim(), id);
      if (titleExists) {
        // Nettoyage si nouveau fichier uploadé
        if (src && updateData.publicId) {
          deleteFromCloudinary(updateData.publicId).catch(console.error);
        }
        
        if (apiTimeout) clearTimeout(apiTimeout);
        return NextResponse.json(
          { success: false, error: "Une vidéo avec ce titre existe déjà" }, 
          { status: 400 }
        );
      }
    }

    await updateDoc(mediaDocRef, updateData);
    
    if (apiTimeout) clearTimeout(apiTimeout);

    const response = {
      id,
      ...existingData,
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    if (apiTimeout) clearTimeout(apiTimeout);
    console.error("PUT /api/media error:", error);
    return NextResponse.json(
      { success: false, error: "Échec de la mise à jour de la vidéo" }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "L'ID est requis" }, 
        { status: 400 }
      );
    }

    const mediaDocRef = doc(db, "media", id);
    const mediaDoc = await getDoc(mediaDocRef);
    
    if (!mediaDoc.exists()) {
      return NextResponse.json(
        { success: false, error: "Vidéo non trouvée" }, 
        { status: 404 }
      );
    }

    const mediaData = mediaDoc.data();

    // Suppression en parallèle
    const deletionPromises = [deleteDoc(mediaDocRef)];

    if (mediaData.publicId) {
      deletionPromises.push(deleteFromCloudinary(mediaData.publicId));
    }

    await Promise.allSettled(deletionPromises);
    
    return NextResponse.json({ success: true, message: "Vidéo supprimée avec succès" });
  } catch (error) {
    console.error("DELETE /api/media error:", error);
    return NextResponse.json(
      { success: false, error: "Échec de la suppression de la vidéo" }, 
      { status: 500 }
    );
  }
}