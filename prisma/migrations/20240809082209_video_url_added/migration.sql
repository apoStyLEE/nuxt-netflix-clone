/*
  Warnings:

  - Added the required column `video_url` to the `Episods` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Episods" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "media_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "video_url" TEXT NOT NULL,
    "episode_number" INTEGER NOT NULL,
    "season_number" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "release_date" DATETIME,
    CONSTRAINT "Episods_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Episods" ("description", "duration", "episode_number", "id", "media_id", "release_date", "season_number", "title") SELECT "description", "duration", "episode_number", "id", "media_id", "release_date", "season_number", "title" FROM "Episods";
DROP TABLE "Episods";
ALTER TABLE "new_Episods" RENAME TO "Episods";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
