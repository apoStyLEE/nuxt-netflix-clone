-- CreateTable
CREATE TABLE "UserProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "isNew" BOOLEAN NOT NULL
);
