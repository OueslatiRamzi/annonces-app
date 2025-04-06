-- CreateTable
CREATE TABLE "Annonce" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prix" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Annonce_pkey" PRIMARY KEY ("id")
);
