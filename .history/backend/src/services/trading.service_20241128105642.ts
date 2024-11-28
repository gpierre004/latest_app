import { pool } from '../config/database';
import { TradingOpportunity, QueryFilters } from '../types/trading.types';

export class TradingService {
  async getPotentialBreakouts(filters: QueryFilters): Promise<TradingOpportunity[]> {
    try {
      let query = `
        SELECT * 
        FROM public.vw_potential_breakouts 
        WHERE 1=1
      `;

      const values: any[] = [];
      let paramCount = 1;

      if (filters.trend_status) {
        query += ` AND trend_status = ${paramCount}`;
        values.push(filters.trend_status);
        paramCount++;
      }

      if (filters.volume_status) {
        query += ` AND volume_status = ${paramCount}`;
        values.push(filters.volume_status);
        paramCount++;
      }

      if (filters.potential_breakout !== undefined) {
        query += ` AND potential_breakout = ${paramCount}`;
        values.push(filters.potential_breakout);
        paramCount++;
      }

      query += ` ORDER BY created_at DESC`;

      if (filters.limit) {
        query += ` LIMIT ${paramCount}`;
        values.push(filters.limit);
        paramCount++;
      }

      if (filters.offset) {
        query += ` OFFSET ${paramCount}`;
        values.push(filters.offset);
      }

      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching potential breakouts: ${error}`);
    }
  }

  async getStockDetails(ticker: string): Promise<TradingOpportunity> {
    try {
      const query = `
        SELECT * 
        FROM public.vw_potential_breakouts 
        WHERE ticker = \$1 AND volume_status !='
      `;
      const result = await pool.query(query, [ticker]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error fetching stock details: ${error}`);
    }
  }
}