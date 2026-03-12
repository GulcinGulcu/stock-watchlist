import { mockStocks } from "@/data/mockStocks";
import { StockData } from "@/types/stock";
import { get } from "http";

const API_KEY = process.env.NEXT_PUBLIC_POLYGON_API_KEY;
const BASE_URL = "https://api.massive.com";

export const getMockStockBySymbol = (symbol: string): StockData => {
  const normalizedSymbol = symbol.trim().toUpperCase();

  const stock = mockStocks.find((s) => s.symbol === normalizedSymbol);

  if (!stock) {
    throw new Error(`Stock with symbol "${normalizedSymbol}" not found.`);
  }

  return stock;
};

const fetchStockPrice = async (symbol: string) => {
  const response = await fetch(
    `${BASE_URL}/v2/aggs/ticker/${symbol}/prev?adjusted=true&apiKey=${API_KEY}`,
    { cache: "no-store" },
  );

  if (response.status === 429) {
    throw new Error("RATE_LIMIT");
  }

  if (!response.ok) {
    throw new Error("FETCH_FAILED");
  }

  const data = await response.json();
  const priceData = data.results[0];

  if (!priceData) {
    throw new Error(`No price data found for symbol "${symbol}"`);
  }

  return priceData;
};

const fetchCompanyName = async (symbol: string) => {
  const response = await fetch(
    `${BASE_URL}/v3/reference/tickers/${symbol}?apiKey=${API_KEY}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    const fallbackCompanyName = mockStocks.find(
      (stock) => stock.symbol === symbol,
    );
    return fallbackCompanyName?.name || symbol;
  }

  const data = await response.json();
  return data?.results?.name || symbol;
};

const fetchStockData = async (symbol: string): Promise<StockData> => {
  const normalizedSymbol = symbol.trim().toUpperCase();

  const stockPriceData = await fetchStockPrice(normalizedSymbol);
  const companyName = await fetchCompanyName(normalizedSymbol);

  const open = Number(stockPriceData.o);
  const close = Number(stockPriceData.c);
  const high = Number(stockPriceData.h);
  const low = Number(stockPriceData.l);

  const change = open ? Number((((close - open) / open) * 100).toFixed(2)) : 0;

  return {
    symbol: normalizedSymbol,
    name: companyName,
    price: close,
    change,
    high,
    low,
  };
};

export const getStockBySymbol = async (symbol: string): Promise<StockData> => {
  const normalizedSymbol = symbol.trim().toUpperCase();

  if (!API_KEY) {
    return getMockStockBySymbol(normalizedSymbol);
  }

  try {
    return await fetchStockData(normalizedSymbol);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("FETCH_FAILED");
  }
};
