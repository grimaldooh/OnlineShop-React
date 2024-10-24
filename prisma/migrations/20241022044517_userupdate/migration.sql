/*
  Warnings:

  - Added the required column `adress` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "adress" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL;
