import express from "express";
import cors from "cors";
import prisma from "prisma";
const app = express();

app.use(cors());

// Configura o Prisma
const db = prisma.connect();

// Rotas da API
app.get("/users", async (req, res) => {
  const users = await db.user.findMany();
  res.json(users);
});

// Inicia o servidor
app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));