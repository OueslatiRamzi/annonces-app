import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  // Pas d'utilisateur connecté ? On retourne une réponse "propre"
  if (!session?.user) {
    return NextResponse.json(
      { user: null }, // ou {} si tu préfères
      { status: 200 } // pas une erreur, juste pas connecté
    );
  }

  // Utilisateur connecté
  return NextResponse.json({
    user: {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email
    }
  });
}
