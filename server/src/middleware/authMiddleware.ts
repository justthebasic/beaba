import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Você pode adicionar informações do usuário ao objeto de solicitação para uso posterior nas rotas protegidas
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token de autenticação inválido' });
  }
};

