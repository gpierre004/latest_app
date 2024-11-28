export interface TradingOpportunity {
    ticker: string;
    closePrice: number;
    volume: number;
    createdAt: Date;
    sma_20: number;
    sma_50: number;
    avg_volume_20: number;
    price_change_pct: number;
    potential_breakout: boolean;
    trend_status: string;
    volume_status: string;
  }
  
  export interface QueryFilters {
    trend_status?: string;
    volume_status?: string;
    potential_breakout?: boolean;
    limit?: number;
    offset?: number;
  }