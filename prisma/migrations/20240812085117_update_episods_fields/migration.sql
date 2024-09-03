/*
  Warnings:

  - You are about to drop the column `cover_image` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail_image` on the `Media` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Episods" ADD COLUMN "cover_image" TEXT;
ALTER TABLE "Episods" ADD COLUMN "thumbnail_image" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Media" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "genre_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    CONSTRAINT "Media_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genres" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Media" ("description", "genre_id", "id", "title", "type") SELECT "description", "genre_id", "id", "title", "type" FROM "Media";
DROP TABLE "Media";
ALTER TABLE "new_Media" RENAME TO "Media";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
