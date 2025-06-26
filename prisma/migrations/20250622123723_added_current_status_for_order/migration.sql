-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "price" INTEGER,
    "currentStatus" TEXT NOT NULL DEFAULT 'PENDING',
    "arrivedAt" DATETIME,
    "expectedCompletionDate" DATETIME,
    CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_order" ("arrivedAt", "createdAt", "description", "expectedCompletionDate", "id", "price", "title", "updatedAt", "userId") SELECT "arrivedAt", "createdAt", "description", "expectedCompletionDate", "id", "price", "title", "updatedAt", "userId" FROM "order";
DROP TABLE "order";
ALTER TABLE "new_order" RENAME TO "order";
CREATE INDEX "order_userId_idx" ON "order"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
