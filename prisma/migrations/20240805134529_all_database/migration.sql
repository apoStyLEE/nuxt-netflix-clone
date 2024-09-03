-- CreateTable
CREATE TABLE "Genres" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "avatar" TEXT
);

-- CreateTable
CREATE TABLE "Media" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "genre_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "thumbnail_image" TEXT,
    "cover_image" TEXT,
    CONSTRAINT "Media_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genres" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Episods" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "media_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "episode_number" INTEGER NOT NULL,
    "season_number" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "release_date" DATETIME,
    CONSTRAINT "Episods_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lists" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "media_id" INTEGER,
    "episods_id" INTEGER,
    "added_date" DATETIME NOT NULL,
    CONSTRAINT "Lists_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Lists_episods_id_fkey" FOREIGN KEY ("episods_id") REFERENCES "Episods" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ResumePoints" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "media_id" INTEGER,
    "episods_id" INTEGER,
    CONSTRAINT "ResumePoints_media_id_fkey" FOREIGN KEY ("media_id") REFERENCES "Media" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ResumePoints_episods_id_fkey" FOREIGN KEY ("episods_id") REFERENCES "Episods" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
