import type { ChartTabEnum } from "@/api/chart";
import { getPriceChangeRate, type ResGetPriceChangeRate } from "@/api/price";

import Tab from "@/components/Tab";
import { useFavoriteSymbols } from "@/hooks/useFavoriteSymbols";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const TABS: { value: string; label: string }[] = [
  { value: "PRICE_CHANGE_RATE", label: "등락" },
  { value: "PERFORMANCE", label: "실적" },
  { value: "NEWS", label: "뉴스" },
  { value: "ANNOUNCEMENT", label: "공시" },
];

export default function MyFavoriteStockNews() {
  const { symbols } = useFavoriteSymbols();
  const [activeTab, setActiveTab] = useState<string>("TURN_OVER");
  const ricList = symbols.map((symbol) => symbol.ric);

  return (
    <div>
      MyFavoriteStockNews
      <Tab tabList={TABS} activeTab={activeTab} setActive={setActiveTab} />
      {activeTab === "PRICE_CHANGE_RATE" && (
        <PriceChangeRate ricList={ricList} />
      )}
    </div>
  );
}

const PriceChangeRate = ({ ricList }: { ricList: string[] }) => {
  const { data } = useQuery({
    queryKey: ["price-change-rate", ricList],
    queryFn: () => getPriceChangeRate({ ricList }),
    enabled: ricList.length > 0,
    select: (data) => data.filter((item) => item.priceChangeRange >= 5),
  });
  console.log(data);

  return (
    <div className="mt-5 flex flex-col gap-y-6">
      {data?.map((item) => {
        const isPositive = item.priceChangeRate > 0;
        return (
          <div key={item.ric}>
            <span>주가가 </span>
            <div>{item.ric}</div>
            <div>{item.priceChangeRate.toFixed(1)}%</div>
          </div>
        );
      })}
    </div>
  );
};
