// src/routes/authRoutes.ts

import express from 'express';
import { loginUser, registerUser } from '../controllers/authController';

const router = express.Router();

// Rota de registro de usuário
router.post('/register', registerUser);

// Rota de login de usuário
router.post('/login', loginUser);

export default router;
