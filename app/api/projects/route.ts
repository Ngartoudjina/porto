import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, getDoc } from "firebase/firestore";
import cloudinary from "@/lib/cloudinary";
import { Project } from "@/lib/types";

// Liste des logiciels disponibles
const AVAILABLE_SOFTWARES = [
  "Matlab",
  "AutoCAD",
  "Proteus",
  "PVsyst",
  "EasyEDA",
  "Fusion 360",
  "TRNSYS",
  "LTspice",
  "TopSolid",
  "SimulIDE",
  "FreeCAD",
  "TRNBuild",
  "RETScreen Expert",
  "Bitzer Software",
  "Arduino",
];

export async function GET() {
  try {
    const projectsCol = collection(db, "projects");
    const projectSnapshot = await getDocs(projectsCol);
    const projects = projectSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      softwares: doc.data().softwares || [], // Assurer la rétrocompatibilité
      createdAt: doc.data().createdAt?.toDate?.()
        ? doc.data().createdAt.toDate().toISOString()
        : doc.data().createdAt || null,
      updatedAt: doc.data().updatedAt?.toDate?.()
        ? doc.data().updatedAt.toDate().toISOString()
        : doc.data().updatedAt || null,
    } as Project));

    console.log("Projects fetched:", projects); // Journal pour débogage
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json(
      { success: false, error: "Échec de la récupération des projets", data: [] },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File | null;
    const softwares = formData.get("softwares") as string; // Chaîne JSON

    // Valider les logiciels
    let parsedSoftwares: string[] = [];
    if (softwares) {
      parsedSoftwares = JSON.parse(softwares);
      if (!Array.isArray(parsedSoftwares) || !parsedSoftwares.every((s) => AVAILABLE_SOFTWARES.includes(s))) {
        return NextResponse.json({ error: "Logiciels invalides" }, { status: 400 });
      }
    }

    let imageUrl: string | undefined;
    if (image) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              folder: "projects",
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
    }

    const projectData: Omit<Project, "id"> = {
      title,
      description,
      image: imageUrl,
      softwares: parsedSoftwares,
      createdAt: new Date().toISOString(), // Ajouter createdAt
      updatedAt: new Date().toISOString(), // Ajouter updatedAt
    };
    const docRef = await addDoc(collection(db, "projects"), projectData);
    console.log("Project created:", { id: docRef.id, ...projectData }); // Journal pour débogage
    return NextResponse.json({ success: true, data: { id: docRef.id, ...projectData } });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json({ success: false, error: "Échec de la création du projet" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File | string | null;
    const softwares = formData.get("softwares") as string; // Chaîne JSON

    // Valider les logiciels
    let parsedSoftwares: string[] = [];
    if (softwares) {
      parsedSoftwares = JSON.parse(softwares);
      if (!Array.isArray(parsedSoftwares) || !parsedSoftwares.every((s) => AVAILABLE_SOFTWARES.includes(s))) {
        return NextResponse.json({ error: "Logiciels invalides" }, { status: 400 });
      }
    }

    let imageUrl: string | undefined;
    if (image instanceof File) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: "image",
              folder: "projects",
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

      // Supprimer l'ancienne image si elle existe
      const projectDoc = await getDoc(doc(db, "projects", id));
      if (projectDoc.exists() && projectDoc.data().image) {
        const publicId = projectDoc.data().image.split("/").pop()?.split(".")[0];
        if (publicId) {
          await cloudinary.uploader.destroy(`projects/${publicId}`, { resource_type: "image" });
        }
      }
    } else {
      imageUrl = image as string | undefined;
    }

    const projectData: Omit<Project, "id"> = {
      title,
      description,
      image: imageUrl,
      softwares: parsedSoftwares,
      updatedAt: new Date().toISOString(), // Mettre à jour updatedAt
    };
    await updateDoc(doc(db, "projects", id), projectData);
    console.log("Project updated:", { id, ...projectData }); // Journal pour débogage
    return NextResponse.json({ success: true, data: { id, ...projectData } });
  } catch (error) {
    console.error("PUT /api/projects error:", error);
    return NextResponse.json({ success: false, error: "Échec de la mise à jour du projet" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const projectDoc = await getDoc(doc(db, "projects", id));
    if (projectDoc.exists() && projectDoc.data().image) {
      const publicId = projectDoc.data().image.split("/").pop()?.split(".")[0];
      if (publicId) {
        await cloudinary.uploader.destroy(`projects/${publicId}`, { resource_type: "image" });
      }
    }
    await deleteDoc(doc(db, "projects", id));
    console.log("Project deleted:", id); // Journal pour débogage
    return NextResponse.json({ success: true, message: "Projet supprimé" });
  } catch (error) {
    console.error("DELETE /api/projects error:", error);
    return NextResponse.json({ success: false, error: "Échec de la suppression du projet" }, { status: 500 });
  }
}