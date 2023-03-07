-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firebaseUid" TEXT NOT NULL,
    "name" TEXT,
    "plannedWorkTime" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_User" ("firebaseUid", "id", "name") SELECT "firebaseUid", "id", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
