-- CreateEnum
CREATE TYPE "permissao" AS ENUM ('adm', 'user');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('ativo', 'inativo', 'pendente');

-- CreateTable
CREATE TABLE "arquivo" (
    "id" SERIAL NOT NULL,
    "nome_arquivo" VARCHAR(45) NOT NULL,
    "caminho_arquivo" VARCHAR(255) NOT NULL,
    "data_envio" TIMESTAMP(6) NOT NULL,
    "estado" BOOLEAN NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "template_id" INTEGER NOT NULL,

    CONSTRAINT "arquivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campo" (
    "id" SERIAL NOT NULL,
    "nome_campo" VARCHAR(45) NOT NULL,
    "tipo" VARCHAR(45) NOT NULL,
    "template_id" INTEGER NOT NULL,

    CONSTRAINT "campo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "template" (
    "id" SERIAL NOT NULL,
    "nome_template" VARCHAR(45) NOT NULL,
    "formato" VARCHAR(45) NOT NULL,
    "data_criacao" TIMESTAMP(6) NOT NULL,
    "estado" "status" DEFAULT 'pendente',
    "usuario_id" INTEGER NOT NULL,
    "campo_id" INTEGER NOT NULL,

    CONSTRAINT "template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "nome_usuario" VARCHAR(255) NOT NULL,
    "email" VARCHAR(45) NOT NULL,
    "senha" VARCHAR(60) NOT NULL,
    "cargo" "permissao",
    "estado" "status",

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "arquivo" ADD CONSTRAINT "arquivo_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "arquivo" ADD CONSTRAINT "arquivo_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "campo" ADD CONSTRAINT "campo_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "template" ADD CONSTRAINT "template_campo_id_fkey" FOREIGN KEY ("campo_id") REFERENCES "campo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "template" ADD CONSTRAINT "template_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
