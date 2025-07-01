/*
  Warnings:

  - You are about to drop the column `number` on the `user` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "postalCode" TEXT,
    "city" TEXT,
    "street" TEXT,
    "buildingNumber" INTEGER,
    "flat" INTEGER,
    "phoneNumberVerified" BOOLEAN,
    "role" TEXT,
    "banned" BOOLEAN,
    "banReason" TEXT,
    "banExpires" DATETIME
);
INSERT INTO "new_user" ("banExpires", "banReason", "banned", "city", "createdAt", "email", "emailVerified", "id", "image", "name", "phoneNumber", "phoneNumberVerified", "postalCode", "role", "street", "updatedAt") SELECT "banExpires", "banReason", "banned", "city", "createdAt", "email", "emailVerified", "id", "image", "name", "phoneNumber", "phoneNumberVerified", "postalCode", "role", "street", "updatedAt" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
