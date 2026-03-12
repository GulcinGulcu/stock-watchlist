import { StockData } from "@/types/stock";
import { ArrowDownRight, ArrowUpRight, X } from "lucide-react";
import "./StockCard.scss";

type StockCardProps = {
  stock: StockData;
  onRemove: (symbol: string) => void;
};

export const StockCard = ({ stock, onRemove }: StockCardProps) => {
  const isPositive = stock.change >= 0;

  const handleRemove = () => {
    const confirmed = window.confirm(
      `Are you sure you want to remove ${stock.symbol} from your watchlist?`,
    );
    if (!confirmed) return;
    onRemove(stock.symbol);
  };

  return (
    <article className="stock-card">
      <div className="stock-card__header">
        <span className="stock-card__symbol">{stock.symbol}</span>
        <button className="stock-card__remove" onClick={handleRemove}>
          <X size={20} />
        </button>
      </div>
      <p className="stock-card__name">{stock.name}</p>
      <p className="stock-card__price">${stock.price.toFixed(2)}</p>
      <div
        className={`stock-card__change ${
          isPositive
            ? "stock-card__change--positive"
            : "stock-card__change--negative"
        }`}
      >
        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        <span>
          {isPositive ? "+" : ""}
          {stock.change.toFixed(2)}%
        </span>
      </div>
      <div className="stock-card__meta">
        <p>High: ${stock.high.toFixed(2)}</p>
        <p>Low: ${stock.low.toFixed(2)}</p>
      </div>
    </article>
  );
};
