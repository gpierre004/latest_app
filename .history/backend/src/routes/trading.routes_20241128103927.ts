import express from 'express';
import { tradingController } from '../controllers/tradingController';

const router = express.Router();

// Get all stocks
router.get('/', tradingController.getAllStocks);

// Get specific stock details
router.get('/:ticker', tradingController.getStockDetails);

export default router;