-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Record" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "startAt" TEXT NOT NULL,
    "endAt" TEXT,
    "craetedAt" TEXT NOT NULL,
    "memo" TEXT,
    CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Record" ("craetedAt", "endAt", "id", "memo", "startAt", "userId") SELECT "craetedAt", "endAt", "id", "memo", "startAt", "userId" FROM "Record";
DROP TABLE "Record";
ALTER TABLE "new_Record" RENAME TO "Record";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
