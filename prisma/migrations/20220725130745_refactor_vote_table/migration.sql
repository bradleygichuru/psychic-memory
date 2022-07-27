/*
  Warnings:

  - You are about to drop the `Vote` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Candidate` ADD COLUMN `VoteCount` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `Vote`;
