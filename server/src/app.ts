import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import templateRoutes from './routes/templateRoutes';
import campoRoutes from './routes/campoRoutes';
import uploadRoutes from './routes/uploadRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Rotas
app.use('/api/usuarios', userRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/campos', campoRoutes);
app.use('/api/uploads', uploadRoutes);

export default app;
