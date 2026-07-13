-- AlterTable
ALTER TABLE "ProviderAlert" ADD COLUMN     "resourceTitle" TEXT;

-- CreateTable
CREATE TABLE "ReaderResetToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "readerId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),

    CONSTRAINT "ReaderResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReaderResetToken_token_key" ON "ReaderResetToken"("token");

-- AddForeignKey
ALTER TABLE "ReaderResetToken" ADD CONSTRAINT "ReaderResetToken_readerId_fkey" FOREIGN KEY ("readerId") REFERENCES "Reader"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
