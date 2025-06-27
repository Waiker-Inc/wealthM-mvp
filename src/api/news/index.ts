import axios from "@/lib/axios";
import { oapi } from "@/lib/oapiAxios";
import qs from "qs";

interface PaginationParameters {
  page?: number;
  size?: number;
  sort?: string;
}

// 리스트
export interface ReqAINewsListParams extends PaginationParameters {
  fromTargetDate: string; //yyyy-MM-dd'T'HH:mm:ssZ
  toTargetDate: string; //yyyy-MM-dd'T'HH:mm:ssZ
  ricList?: string[];
}

export interface AINewsItem {
  newsId: number;
  originNewsId: string;
  originTitle: string;
  originBody: string;
  titleKo: string;
  bodyKo: string;
  originPress: string;
  startDt: string;
  releaseDt: string;
}

// 상세
export interface NewsDetailTicker {
  ric: string;
  ticker: string;
  companyName: string;
  exchangeCountry: string;
  exchange: string;
  score: number;
  companyImageUrl: string;
}

export interface NewsDetail {
  newsId: number;
  title: string;
  body: string;
  summary: string;
  tickerList: NewsDetailTicker[];
  topicList: string[];
  keywordList: string[];
  storyType: string | null;
  urgency: number;
  originPress: string;
  publishedDt: string;
  revisedDt: string;
}

// 뉴스에 많이 나온 종목
export interface ReqMostMentionedStock {
  page: number;
  size: number;
  lang: string;
  timeCodes: string[];
  symbolTypes: string[];
  startDt: string;
  endDt: string;
}

export interface MostMentionedStock {
  ric: string;
  ticker: string;
  country: string;
  exchange: string;
  timeCode: string;
  symbolType: string;
  imageUrl: string;
  name: string;
  officialName: string;
  count: number;
}

export async function getAINewsList(
  params: ReqAINewsListParams
): Promise<AINewsItem[]> {
  const res = await oapi.get(`/v4/center/ai-news/list`, {
    params,
  });
  return res.data.data;
}

export async function getAINewsDetail(newsId: number): Promise<NewsDetail> {
  const res = await oapi.get(`/v4/center/ai-news/${newsId}`);
  return res.data.data;
}

// 뉴스에 많이 나온 종목
export const getMostMentionedStock = async (params: ReqMostMentionedStock) => {
  const response = await axios.get<MostMentionedStock[]>(
    `v1/wealthm/news/most-mentioned`,
    {
      params,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "repeat" }),
    }
  );

  return response.data;
};
