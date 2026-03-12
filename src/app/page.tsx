"use client";

import { useEffect, useState } from "react";
import { StockData } from "@/types/stock";
import { getStockBySymbol } from "@/services/stockService";
import { StockInput } from "@/components/StockInput/StockInput";
import { Header } from "@/components/Header/Header";
import { StockList } from "@/components/StockList/StockList";
import { Loader } from "@/components/Loader/Loader";

const STORAGE_KEY = "stock_watchlist";

export default function Home() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSavedStocks = async () => {
      try {
        const savedSymbols = localStorage.getItem(STORAGE_KEY);
        if (!savedSymbols) return;

        const parsedSymbols: string[] = JSON.parse(savedSymbols);
        if (parsedSymbols.length === 0) return;

        setError("");

        const savedStocks = await Promise.all(
          parsedSymbols.map((symbol) => getStockBySymbol(symbol)),
        );
        setStocks(savedStocks);
      } catch (error) {
        setError("Failed to load saved stocks.");
      } finally {
        setIsRestoring(false);
      }
    };
    loadSavedStocks();
  }, []);

  useEffect(() => {
    const symbols = stocks.map((stock) => stock.symbol);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(symbols));
  }, [stocks]);

  const refreshStocks = async () => {
    try {
      setError("");
      setIsRefreshing(true);

      const updatedStocks = await Promise.all(
        stocks.map((stock) => getStockBySymbol(stock.symbol)),
      );

      setStocks(updatedStocks);
    } catch {
      setError("Unable to refresh stock data right now. Please try again shortly.");
    } finally {
      setIsRefreshing(false);
    }
  };

  const addStock = async (symbol: string) => {
    try {
      setError("");

      const normalizedSymbol = symbol.trim().toUpperCase();
      if (!normalizedSymbol) {
        setError("Please enter a stock symbol.");
        return;
      }

      const existingStock = stocks.find((stock) => stock.symbol === normalizedSymbol);
      if (existingStock) {
        setError("Stock already added.");
        return;
      }

      setIsAdding(true);
      const stockData = await getStockBySymbol(normalizedSymbol);
      setStocks((prev) => [...prev, stockData]);
    } catch (error) {
      setError("Symbol not found.");
    } finally {
      setIsAdding(false);
    }
  };

  const removeStock = (symbol: string) => {
    setError("");

    setStocks((prev) => prev.filter((stock) => stock.symbol !== symbol));
  };

  return (
    <>
      <Header onRefresh={refreshStocks} isRefreshing={isRefreshing} />
      <main className="page">
        <div className="container">
          <section className="input-panel">
            <StockInput onAdd={addStock} isAdding={isAdding} />
            <p className="input-panel__helper">
              Try symbols like AAPL, TSLA, NVDA
            </p>
            {error && <p className="input-panel__error">{error}</p>}
          </section>
          {isRestoring ? (
            <Loader />
          ) : stocks.length > 0 ? (
            <StockList stocks={stocks} onRemove={removeStock} />
          ) : (
            <section className="empty-state">
              <p>No stocks added yet.</p>
              <span>Search for a symbol to build your watchlist.</span>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
