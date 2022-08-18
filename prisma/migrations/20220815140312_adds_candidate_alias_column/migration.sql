/*
  Warnings:

  - A unique constraint covering the columns `[CandidateAlias]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Candidate` ADD COLUMN `CandidateAlias` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX `Candidate_CandidateAlias_key` ON `Candidate`(`CandidateAlias`);
