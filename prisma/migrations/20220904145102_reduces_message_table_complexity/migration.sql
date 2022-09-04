/*
  Warnings:

  - You are about to drop the column `CandidateAlias` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `fromVoterID` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `toCandidateAlias` on the `Message` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[displayName]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `receipientName` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Candidate_CandidateAlias_key` ON `Candidate`;

-- AlterTable
ALTER TABLE `Candidate` DROP COLUMN `CandidateAlias`;

-- AlterTable
ALTER TABLE `Message` DROP COLUMN `fromVoterID`,
    DROP COLUMN `toCandidateAlias`,
    ADD COLUMN `parentMessageId` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `receipientName` VARCHAR(191) NOT NULL,
    ADD COLUMN `senderId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Student` ADD COLUMN `displayName` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Student_displayName_key` ON `Student`(`displayName`);
