/*
  Warnings:

  - You are about to drop the column `stroeId` on the `Order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_stroeId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "stroeId";
