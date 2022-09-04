/*
  Warnings:

  - Made the column `displayName` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Student` MODIFY `displayName` VARCHAR(191) NOT NULL;
