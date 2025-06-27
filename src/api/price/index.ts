import axios from "@/lib/axios";
import qs from "qs";

export interface ReqGetPriceChangeRate {
  ricList: string[];
}

export interface ResGetPriceChangeRate {
  ric: string;
  price: number;
  priceChangeRange: number;
  priceChangeRate: number;
  imgUrl: string;
  ticker: string;
  name: string;
}

export const getPriceChangeRate = async ({
  ricList,
}: ReqGetPriceChangeRate) => {
  const response = await axios.get<ResGetPriceChangeRate[]>(
    `v1/wealthm/price/price-change-rate`,
    {
      params: { ricList },
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "repeat" }),
    }
  );
  return response.data;
};
