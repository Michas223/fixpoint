/*
  Warnings:

  - Made the column `deliveryMethod` on table `order` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "price" INTEGER,
    "deliveryMethod" TEXT NOT NULL,
    "currentStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "expectedCompletionDate" DATETIME,
    CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_order" ("createdAt", "currentStatus", "deliveryMethod", "description", "expectedCompletionDate", "id", "price", "title", "updatedAt", "userId") SELECT "createdAt", "currentStatus", "deliveryMethod", "description", "expectedCompletionDate", "id", "price", "title", "updatedAt", "userId" FROM "order";
DROP TABLE "order";
ALTER TABLE "new_order" RENAME TO "order";
CREATE INDEX "order_userId_idx" ON "order"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
