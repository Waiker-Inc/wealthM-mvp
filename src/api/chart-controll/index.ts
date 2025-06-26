import axios from "@/lib/axios";

export type ChartTabEnum =
  | "TURN_OVER"
  | "TRADE_VOLUME"
  | "RAPID_RISE"
  | "RAPID_FALL"
  | "ETF";

export interface ResGetChartStock {
  stockName: string;
  stockImageUrl: string;
  percentChange: number;
  price: number;
  ric: string;
  ticker: string;
  tradeVolume: number;
  type: "STOCK" | "ETF";
}

export const getChartStock = async ({
  chartTabEnum,
  count,
}: {
  chartTabEnum: ChartTabEnum;
  count: number;
}) => {
  const response = await axios.get<{
    data: ResGetChartStock[];
  }>(`/v1/wealthm/chart/stock`, {
    params: {
      chartTabEnum,
      count,
    },
  });
  return response.data;
};
