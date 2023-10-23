// authController.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../database";
import * as bcrypt from "bcrypt"


export default class AuthController {

  static async registerUser(req: Request, res: Response) {
    try {
      const { nome_usuario, email, senha } = req.body;

      if (!nome_usuario || !email || !senha) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }

      // Verifique se o usuário já existe com o mesmo email
      const existingUser = await prisma.usuario.findUnique({
        where: { email },
      });
      if (existingUser) {
        return res.status(400).json({ error: "O email já está em uso" });
      }
      
      // const hashedPassword = await bcrypt.hash(senha, 10);

      // Crie um novo usuário
      const newUser = await prisma.usuario.create({
        data: {
          nome_usuario,
          email,
          senha,
        },
      });

      // Gere um token JWT para o novo usuário
      const token = jwt.sign({ userId: newUser.id }, "seuSegredoJWT", {
        expiresIn: "1h",
      });
      
      // Envie o token para o cliente
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Erro no registro" });
    }
  }

  static async loginUser(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      if (!email && !senha) {
        return res.status(400).json({ error: "Email e senha são obrigatórios" });
      }

      // Verifique as credenciais no banco de dados
      const user = await prisma.usuario.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      // // const isPasswordValid = await bcrypt.compare(senha, user.senha)
      // if(!isPasswordValid) {
      //   return res.status(401).json({ error: "Credenciais inválidas" });
      // }

      // Gere um token JWT
      const token = jwt.sign({ userId: user.id}, "seuSegredoJWT", {
        expiresIn: "1h", // Define a expiração do token
      });

      // Envie o token para o cliente
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Erro no login" });
    }
  }
}

