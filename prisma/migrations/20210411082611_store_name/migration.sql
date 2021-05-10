/*
  Warnings:

  - You are about to drop the column `storename` on the `Store` table. All the data in the column will be lost.
  - Added the required column `name` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "storename",
ADD COLUMN     "name" TEXT NOT NULL;
