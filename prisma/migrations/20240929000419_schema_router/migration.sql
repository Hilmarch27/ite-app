-- CreateEnum
CREATE TYPE "Status" AS ENUM ('AKTIF', 'TUTUP');

-- CreateTable
CREATE TABLE "router" (
    "id" TEXT NOT NULL,
    "typeOfUker" TEXT NOT NULL,
    "routerSeries" TEXT NOT NULL,
    "nameUker" TEXT NOT NULL,
    "kanca" TEXT NOT NULL,
    "kanwil" TEXT NOT NULL,
    "ipUker" TEXT NOT NULL,
    "snDevice" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "information" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "router_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "router_snDevice_status_idx" ON "router"("snDevice", "status");

-- AddForeignKey
ALTER TABLE "router" ADD CONSTRAINT "router_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
