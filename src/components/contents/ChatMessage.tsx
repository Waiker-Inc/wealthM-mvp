import { LoadingIndicator } from "./LoadingIndicator";

interface ChatMessageProps {
  question: string;
  answer?: string;
  isWaiting?: boolean;
}

export const ChatMessage = ({
  question,
  answer,
  isWaiting,
}: ChatMessageProps) => (
  <div className="w-full flex flex-col gap-4">
    {/* 질문 */}
    <div className="self-end bg-green700 text-700 px-5 py-3 rounded-2xl rounded-br-sm shadow-lg max-w-[70%] text-base animate-fade-in">
      {question}
    </div>

    {/* 대기 중인 경우 로딩 표시 */}
    {isWaiting && <LoadingIndicator />}

    {/* 답변 */}
    {answer && (
      <div className="self-start bg-mono100 text-mono900 px-5 py-3 rounded-2xl rounded-bl-sm shadow max-w-[70%] text-base animate-fade-in">
        {answer}
      </div>
    )}
  </div>
);
