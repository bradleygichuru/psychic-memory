/*
  Warnings:

  - You are about to drop the column `PositionId` on the `Candidate` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[PositionName]` on the table `Position` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `PositionName` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Candidate_PositionId_key` ON `Candidate`;

-- AlterTable
ALTER TABLE `Candidate` DROP COLUMN `PositionId`,
    ADD COLUMN `PositionName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Position_PositionName_key` ON `Position`(`PositionName`);
