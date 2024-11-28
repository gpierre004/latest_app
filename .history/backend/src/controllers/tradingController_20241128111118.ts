import { Request, Response } from 'express';
import { pool } from '../config/database';

interface StockDetails {
  ticker: string;
  closePrice: number;
  volume: number;
  // Add other fields as needed based on your database schema
}

class TradingController {
  public async getStockDetails(req: Request, res: Response): Promise<void> {
    try {
      const { ticker } = req.params;
      const query = `
        SELECT * FROM public.vw_potential_breakouts 
        WHERE volume_status != 'Normal'
      `;

      const result = await pool.query<StockDetails>(query, [ticker]);

      if (result.rows.length === 0) {
        res.status(404).json({ message: 'Stock not found' });
        return;
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching stock details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async getAllStocks(req: Request, res: Response): Promise<void> {
    try {
      const query = 'SELECT * FROM public.vw_potential_breakouts WHERE volume_status != Normal"';
      const result = await pool.query<StockDetails>(query);
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching stocks:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export const tradingController = new TradingController();