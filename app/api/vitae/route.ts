import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, getDoc, serverTimestamp } from "firebase/firestore";
import cloudinary from "@/lib/cloudinary";
import { Vitae } from "@/lib/types";

// Utility to extract Cloudinary public_id from URL
const extractPublicIdFromUrl = (url: string): string => {
  try {
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];
    // Handle URLs with transformations like fl_attachment
    const cleanFileName = fileName.split(",")[0]; // Remove transformation parameters
    return cleanFileName.split(".")[0];
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return "";
  }
};

// Utility to validate file
const validatePDFFile = (file: File): boolean => {
  const validTypes = ['application/pdf'];
  const maxSize = 10 * 1024 * 1024; // 10MB
  
  if (!validTypes.includes(file.type)) {
    return false;
  }
  
  if (file.size > maxSize) {
    return false;
  }
  
  return true;
};

// Utility to upload file to Cloudinary
const uploadToCloudinary = async (file: File): Promise<{ secure_url: string; public_id: string }> => {
  const buffer = Buffer.from(await file.arrayBuffer());
  
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { 
          resource_type: "raw", 
          folder: "vitae", 
          access_mode: "public",
          // Let Cloudinary generate the public_id automatically
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            reject(error);
          } else if (result) {
            resolve(result);
          } else {
            reject(new Error("No result from Cloudinary"));
          }
        }
      )
      .end(buffer);
  });
};

// Utility to delete from Cloudinary
const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    // Don't throw here - we still want to delete from database even if Cloudinary fails
  }
};

export async function GET() {
  try {
    const vitaeCol = collection(db, "vitae");
    const vitaeSnapshot = await getDocs(vitaeCol);
    
    const vitae = vitaeSnapshot.docs.map((docSnapshot) => {
      const data = docSnapshot.data();
      return {
        id: docSnapshot.id,
        name: data.name || '', // Valeur par défaut si manquant
        file: data.file || '', // Valeur par défaut si manquant
        publicId: data.publicId || undefined,
        createdAt: data.createdAt?.toDate ? 
          data.createdAt.toDate().toISOString() : 
          data.createdAt || undefined,
        updatedAt: data.updatedAt?.toDate ? 
          data.updatedAt.toDate().toISOString() : 
          data.updatedAt || undefined,
      } as Vitae;
    });
    
    return NextResponse.json({ success: true, data: vitae });
  } catch (error) {
    console.error("GET /api/vitae error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch vitae" }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const file = formData.get("file") as File;

    // Validate inputs
    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Le nom est requis" }, 
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Le fichier est requis" }, 
        { status: 400 }
      );
    }

    // Validate file
    if (!validatePDFFile(file)) {
      return NextResponse.json(
        { success: false, error: "Seuls les fichiers PDF de moins de 10MB sont autorisés" }, 
        { status: 400 }
      );
    }

    // Check if a CV with the same name already exists
    const vitaeCol = collection(db, "vitae");
    const q = query(vitaeCol, where("name", "==", name.trim()));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return NextResponse.json(
        { success: false, error: "Un CV avec ce nom existe déjà" }, 
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(file);

    // For raw files, use the secure_url directly - don't modify it
    const fileUrl = uploadResult.secure_url;

    // Save to Firestore with serverTimestamp
    const vitaeData = { 
      name: name.trim(), 
      file: fileUrl,
      publicId: uploadResult.public_id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    const docRef = await addDoc(vitaeCol, vitaeData);
    
    // Return the created document with string timestamp for JSON serialization
    const response = {
      id: docRef.id,
      ...vitaeData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json({ success: true, data: response }, { status: 201 });
  } catch (error) {
    console.error("POST /api/vitae error:", error);
    return NextResponse.json(
      { success: false, error: "Échec du téléversement du CV" }, 
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const file = formData.get("file") as File | null;

    // Validate inputs
    if (!id) {
      return NextResponse.json(
        { success: false, error: "L'ID est requis" }, 
        { status: 400 }
      );
    }

    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Le nom est requis" }, 
        { status: 400 }
      );
    }

    // Check if document exists
    const vitaeDocRef = doc(db, "vitae", id);
    const vitaeDoc = await getDoc(vitaeDocRef);
    
    if (!vitaeDoc.exists()) {
      return NextResponse.json(
        { success: false, error: "CV non trouvé" }, 
        { status: 404 }
      );
    }

    const existingData = vitaeDoc.data();
    let fileUrl = existingData.file;
    let publicId = existingData.publicId;

    // If new file is provided
    if (file) {
      // Validate new file
      if (!validatePDFFile(file)) {
        return NextResponse.json(
          { success: false, error: "Seuls les fichiers PDF de moins de 10MB sont autorisés" }, 
          { status: 400 }
        );
      }

      // Delete old file from Cloudinary if it exists
      if (existingData.publicId) {
        await deleteFromCloudinary(existingData.publicId);
      } else if (existingData.file) {
        // Fallback: extract public ID from URL
        const oldPublicId = extractPublicIdFromUrl(existingData.file);
        if (oldPublicId) {
          await deleteFromCloudinary(`vitae/${oldPublicId}`);
        }
      }

      // Upload new file
      const uploadResult = await uploadToCloudinary(file);
      fileUrl = uploadResult.secure_url;
      publicId = uploadResult.public_id;
    }

    // Check if name is being changed and if it conflicts with existing names
    if (name.trim() !== existingData.name) {
      const vitaeCol = collection(db, "vitae");
      const q = query(vitaeCol, where("name", "==", name.trim()));
      const querySnapshot = await getDocs(q);
      
      // Check if another document (not the current one) has the same name
      const conflictingDocs = querySnapshot.docs.filter(doc => doc.id !== id);
      if (conflictingDocs.length > 0) {
        return NextResponse.json(
          { success: false, error: "Un CV avec ce nom existe déjà" }, 
          { status: 400 }
        );
      }
    }

    // Update document
    const updatedData = { 
      name: name.trim(), 
      file: fileUrl,
      publicId,
      updatedAt: serverTimestamp(),
    };
    
    await updateDoc(vitaeDocRef, updatedData);
    
    // Return updated document
    const response = {
      id,
      ...existingData,
      ...updatedData,
      updatedAt: new Date().toISOString(),
    };
    
    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.error("PUT /api/vitae error:", error);
    return NextResponse.json(
      { success: false, error: "Échec de la mise à jour du CV" }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    // Validate input
    if (!id) {
      return NextResponse.json(
        { success: false, error: "L'ID est requis" }, 
        { status: 400 }
      );
    }

    // Check if document exists and get its data
    const vitaeDocRef = doc(db, "vitae", id);
    const vitaeDoc = await getDoc(vitaeDocRef);
    
    if (!vitaeDoc.exists()) {
      return NextResponse.json(
        { success: false, error: "CV non trouvé" }, 
        { status: 404 }
      );
    }

    const vitaeData = vitaeDoc.data();

    // Delete file from Cloudinary
    if (vitaeData.publicId) {
      await deleteFromCloudinary(vitaeData.publicId);
    } else if (vitaeData.file) {
      // Fallback: extract public ID from URL
      const publicId = extractPublicIdFromUrl(vitaeData.file);
      if (publicId) {
        await deleteFromCloudinary(`vitae/${publicId}`);
      }
    }

    // Delete document from Firestore
    await deleteDoc(vitaeDocRef);
    
    return NextResponse.json({ success: true, message: "CV supprimé avec succès" });
  } catch (error) {
    console.error("DELETE /api/vitae error:", error);
    return NextResponse.json(
      { success: false, error: "Échec de la suppression du CV" }, 
      { status: 500 }
    );
  }
}