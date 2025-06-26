-- AlterTable
ALTER TABLE "order" ADD COLUMN "price" INTEGER;

-- CreateIndex
CREATE INDEX "order_userId_idx" ON "order"("userId");
