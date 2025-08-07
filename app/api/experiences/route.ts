import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import cloudinary from "@/lib/cloudinary";
import { Experience } from "@/lib/types";

export async function GET() {
  try {
    const experiencesCol = collection(db, "experiences");
    const experienceSnapshot = await getDocs(experiencesCol);
    const experiences = experienceSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Experience));
    console.log("Experiences fetched:", experiences); // Debugging log
    return NextResponse.json({ success: true, data: experiences });
  } catch (error) {
    console.error("GET /api/experiences error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch experiences", data: [] }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const subject = formData.get("subject") as string;
    const verified = formData.get("verified") === "true";
    const image = formData.get("image") as File;

    // Validate image type
    if (!image.type.includes("image")) {
      return NextResponse.json({ success: false, error: "Only image files are allowed" }, { status: 400 });
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: "experiences",
            transformation: [
              { quality: "auto:good", fetch_format: "auto" },
              { width: 1200, crop: "scale" },
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    }) as { secure_url: string; public_id: string };

    const experienceData: Omit<Experience, "id"> = { name, subject, image: uploadResult.secure_url, verified };
    const docRef = await addDoc(collection(db, "experiences"), experienceData);
    console.log("Experience created:", { id: docRef.id, ...experienceData }); // Debugging log
    return NextResponse.json({ success: true, data: { id: docRef.id, ...experienceData } });
  } catch (error) {
    console.error("POST /api/experiences error:", error);
    return NextResponse.json({ success: false, error: "Failed to create experience" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const subject = formData.get("subject") as string;
    const verified = formData.get("verified") === "true";
    const image = formData.get("image") as File | string;

    let imageUrl: string;
    if (image instanceof File) {
      // Validate image type
      if (!image.type.includes("image")) {
        return NextResponse.json({ success: false, error: "Only image files are allowed" }, { status: 400 });
      }

      // Delete old image if it exists
      const experienceDoc = await getDoc(doc(db, "experiences", id));
      if (experienceDoc.exists() && experienceDoc.data().image) {
        const publicId = experienceDoc.data().image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`experiences/${publicId}`, { resource_type: "image" });
      }

      const buffer = Buffer.from(await image.arrayBuffer());
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              folder: "experiences",
              transformation: [
                { quality: "auto:good", fetch_format: "auto" },
                { width: 1200, crop: "scale" },
              ],
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      }) as { secure_url: string };
      imageUrl = uploadResult.secure_url;
    } else {
      imageUrl = image;
    }

    const experienceData: Omit<Experience, "id"> = { name, subject, image: imageUrl, verified };
    await updateDoc(doc(db, "experiences", id), experienceData);
    console.log("Experience updated:", { id, ...experienceData }); // Debugging log
    return NextResponse.json({ success: true, data: { id, ...experienceData } });
  } catch (error) {
    console.error("PUT /api/experiences error:", error);
    return NextResponse.json({ success: false, error: "Failed to update experience" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const experienceDoc = await getDoc(doc(db, "experiences", id));
    if (experienceDoc.exists() && experienceDoc.data().image) {
      const publicId = experienceDoc.data().image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`experiences/${publicId}`, { resource_type: "image" });
    }
    await deleteDoc(doc(db, "experiences", id));
    console.log("Experience deleted:", id); // Debugging log
    return NextResponse.json({ success: true, message: "Experience deleted" });
  } catch (error) {
    console.error("DELETE /api/experiences error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete experience" }, { status: 500 });
  }
}