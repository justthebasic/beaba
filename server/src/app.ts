import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const app = express();


app.use(express.json());
app.use(cors());

// Rotas
app.use('/api/usuario', userRoutes);

app.listen(3333, ()=> console.log('Server is running port 3333'))

export default app;
