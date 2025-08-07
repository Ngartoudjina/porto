import { NextResponse } from "next/server";
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const emailExists = await getDocs(collection(db, "subscribe"));
    const emails = emailExists.docs.map((doc) => doc.data().email);
    if (emails.includes(email)) {
      return NextResponse.json({ error: "Email already subscribed" }, { status: 400 });
    }

    await addDoc(collection(db, "subscribe"), {
      email,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: "Subscribed successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding email:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isAdmin = searchParams.get("isAdmin") === "true";

  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const querySnapshot = await getDocs(collection(db, "subscribe"));
    const emails = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(emails, { status: 200 });
  } catch (error) {
    console.error("Error fetching emails:", error);
    return NextResponse.json({ error: "Failed to fetch emails" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const isAdmin = searchParams.get("isAdmin") === "true";

  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    await deleteDoc(doc(db, "subscribe", id));
    return NextResponse.json({ message: "Email deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting email:", error);
    return NextResponse.json({ error: "Failed to delete email" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const isAdmin = searchParams.get("isAdmin") === "true";
  const { email } = await request.json();

  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!id || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid ID or email" }, { status: 400 });
  }

  try {
    const emailExists = await getDocs(collection(db, "subscribe"));
    const emails = emailExists.docs
      .filter((doc) => doc.id !== id)
      .map((doc) => doc.data().email);
    if (emails.includes(email)) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    await updateDoc(doc(db, "subscribe", id), {
      email,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: "Email updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating email:", error);
    return NextResponse.json({ error: "Failed to update email" }, { status: 500 });
  }
}