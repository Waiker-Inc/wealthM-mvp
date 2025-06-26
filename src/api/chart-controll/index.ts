import axios from "@/lib/axios";

export type ChartTabEnum =
  | "TURN_OVER"
  | "TRADE_VOLUME"
  | "RAPID_RISE"
  | "RAPID_FALL"
  | "ETF";
export const getChartStock = async ({
  chartTabEnum,
  count,
}: {
  chartTabEnum: ChartTabEnum;
  count: number;
}) => {
  const response = await axios.get<{
    data: {
      stockName: string;
      stockImageUrl: string;
      percentChange: number;
      price: number;
      type: "STOCK" | "ETF";
      tradeVolume: number;
    }[];
  }>(`/v1/wealthm/chart/stock`, {
    params: {
      chartTabEnum,
      count,
    },
  });
  return response.data;
};
