import { Request, Response } from 'express';
import { pool } from '../config/database';

export const tradingController = {
  getStockDetails: async (req: Request, res: Response) => {
    try {
      const { ticker } = req.params;
      const query = `
        SELECT * FROM public.vw_potential_breakouts 
        WHERE ticker = \$1
      `;

      const result = await pool.query(query, [ticker]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Stock not found' });
      }

      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching stock details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  

  getAllStocks: async (_req: Request, res: Response) => {
    try {
      const query = 'SELECT * FROM public.vw_potential_breakouts';
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching stocks:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};