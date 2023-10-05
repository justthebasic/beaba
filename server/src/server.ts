import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const server = express();


server.use(express.json());
server.use(cors());

// Rotas
server.use('/api/usuario', userRoutes);

server.listen(3333, ()=> console.log('Server is running port 3333'))