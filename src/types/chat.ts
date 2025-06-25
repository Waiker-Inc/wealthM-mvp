export type QAMessage = {
  id: string;
  question: string;
  answer?: string;
  isWaiting?: boolean;
};
