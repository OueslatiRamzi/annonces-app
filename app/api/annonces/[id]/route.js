import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };


// Récupérer une annonce par ID
export async function GET(req, context) { // <-- Modification ici
    try {
      // Extraction asynchrone des paramètres
      const { params } = await context; // <-- Await sur le contexte
      const id = parseInt(params.id);
      
      if (isNaN(id)) {
        return NextResponse.json({ error: "ID invalide" }, { status: 400 });
      }
  
      const annonce = await prisma.annonce.findUnique({
        where: { id },
        include: {
          user: { select: { id: true, name: true, image: true } },
          categorie: true
        },
      });
  
      if (!annonce) {
        return NextResponse.json({ error: "Annonce non trouvée" }, { status: 404 });
      }
  
      return NextResponse.json(annonce, { status: 200 });
    } catch (error) {
      console.error("Erreur GET annonce:", error);
      return NextResponse.json(
        { error: error.message || "Erreur serveur" },
        { status: 500 }
      );
    }
  }

// Modifier une annonce
export async function PUT(req, { params }) {
    try {
      const id = parseInt(params.id);
      if (isNaN(id)) {
        return NextResponse.json({ error: "ID invalide" }, { status: 400 });
      }
  
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) {
        return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
      }
  
      const data = await req.json();
      
      // Validation des champs requis
      const requiredFields = ['nom', 'description', 'prix', 'telephone', 'emplacement'];
      const missingFields = requiredFields.filter(field => !data[field]);
      if (missingFields.length > 0) {
        return NextResponse.json(
          { error: `Champs manquants: ${missingFields.join(', ')}` },
          { status: 400 }
        );
      }
  
      // Validation du format téléphone
      const phoneRegex = /^\d{8}$/;
      if (!phoneRegex.test(data.telephone)) {
        return NextResponse.json(
          { error: "Numéro invalide (8 chiffres requis)" },
          { status: 400 }
        );
      }
  
      // Traitement des images
      const imageUrls = Array.isArray(data.imageUrls) 
        ? data.imageUrls.filter(url => url.trim() !== "")
        : data.imageUrls.split(',').map(url => url.trim()).filter(url => url !== "");
        
      if (imageUrls.some(url => !isValidUrl(url))) {
        return NextResponse.json(
          { error: "Format d'URL d'image invalide" },
          { status: 400 }
        );
      }
  
      // Vérification des droits
      const annonceExistante = await prisma.annonce.findUnique({
        where: { id },
        select: { userId: true }
      });
      
      if (!annonceExistante) {
        return NextResponse.json({ error: "Annonce non trouvée" }, { status: 404 });
      }
      if (annonceExistante.userId !== session.user.id) {
        return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 });
      }
  
      // Gestion de la catégorie
      let category = await prisma.categorie.findFirst({
        where: { nom: { equals: data.categorie.trim(), mode: "insensitive" } }
      });
      
      if (!category) {
        category = await prisma.categorie.create({ 
          data: { nom: data.categorie.trim() } 
        });
      }
  
      // Mise à jour
      const annonceUpdated = await prisma.annonce.update({
        where: { id },
        data: {
          nom: data.nom,
          description: data.description,
          prix: parseInt(data.prix, 10),
          categorieId: category.id,
          telephone: data.telephone,
          emplacement: data.emplacement,
          imageUrls
        },
        include: { categorie: true }
      });
  
      return NextResponse.json(annonceUpdated, { status: 200 });
  
    } catch (error) {
      console.error("Erreur PUT:", error);
      return NextResponse.json(
        { error: error.message || "Erreur serveur" },
        { status: 500 }
      );
    }
  }

// Supprimer une annonce
export async function DELETE(req, { params }) {
  try {
    // Validation de l'ID
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // Vérification de l'annonce
    const annonce = await prisma.annonce.findUnique({
      where: { id },
      include: { categorie: true }
    });

    if (!annonce) {
      return NextResponse.json({ error: "Annonce non trouvée" }, { status: 404 });
    }

    // Vérification des droits
    if (annonce.userId !== session.user.id) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 });
    }

    // Suppression
    await prisma.annonce.delete({ where: { id } });

    return NextResponse.json(
      { message: "Annonce supprimée avec succès" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erreur DELETE annonce:", error);
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}