-- CreateTable
CREATE TABLE `WorkRecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `startAt` VARCHAR(191) NOT NULL,
    `endAt` VARCHAR(191) NULL,
    `craetedAt` VARCHAR(191) NOT NULL,
    `memo` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firebaseUid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `plannedWorkTime` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WorkRecord` ADD CONSTRAINT `WorkRecord_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
