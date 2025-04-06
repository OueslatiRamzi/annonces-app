import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Assure-toi d'avoir `prisma.js` bien configuré dans `/lib/`

export async function GET() {
  try {
    const categories = await prisma.categorie.findMany();
    return NextResponse.json(categories);   
  } catch (error) {
    console.error("❌ [GET] Erreur récupération des catégories :", error);
    return NextResponse.json({ error: "Erreur récupération des catégories" }, { status: 500 });
  }
}
