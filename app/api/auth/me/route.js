import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
 
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Non authentifié" }, 
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email
      }
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
