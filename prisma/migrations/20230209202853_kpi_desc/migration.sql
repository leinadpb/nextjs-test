/*
  Warnings:

  - Added the required column `desc` to the `Kpi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Kpi" ADD COLUMN     "desc" TEXT NOT NULL;
