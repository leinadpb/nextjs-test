/*
  Warnings:

  - Added the required column `type` to the `Kpi` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "KpiType" AS ENUM ('TEXT', 'DATE', 'NUMBER', 'MB', 'GB', 'CURRENCY');

-- AlterTable
ALTER TABLE "Kpi" ADD COLUMN     "type" "KpiType" NOT NULL;
