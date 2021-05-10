/*
  Warnings:

  - You are about to drop the column `statuss` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "statuss",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT E'Pending';
