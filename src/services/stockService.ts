import { mockStocks } from "@/data/mockStocks";
import { StockData } from "@/types/stock";

export const getStockBySymbol = async (symbol: string): Promise<StockData> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const normalizedSymbol = symbol.trim().toUpperCase();

  const stock = mockStocks.find((s) => s.symbol === normalizedSymbol);

  if (!stock) {
    throw new Error(`Stock with symbol "${normalizedSymbol}" not found.`);
  }

  return stock;
};
