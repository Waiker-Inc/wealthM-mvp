import axios from "@/lib/axios";

export interface ReqGetSearchStock {
  keyword: string;
  page: number;
  size: number;
  //   lang:'KO' | 'EN';
  //   countrySet:string[];
}

export interface ResGetSearchStock {
  wcode: string;
  ric: string;
  ticker: string;
  country: string;
  exchange: string;
  timeCode: string;
  classScheme: string;
  symbolType: string;
  currency: string;
  imgUrl: string;
  lang: string;
  name: string;
  trbcAct: string;
  officialName: string;
}

export const getSearchStock = async (params: ReqGetSearchStock) => {
  const response = await axios.get<{ data: ResGetSearchStock[] }>(
    `/v1/wealthm/search/symbol`,
    {
      params: {
        ...params,
        lang: "EN",
        countrySet: "US",
        typeset: "stock",
      },
    }
  );
  return response.data;
};
