/*
  Warnings:

  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Order_Item` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Pending', 'Cooking', 'Cooked', 'PickedUp', 'Delivered');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN     "statuss" "OrderStatus" NOT NULL DEFAULT E'Pending',
ALTER COLUMN "riderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Order_Item" DROP COLUMN "status";
