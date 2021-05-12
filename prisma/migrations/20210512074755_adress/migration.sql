-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "adress" TEXT NOT NULL DEFAULT E'강남구 논현동',
ADD COLUMN     "owner_commit" TEXT,
ADD COLUMN     "rider_commit" TEXT NOT NULL DEFAULT E'조심히 안전하게 와주세요';
