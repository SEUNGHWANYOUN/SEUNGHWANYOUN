-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "rider_commit" DROP NOT NULL,
ALTER COLUMN "rider_commit" DROP DEFAULT;
