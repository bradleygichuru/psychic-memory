/*
  Warnings:

  - A unique constraint covering the columns `[StudentNo]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Voter` MODIFY `LoginTimeStamp` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Student_StudentNo_key` ON `Student`(`StudentNo`);
