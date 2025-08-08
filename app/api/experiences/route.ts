import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import cloudinary from "@/lib/cloudinary";
import { Experience } from "@/lib/types";

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

export async function GET() {
  try {
    const experiencesCol = collection(db, "experiences");
    const experienceSnapshot = await getDocs(experiencesCol);
    const experiences = experienceSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }) as Experience);
    
    return NextResponse.json({ 
      success: true, 
      data: experiences 
    });
  } catch (error) {
    console.error("GET /api/experiences error:", error);
    return NextResponse.json({ 
      success: false, 
      error: "Failed to fetch experiences",
      data: [] 
    }, { status: 500 });
  }
}

async function uploadImageToCloudinary(image: File): Promise<CloudinaryUploadResult> {
  const buffer = Buffer.from(await image.arrayBuffer());
  
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "experiences",
        transformation: [
          { quality: "auto:good", fetch_format: "auto" },
          { width: 1200, crop: "scale" },
        ],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (!result) {
          reject(new Error("No result from Cloudinary"));
        } else {
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id
          });
        }
      }
    ).end(buffer);
  });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const subject = formData.get("subject") as string;
    const verified = formData.get("verified") === "true";
    const image = formData.get("image") as File;

    if (!image || !image.type.includes("image")) {
      return NextResponse.json(
        { success: false, error: "Only image files are allowed" }, 
        { status: 400 }
      );
    }

    const { secure_url } = await uploadImageToCloudinary(image);

    const experienceData: Omit<Experience, "id"> = { 
      name, 
      subject, 
      image: secure_url, 
      verified 
    };

    const docRef = await addDoc(collection(db, "experiences"), experienceData);
    
    return NextResponse.json({ 
      success: true, 
      data: { id: docRef.id, ...experienceData } 
    });
  } catch (error) {
    console.error("POST /api/experiences error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create experience" }, 
      { status: 500 }
    );
  }
}

async function deleteCloudinaryImage(imageUrl: string): Promise<void> {
  try {
    const publicId = imageUrl.split("/").pop()?.split(".")[0];
    if (publicId) {
      await cloudinary.uploader.destroy(`experiences/${publicId}`, { 
        resource_type: "image" 
      });
    }
  } catch (error) {
    console.error("Error deleting Cloudinary image:", error);
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const subject = formData.get("subject") as string;
    const verified = formData.get("verified") === "true";
    const image = formData.get("image");

    let imageUrl: string;

    if (image instanceof File) {
      if (!image.type.includes("image")) {
        return NextResponse.json(
          { success: false, error: "Only image files are allowed" }, 
          { status: 400 }
        );
      }

      // Get existing image to delete
      const experienceDoc = await getDoc(doc(db, "experiences", id));
      if (experienceDoc.exists() && experienceDoc.data().image) {
        await deleteCloudinaryImage(experienceDoc.data().image);
      }

      const { secure_url } = await uploadImageToCloudinary(image);
      imageUrl = secure_url;
    } else {
      imageUrl = image as string;
    }

    const experienceData: Omit<Experience, "id"> = { 
      name, 
      subject, 
      image: imageUrl, 
      verified 
    };

    await updateDoc(doc(db, "experiences", id), experienceData);
    
    return NextResponse.json({ 
      success: true, 
      data: { id, ...experienceData } 
    });
  } catch (error) {
    console.error("PUT /api/experiences error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update experience" }, 
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    
    const experienceDoc = await getDoc(doc(db, "experiences", id));
    if (!experienceDoc.exists()) {
      return NextResponse.json(
        { success: false, error: "Experience not found" }, 
        { status: 404 }
      );
    }

    if (experienceDoc.data().image) {
      await deleteCloudinaryImage(experienceDoc.data().image);
    }

    await deleteDoc(doc(db, "experiences", id));
    
    return NextResponse.json({ 
      success: true, 
      message: "Experience deleted" 
    });
  } catch (error) {
    console.error("DELETE /api/experiences error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete experience" }, 
      { status: 500 }
    );
  }
}