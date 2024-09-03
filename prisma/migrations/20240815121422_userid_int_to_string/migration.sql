-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lists" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "media_id" INTEGER,
    "episods_id" INTEGER,
    "added_date" DATETIME NOT NULL,
    CONSTRAINT "Lists_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Lists_episods_id_fkey" FOREIGN KEY ("episods_id") REFERENCES "Episods" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Lists" ("added_date", "episods_id", "id", "media_id", "profile_id", "user_id") SELECT "added_date", "episods_id", "id", "media_id", "profile_id", "user_id" FROM "Lists";
DROP TABLE "Lists";
ALTER TABLE "new_Lists" RENAME TO "Lists";
CREATE TABLE "new_ResumePoints" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "media_id" INTEGER,
    "episods_id" INTEGER,
    CONSTRAINT "ResumePoints_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ResumePoints_episods_id_fkey" FOREIGN KEY ("episods_id") REFERENCES "Episods" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ResumePoints" ("episods_id", "id", "media_id", "user_id") SELECT "episods_id", "id", "media_id", "user_id" FROM "ResumePoints";
DROP TABLE "ResumePoints";
ALTER TABLE "new_ResumePoints" RENAME TO "ResumePoints";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
