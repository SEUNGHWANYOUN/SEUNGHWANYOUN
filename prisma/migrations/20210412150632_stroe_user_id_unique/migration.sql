/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[userId]` on the table `Store`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Store.userId_unique" ON "Store"("userId");
