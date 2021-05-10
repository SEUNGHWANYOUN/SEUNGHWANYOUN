-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'OWNER', 'RIDER', 'DELIVERY', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT E'USER';
