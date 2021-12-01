-- CreateTable
CREATE TABLE "Brewery" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "Brewery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Beer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "abv" DOUBLE PRECISION NOT NULL,
    "ounces" INTEGER NOT NULL,
    "breweryId" INTEGER,

    CONSTRAINT "Beer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Beer" ADD CONSTRAINT "Beer_breweryId_fkey" FOREIGN KEY ("breweryId") REFERENCES "Brewery"("id") ON DELETE SET NULL ON UPDATE CASCADE;
