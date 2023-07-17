/*
  Warnings:

  - You are about to drop the column `src` on the `recordings` table. All the data in the column will be lost.
  - Added the required column `audio` to the `recordings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "recordings" DROP COLUMN "src",
ADD COLUMN     "audio" TEXT NOT NULL;
