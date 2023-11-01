import express from 'express';
import AuthController from '../controllers/authController';

const router = express.Router();

// Rota de registro de usuário
router.post('/api/register', AuthController.registerUser);

// Rota de login de usuário
router.post('/api/login', AuthController.loginUser);

// router.post('/refresh-token', refreshToken);


export default router;
