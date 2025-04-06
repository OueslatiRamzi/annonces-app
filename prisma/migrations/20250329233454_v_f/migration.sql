/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Annonce` table. All the data in the column will be lost.
  - Added the required column `categorie` to the `Annonce` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emplacement` to the `Annonce` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `Annonce` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Annonce" DROP COLUMN "imageUrl",
ADD COLUMN     "categorie" TEXT NOT NULL,
ADD COLUMN     "emplacement" TEXT NOT NULL,
ADD COLUMN     "imageUrls" TEXT[],
ADD COLUMN     "telephone" TEXT NOT NULL;
