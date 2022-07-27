/*
  Warnings:

  - You are about to drop the column `votesCast` on the `Position` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Position` DROP COLUMN `votesCast`,
    ADD COLUMN `VotesCast` INTEGER NOT NULL DEFAULT 0;
