/*
  Warnings:

  - You are about to drop the column `StudentNo` on the `Vote` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[VoterId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `VoterId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Vote_StudentNo_key` ON `Vote`;

-- AlterTable
ALTER TABLE `Vote` DROP COLUMN `StudentNo`,
    ADD COLUMN `VoterId` VARCHAR(191) NOT NULL,
    MODIFY `CastTimeStamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX `Vote_VoterId_key` ON `Vote`(`VoterId`);
