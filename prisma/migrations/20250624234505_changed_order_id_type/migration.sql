/*
  Warnings:

  - You are about to alter the column `orderId` on the `OrderHistory` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `order` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "OrderHistory_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_OrderHistory" ("createdAt", "id", "message", "orderId", "status") SELECT "createdAt", "id", "message", "orderId", "status" FROM "OrderHistory";
DROP TABLE "OrderHistory";
ALTER TABLE "new_OrderHistory" RENAME TO "OrderHistory";
CREATE TABLE "new_order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "price" INTEGER,
    "deliveryMethod" TEXT,
    "currentStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "arrivedAt" DATETIME,
    "expectedCompletionDate" DATETIME,
    CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_order" ("arrivedAt", "createdAt", "currentStatus", "deliveryMethod", "description", "expectedCompletionDate", "id", "price", "title", "updatedAt", "userId") SELECT "arrivedAt", "createdAt", "currentStatus", "deliveryMethod", "description", "expectedCompletionDate", "id", "price", "title", "updatedAt", "userId" FROM "order";
DROP TABLE "order";
ALTER TABLE "new_order" RENAME TO "order";
CREATE INDEX "order_userId_idx" ON "order"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
