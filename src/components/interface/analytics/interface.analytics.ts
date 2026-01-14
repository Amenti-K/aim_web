export interface AnalyticsSummary {
  totalInventoryValue: number;
  bestSelling: { inventory: string; quantity: number };
  lowestStock: { inventory: string; quantity: number };
  mostUnsold: { inventory: string; quantity: number };
}

export interface ChartPoint {
  inventory?: string;
  warehouseId?: string;
  month?: string;
  quantity?: number;
  totalValue?: number;
  totalQty?: number;
  value?: number;
}

export interface AnalyticsCharts {
  topSellingItems: ChartPoint[];
  stockByWarehouse: ChartPoint[];
  salesTrend: ChartPoint[];
  purchaseTrend: ChartPoint[];
  lowStockItems: ChartPoint[];
  inventoryValueDistribution: ChartPoint[];
}

export interface AnalyticsResponse {
  summary: AnalyticsSummary;
  charts: AnalyticsCharts;
}

export interface SinglePieChart {
  label: string;
  value: number;
}

export interface PieChartResponse {
  chartData: SinglePieChart[];
}

export interface SingleBarChart {
  month: string;
  sales: number;
  purchase: number;
  profit: number;
}

export interface BarChartResponse {
  chartData: SingleBarChart[];
}
