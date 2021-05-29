/*
  Warnings:

  - You are about to drop the column `address2` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `roadAddress2` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `adress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `adress_road` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `adress_detail` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "address2",
DROP COLUMN "roadAddress2",
ADD COLUMN     "address_detail" TEXT,
ADD COLUMN     "roadAddress_detail" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "adress",
DROP COLUMN "adress_road",
DROP COLUMN "adress_detail",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "address_detail" TEXT,
ADD COLUMN     "zoneCode" TEXT,
ADD COLUMN     "roadAddress" TEXT,
ADD COLUMN     "roadAddress_detail" TEXT,
ADD COLUMN     "sigunguCode" TEXT;
