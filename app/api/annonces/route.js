import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import cloudinary from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


const prisma = new PrismaClient();

async function uploadWithRetry(image, retries = 3) {
  try {
    const buffer = Buffer.from(await image.arrayBuffer());
    const base64 = buffer.toString('base64');
    const dataURI = `data:${image.type};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "annonces",
      upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET // Nécessaire pour les uploads non signés
    });

    return result.secure_url;
  } catch (error) {
    console.log(`⚠️ [Retry ${retries}] Erreur upload :`, error);
    if (retries === 0) throw error;
    return uploadWithRetry(image, retries - 1);
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const formData = await req.formData();

    // Validation des images
    const images = formData.getAll("images");
    if (images.length < 1 || images.length > 3) {
      return NextResponse.json(
        { error: "Vous devez télécharger entre 1 et 3 images" },
        { status: 400 }
      );
    }

    // Validation catégorie
    const categoryName = formData.get("categorie")?.toString().trim();
    if (!categoryName) {
      return NextResponse.json(
        { error: "Nom de catégorie requis" },
        { status: 400 }
      );
    }

    // Gestion catégorie
    let category = await prisma.categorie.findFirst({
      where: { nom: { equals: categoryName, mode: "insensitive" } }
    }) || await prisma.categorie.create({ data: { nom: categoryName } });

    // Upload images
    const imageUrls = [];
    for (const image of images) {
      try {
        imageUrls.push(await uploadWithRetry(image));
      } catch (error) {
        console.error("Échec upload image :", error);
        return NextResponse.json(
          { error: "Échec de l'upload des images" },
          { status: 500 }
        );
      }
    }

    // Création annonce
    const annonce = await prisma.annonce.create({
      data: {
        nom: formData.get("nom").toString(),
        prix: parseInt(formData.get("prix"), 10),
        description: formData.get("description").toString(),
        categorieId: category.id,
        telephone: formData.get("telephone").toString(),
        emplacement: formData.get("emplacement").toString(),
        imageUrls,
        userId: session.user.id,
      },
    });

    return NextResponse.json(annonce, { status: 201 });

  } catch (error) {
    console.error("Erreur globale :", error);
    return NextResponse.json(
      { error: error.message || "Erreur serveur" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    // Validation et conversion des paramètres
    const page = Math.max(1, parseInt(params.page || "1", 10));
    const limit = 6;
    const skip = (page - 1) * limit;

    // Construction sécurisée du filtre
    const whereCondition = {
      ...(params.emplacement && { 
        emplacement: {
          equals: params.emplacement,
          mode: 'insensitive'
        }
      }),
      ...(params.categorieId && { 
        categorieId: Number(params.categorieId) 
      }),
      ...(params.userId && { userId: params.userId })
    };

    // Journalisation de débogage
    console.log("Requête annonces avec filtres :", JSON.stringify({
      whereCondition,
      page,
      limit
    }));

    const [annonces, total] = await Promise.all([
      prisma.annonce.findMany({
        skip,
        take: limit,
        where: whereCondition,
        orderBy: { createdAt: "desc" },
        include: {
          user: { select: { name: true, email: true } },
          categorie: true
        }
      }),
      prisma.annonce.count({ where: whereCondition })
    ]);

    return NextResponse.json({
      annonces: annonces.map(a => ({
        ...a,
        createdAt: a.createdAt.toISOString(),
        updatedAt: a.updatedAt?.toISOString() || null
      })),
      total,
      totalPages: Math.ceil(total / limit)
    });

  } catch (error) {
    console.error("Erreur API Annonces :", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur", details: error.message },
      { status: 500 }
    );
  }
}
