/*
  Warnings:

  - You are about to drop the column `adress` on the `Store` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "adress",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "address2" TEXT,
ADD COLUMN     "zoneCode" TEXT,
ADD COLUMN     "roadAddress" TEXT,
ADD COLUMN     "roadAddress2" TEXT,
ADD COLUMN     "sigunguCode" TEXT,
ADD COLUMN     "Latitude" DECIMAL(65,30),
ADD COLUMN     "Longitude" DECIMAL(65,30),
ADD COLUMN     "category" TEXT,
ADD COLUMN     "state" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "mainimg" DROP NOT NULL;
