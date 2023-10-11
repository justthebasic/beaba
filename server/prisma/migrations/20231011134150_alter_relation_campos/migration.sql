/*
  Warnings:

  - You are about to drop the column `campo_id` on the `template` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "template" DROP CONSTRAINT "template_campo_id_fkey";

-- AlterTable
ALTER TABLE "arquivo" ALTER COLUMN "data_envio" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "template" DROP COLUMN "campo_id",
ALTER COLUMN "data_criacao" SET DEFAULT CURRENT_TIMESTAMP;
