import axios from "@/lib/axios";
import qs from "qs";

export interface ReqFiling {
  page: number;
  size: number;
  lang: string;
  ricList: string[];
}

export interface ResFiling {
  title: string;
  content: string;
  tags: string[];
  publishedDt: string; // 2025-06-27T04:32:49.157Z
  ric: string;
  ticker: string;
  exchange: string;
  timeCode: string;
  symbolType: string;
  imgUrl: string;
  name: string;
  percentChange: number;
}

export const getFiling = async (params: ReqFiling) => {
  const response = await axios.get<ResFiling[]>(`v1/wealthm/filing`, {
    params,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });

  return response.data;
};
