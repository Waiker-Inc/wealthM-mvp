import axios from '@/lib/axios';

export type ChartTabEnum =
  | 'TURN_OVER'
  | 'TRADE_VOLUME'
  | 'RAPID_RISE'
  | 'RAPID_FALL'
  | 'ETF';

export interface ResGetChartStock {
  stockName: string;
  stockImageUrl: string;
  percentChange: number;
  price: number;
  ric: string;
  ticker: string;
  tradeVolume: number;
  type: 'STOCK' | 'ETF';
}

export interface ResGetChatHistorySession {
  userId: string;
  sessionId: string;
  sessionTitle: string;
}

export interface ResGetChatHistoryMessage {
  userId: string;
  sessionId: string;
  senderId: string;
  messageType: string;
  contents: string;
}

export interface ResGetChatHistoryMessageList {
  sessionId: string;
  userId: string;
  page: number;
  size: number;
}

export const getChartStock = async ({
  chartTabEnum,
  count,
}: {
  chartTabEnum: ChartTabEnum;
  count: number;
}) => {
  const response = await axios.get<ResGetChartStock[]>(
    `/v1/wealthm/chart/stock`,
    {
      params: {
        chartTabEnum,
        count,
      },
    }
  );
  return response.data;
};

export const getChatHistorySession = async (
  params: ResGetChatHistorySession
) => {
  const response = await axios.post(`/v1/wealthm/chat-history/session`, {
    ...params,
  });
  return response.data;
};

export const getChatHistorySessionList = async (userId: string) => {
  const response = await axios.get(
    `/v1/wealthm/chat-history/session/list?userId=${userId}`
  );
  return response.data;
};

export const getChatHistoryMessageList = async (
  params: ResGetChatHistoryMessageList
) => {
  const response = await axios.get(
    `/v1/wealthm/chat-history/message/list?userId=${params.userId}&size=${params.size}&page=${params.page}&sessionId=${params.sessionId}`
  );
  return response.data;
};

export const postChatHistoryMessage = async (
  params: ResGetChatHistoryMessage
) => {
  const response = await axios.post(`/v1/wealthm/chat-history/message`, {
    ...params,
  });
  return response.data;
};
