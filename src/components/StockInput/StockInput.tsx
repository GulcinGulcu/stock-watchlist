"use client";

import { useState } from "react";
import { ChartLine, Plus } from "lucide-react";
import "./StockInput.scss";

type StockInputProps = {
  onAdd: (symbol: string) => void;
  isAdding?: boolean;
};

export const StockInput = ({ onAdd, isAdding }: StockInputProps) => {
  const [symbol, setSymbol] = useState("");

  const handleSubmit = () => {
    const trimmedSymbol = symbol.trim();
    if (!trimmedSymbol) return;

    if (trimmedSymbol) {
      onAdd(trimmedSymbol);
      setSymbol("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="stock-input">
      <div className="stock-input__field">
        <ChartLine strokeWidth={1} color="#94a3b8" size={20}/>
        <input
          type="text"
          placeholder="Enter stock symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button onClick={handleSubmit} disabled={isAdding || !symbol.trim()}>
        <Plus strokeWidth={2} size={16} />
        {isAdding ? "Adding..." : "Add"}
      </button>
    </div>
  );
};
