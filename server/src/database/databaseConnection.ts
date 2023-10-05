import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const prisma = new PrismaClient();

async function databaseConnection() {
    try {
        await prisma.$connect();
        console.log("Conexão com o banco de dados estabelecida com sucesso");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
    } finally {
        await prisma.$disconnect();
    }
}

databaseConnection();
