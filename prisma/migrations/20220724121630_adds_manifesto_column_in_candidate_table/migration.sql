-- DropIndex
DROP INDEX `Vote_PositionId_key` ON `Vote`;

-- DropIndex
DROP INDEX `Vote_VoterId_key` ON `Vote`;

-- AlterTable
ALTER TABLE `Candidate` ADD COLUMN `Manifesto` VARCHAR(191) NOT NULL DEFAULT 'insert manifesto';
