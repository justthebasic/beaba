// authController.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../database";
import passport from "passport";
import passportLocal from "passport-local"
// import cookieParser from "cookie-parser"
import * as bcrypt from "bcrypt";
import dotenv from 'dotenv'
import config from "config";
import { signJwt } from "../utils/jwt.utils";
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
// import config from "config";



export interface UserInput {
  email: string;
  nome_usuario: string;
  senha: string;
}


export default class AuthController {
  static async registerUser(req: Request, res: Response) {
    try {
      const { nome_usuario, email, senha, cargo, estado } = req.body;

      const saltWorkFactorConfig = parseInt(process.env.SALT_WORK_FACTOR || '10', 10);
      const jwtSecret = process.env.JWT_SECRET;

      const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret,
      };


      if (!nome_usuario || !email || !senha) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }

      // Verifique se o usuário já existe com o mesmo email (implemente essa parte)

      const existingUser = await prisma.usuario.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ error: "O email já está em uso" });
      }

      const saltWorkFactor = saltWorkFactorConfig;
      const hashedPassword = await bcrypt.hash(senha, saltWorkFactor);

      // Crie um novo usuário
      const newUser = await prisma.usuario.create({
        data: {
          email,
          nome_usuario,
          senha: hashedPassword,
        },
      });


      const token = jwt.sign({ userId: newUser.id, nomeUsuario: nome_usuario, nomeUser: nome_usuario, cargoUser: cargo, estadoUser: estado }, jwtSecret, {
        expiresIn: "1h",
      });

      // Envie o token no corpo da resposta
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Erro no registro" });
    }
  }

  static async loginUser(req: Request, res: Response) {
    try {
      const { email, senha, nome_usuario, cargo, estado } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ error: "Email e senha são obrigatórios" });
      }

      // Verifique as credenciais no banco de dados
      const user = await prisma.usuario.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      const isPasswordValid = await bcrypt.compare(senha, user.senha);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }
      const jwtSecret = process.env.JWT_SECRET;
      const accessToken = process.env.ACCESS_TOKEN_SECRET;


      // Gere um token JWT para o usuário
      const token = jwt.sign({ userId: user.id, nomeUser: nome_usuario, cargoUser: cargo, estadoUser: estado,  }, jwtSecret, {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: "Erro no login" });
    }
  }

  // static async logoutUser(req: Request, res: Response) {
  //   try {
  //     // Remova o token do localStorage
  //     // localStorage.removeItem(config.get<string>("accessToken"));

  //     res.json({ message: "Logout bem-sucedido" });
  //   } catch (error) {
  //     res.status(500).json({ error: "Erro no logout" });
  //   }
  // }
}

