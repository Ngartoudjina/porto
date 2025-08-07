import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { Resend } from "resend";

// Initialiser Resend avec la clé API
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Valider l'email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Adresse email invalide" }, { status: 400 });
    }

    // Vérifier si l'email existe déjà dans Firestore
    const newsletterCol = collection(db, "newsletter");
    const q = query(newsletterCol, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return NextResponse.json({ error: "Cet email est déjà inscrit" }, { status: 400 });
    }

    // Enregistrer l'email dans Firestore
    const docRef = await addDoc(newsletterCol, {
      email,
      subscribedAt: new Date().toISOString(),
    });

    // Envoyer un email de notification à l'administrateur
    try {
      await resend.emails.send({
        from: "Newsletter <onboarding@resend.dev>",
        to: process.env.ADMIN_EMAIL || "andresenou03@gmail.com",
        subject: "Nouvelle inscription à la newsletter",
        html: `
          <h2>Nouvelle inscription</h2>
          <p>Un nouvel utilisateur s'est inscrit à votre newsletter :</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Date :</strong> ${new Date().toLocaleString('fr-FR')}</p>
        `,
      });
    } catch (emailError) {
      console.error("Erreur lors de l'envoi de l'email de notification:", emailError);
      // Ne pas bloquer la réponse si l'email échoue
    }

    return NextResponse.json({ message: "Inscription réussie", id: docRef.id });
  } catch (error) {
    console.error("POST /api/newsletter error:", error);
    return NextResponse.json({ error: "Échec de l'inscription à la newsletter" }, { status: 500 });
  }
}