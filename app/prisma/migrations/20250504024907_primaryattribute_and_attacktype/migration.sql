/*
  Warnings:

  - Added the required column `attackType` to the `HeroPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryAttribute` to the `HeroPost` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PrimaryAttribute" AS ENUM ('STRENGTH', 'AGILITY', 'INTELLIGENCE');

-- CreateEnum
CREATE TYPE "AttackType" AS ENUM ('RANGED', 'MELEE');

-- AlterTable
ALTER TABLE "HeroPost" ADD COLUMN     "attackType" "AttackType" NOT NULL,
ADD COLUMN     "primaryAttribute" "PrimaryAttribute" NOT NULL;
