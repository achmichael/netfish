-- AlterTable
ALTER TABLE `googleaccount` ADD COLUMN `password` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(191) NULL;
