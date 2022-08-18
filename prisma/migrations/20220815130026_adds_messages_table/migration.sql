-- CreateTable
CREATE TABLE `Message` (
    `MessageId` VARCHAR(191) NOT NULL,
    `Contents` VARCHAR(191) NOT NULL,
    `fromVoterID` VARCHAR(191) NOT NULL,
    `toCandidateID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Message_MessageId_key`(`MessageId`),
    PRIMARY KEY (`MessageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
