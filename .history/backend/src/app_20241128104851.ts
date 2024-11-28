import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import tradingRoutes from './routes/trading.routes';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/trading', tradingRoutes);

// Basic health check route
app.get('/health', (_req, res) => {
  res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;