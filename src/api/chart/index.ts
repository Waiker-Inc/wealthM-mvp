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

export interface ResGetChatHistoryTask {
  userId: string;
  taskId: string;
  taskTitle: string;
}

export interface ResGetChatHistoryMessage {
  userId: string;
  taskId: string;
  senderId: string;
  messageType: string;
  contents: string;
}

export interface ResGetChatHistoryMessageList {
  taskId: string;
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

export const getChatHistoryTask = async (params: ResGetChatHistoryTask) => {
  const response = await axios.post(`/v1/wealthm/chat-history/task`, {
    ...params,
  });
  return response.data;
};

export const getChatHistoryTaskList = async (userId: string) => {
  const response = await axios.get(
    `/v1/wealthm/chat-history/task/list?userId=${userId}`
  );
  return response.data;
};

export const getChatHistoryMessageList = async (
  params: ResGetChatHistoryMessageList
) => {
  const response = await axios.get(
    `/v1/wealthm/chat-history/message/list?userId=${params.userId}&size=${params.size}&page=${params.page}&taskId=${params.taskId}`
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
