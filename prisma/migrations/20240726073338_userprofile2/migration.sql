/*
  Warnings:

  - You are about to drop the column `isNew` on the `UserProfile` table. All the data in the column will be lost.
  - Added the required column `isDefault` to the `UserProfile` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "isDefault" BOOLEAN NOT NULL
);
INSERT INTO "new_UserProfile" ("avatar", "id", "name", "userId") SELECT "avatar", "id", "name", "userId" FROM "UserProfile";
DROP TABLE "UserProfile";
ALTER TABLE "new_UserProfile" RENAME TO "UserProfile";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
