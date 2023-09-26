// src/controllers/authController.ts

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Função para registrar um novo usuário (simulação)
export const registerUser = (req: Request, res: Response) => {
  // Lógica para criar um novo usuário no banco de dados
  // ...

  // Gere um token JWT para o novo usuário
  const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
};

// Função para fazer login de usuário (simulação)
export const loginUser = (req: Request, res: Response) => {
  // Lógica para verificar as credenciais do usuário
  // ...

  // Se as credenciais estiverem corretas, gere um token JWT
  const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
};
