/*
  Warnings:

  - You are about to drop the column `categorie` on the `Annonce` table. All the data in the column will be lost.
  - Added the required column `categorieId` to the `Annonce` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Annonce" DROP COLUMN "categorie",
ADD COLUMN     "categorieId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Annonce" ADD CONSTRAINT "Annonce_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "Categorie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
