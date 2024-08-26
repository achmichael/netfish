/*
  Warnings:

  - You are about to drop the column `accessToken` on the `googleaccount` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `googleaccount` table. All the data in the column will be lost.
  - Added the required column `name` to the `GoogleAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `googleaccount` DROP COLUMN `accessToken`,
    DROP COLUMN `refreshToken`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
