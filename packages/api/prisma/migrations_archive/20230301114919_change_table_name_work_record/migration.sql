/*
  Warnings:

  - You are about to drop the `Record` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Record";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "WorkRecord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "startAt" TEXT NOT NULL,
    "endAt" TEXT,
    "craetedAt" TEXT NOT NULL,
    "memo" TEXT,
    CONSTRAINT "WorkRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
