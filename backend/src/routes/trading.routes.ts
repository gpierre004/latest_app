import { Router } from 'express';
import { tradingController } from '../controllers/tradingController';

const router = Router();

// Get all stocks
router.get('/', (req, res) => tradingController.getAllStocks(req, res));

// Get specific stock details
router.get('/:ticker', (req, res) => tradingController.getStockDetails(req, res));

export default router;