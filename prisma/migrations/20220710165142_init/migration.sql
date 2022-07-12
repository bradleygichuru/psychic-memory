-- CreateTable
CREATE TABLE `Candidate` (
    `CandidateId` VARCHAR(191) NOT NULL,
    `StudentNo` INTEGER NOT NULL,
    `PositionId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Candidate_CandidateId_key`(`CandidateId`),
    UNIQUE INDEX `Candidate_StudentNo_key`(`StudentNo`),
    UNIQUE INDEX `Candidate_PositionId_key`(`PositionId`),
    PRIMARY KEY (`CandidateId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Election` (
    `ElectionId` VARCHAR(191) NOT NULL,
    `ElectionName` VARCHAR(191) NOT NULL,
    `ElectionDescription` VARCHAR(191) NOT NULL,
    `ElectionDate` DATETIME(3) NOT NULL,
    `InProgress` BOOLEAN NOT NULL,
    `StartedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Election_ElectionId_key`(`ElectionId`),
    PRIMARY KEY (`ElectionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Position` (
    `PositionId` VARCHAR(191) NOT NULL,
    `PositionName` VARCHAR(191) NOT NULL,
    `PositionDescription` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Position_PositionId_key`(`PositionId`),
    PRIMARY KEY (`PositionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `StudentNo` INTEGER NOT NULL,
    `FirstName` VARCHAR(191) NOT NULL,
    `SirName` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Faculty` VARCHAR(191) NOT NULL,
    `Course` VARCHAR(191) NOT NULL,
    `YearOfStudy` INTEGER NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Student_Email_key`(`Email`),
    UNIQUE INDEX `Student_password_key`(`password`),
    PRIMARY KEY (`StudentNo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vote` (
    `VoteId` VARCHAR(191) NOT NULL,
    `StudentNo` INTEGER NOT NULL,
    `CandidateId` VARCHAR(191) NOT NULL,
    `CastTimeStamp` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Vote_VoteId_key`(`VoteId`),
    UNIQUE INDEX `Vote_StudentNo_key`(`StudentNo`),
    UNIQUE INDEX `Vote_CandidateId_key`(`CandidateId`),
    PRIMARY KEY (`VoteId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Voter` (
    `VoterId` VARCHAR(191) NOT NULL,
    `StudentNo` INTEGER NOT NULL,
    `VotingStatus` BOOLEAN NOT NULL,
    `LoginTimeStamp` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Voter_VoterId_key`(`VoterId`),
    UNIQUE INDEX `Voter_StudentNo_key`(`StudentNo`),
    PRIMARY KEY (`VoterId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
