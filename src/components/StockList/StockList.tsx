import { StockData } from "@/types/stock";
import { StockCard } from "@/components/StockCard/StockCard";
import "./StockList.scss";

type StockListProps = {
  stocks: StockData[];
  onRemove: (symbol: string) => void;
};

export const StockList = ({ stocks, onRemove }: StockListProps) => {
  return (
    <section className="stock-list">
      {stocks.map((stock) => (
        <StockCard key={stock.symbol} stock={stock} onRemove={onRemove} />
      ))}
    </section>
  );
};
