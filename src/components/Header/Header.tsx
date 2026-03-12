import { ChartSpline, RotateCw } from "lucide-react";
import "./Header.scss";

type HeaderProps = {
  onRefresh: () => void;
  isRefreshing?: boolean;
};

export const Header = ({ onRefresh, isRefreshing }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header__logo">
        <ChartSpline strokeWidth={2.5} />
        <span>Stock Watchlist</span>
      </div>
      <button className="header__refresh" onClick={onRefresh}>
        <RotateCw size={18} className={isRefreshing ? "spin" : ""} />
      </button>
    </header>
  );
};
