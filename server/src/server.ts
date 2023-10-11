import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import templateRoutes from './routes/templateRoutes';
import campoRoutes from './routes/campoRoutes';
import arquivoRoutes from './routes/arquivoRoutes';
import authRoutes from './routes/authRoutes'

const server = express();


server.use(express.json());
server.use(cors());

// Rotas
server.use(userRoutes);
server.use(templateRoutes);
server.use(campoRoutes);
server.use(arquivoRoutes);
server.use(authRoutes);

server.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  next();
});

server.listen(3333, ()=> console.log('Server is running port 3333'))