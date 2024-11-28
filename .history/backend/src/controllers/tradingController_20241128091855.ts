import { Request, Response } from 'express';
import { TradingService } from '../services/trading.service';

const tradingService = new TradingService();

export class TradingController {
  async getPotentialBreakouts(req: Request, res: Response) {
    try {
      const filters = {
        trend_status: req.query.trend_status as string,
        volume_status: req.query.volume_status as string,
        potential_breakout: req.query.potential_breakout === 'true',
        limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
        offset: req.query.offset ? parseInt(req.query.offset as string) : undefined
      };

      const opportunities = await tradingService.getPotentialBreakouts(filters);
      res.json(opportunities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getStockDetails(req: Request, res: Response) {
    try {
      const { ticker } = req.params;
      const stockDetails = await tradingService.getStockDetails(ticker);

      if (!stockDetails) {
        return res.status(404).json({ message: 'Stock not found' });
      }

      res.json(stockDetails);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}