/*
  Warnings:

  - You are about to drop the column `toCandidateID` on the `Message` table. All the data in the column will be lost.
  - Added the required column `toCandidateAlias` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Message` DROP COLUMN `toCandidateID`,
    ADD COLUMN `toCandidateAlias` VARCHAR(191) NOT NULL;
