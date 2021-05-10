-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "storename" TEXT NOT NULL,
    "mainimg" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isPromoted" BOOLEAN NOT NULL DEFAULT false,
    "promotedUntil" TEXT,

    PRIMARY KEY ("id")
);
