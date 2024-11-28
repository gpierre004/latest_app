import { Router } from 'express';
import { TradingController } from '../controllers/tradingController';

const router = Router();
const tradingController = new TradingController();

router.get('/breakouts', tradingController.getPotentialBreakouts);
router.get('/stock/:ticker', tradingController.getStockDetails);

export default router;