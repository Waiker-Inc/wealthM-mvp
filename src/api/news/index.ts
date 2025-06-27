import { oapi } from "@/lib/oapiAxios";

interface PaginationParameters {
  page?: number;
  size?: number;
  sort?: string;
}

// 리스트
export interface ReqAINewsListParams extends PaginationParameters {
  startDate: string; //yyyy-MM-dd'T'HH:mm:ssZ
  endDate: string; //yyyy-MM-dd'T'HH:mm:ssZ
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
