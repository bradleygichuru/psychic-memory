/*
  Warnings:

  - A unique constraint covering the columns `[PositionId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `PositionId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Vote` ADD COLUMN `PositionId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Admin` (
    `AdminId` VARCHAR(191) NOT NULL,
    `AdminName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_AdminId_key`(`AdminId`),
    PRIMARY KEY (`AdminId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Vote_PositionId_key` ON `Vote`(`PositionId`);
