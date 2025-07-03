import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import FAQList from '../contents/FAQList';
import QuestionCreator from '../contents/QuestionCreator';
import { ChatInput } from '../contents/ChatInput';
// import { ChatMessage } from '../contents/ChatMessage';
import { useChat } from '@/hooks/useChat';
import useWebSocket from '@/hooks/useWebSocket';

export default function Contents() {
  const [isSearch, setIsSearch] = useState(false);
  const [hideContent, setHideContent] = useState(false);
  const { addQuestion, updateAnswer } = useChat();
  const pendingQuestionId = useRef<string | null>(null);

  const { sendMessage } = useWebSocket({
    onOpen: () => {
      console.log('웹소켓 연결됨');
    },
    onClose: () => {
      console.log('웹소켓 연결 해제됨');
    },
    onError: (error) => {
      console.error('웹소켓 오류:', error);
    },
    onMessage: (message) => {
      console.log(message);
      console.log(message.data);
      const { topic, message: msg, status, task_id } = message.data;
      const { message: answer } = msg;

      if (topic === 'final') {
        updateAnswer(task_id, answer, false);
      } else if (status === 'Task submitted') {
        // 서버가 task_id를 내려주는 경우, 질문 등록
        if (pendingQuestionId.current) {
          addQuestion(pendingQuestionId.current, task_id);
          pendingQuestionId.current = null;
        }
      }
    },
  });

  const handleContentTransitionEnd = () => {
    if (isSearch) setHideContent(true);
  };

  const handleSubmit = (question: string) => {
    setIsSearch(true);
    // 임시 ID로 바로 등록
    const tempId = Date.now().toString();
    addQuestion(question, tempId);
    // 서버에 tempId도 같이 보냄
    sendMessage({
      question: {
        data: [
          {
            question: '테슬라 정치인 거래',
            language: 'korean',
            intent: 'query',
            confidence: 1,
            widgets: [
              'PoliticianTradingHistoryByStock',
              'PoliticianHighReturnStocks',
              'PoliticianTradingTrends',
              'PoliticianCommitteeRelatedTrades',
            ],
            table_mapping: null,
            has_augmentation: true,
          },
        ],
        widget: [
          'PoliticianTradingHistoryByStock',
          'PoliticianHighReturnStocks',
          'PoliticianTradingTrends',
          'PoliticianCommitteeRelatedTrades',
        ],
      },
      tempId,
    });
    // pendingQuestionId.current = tempId; // 필요시
  };

  return (
    <div className="relative min-h-screen overflow-y-scroll pb-[120px]">
      <ChatInput onSubmit={handleSubmit} isSearch={isSearch} />

      {!hideContent && (
        <div
          className={cn(
            'mt-[56px] w-[776px] mx-auto pt-[120px] transition-all duration-700 ease-in-out',
            isSearch ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100'
          )}
          onTransitionEnd={handleContentTransitionEnd}
        >
          <FAQList />
          <QuestionCreator />
        </div>
      )}

      {isSearch && (
        <div
          className="w-[776px] mx-auto flex flex-col gap-4 items-start pt-[40px] pb-[120px] min-h-screen absolute top-0 left-[calc(50%-388px)] overflow-y-auto"
          style={{ minHeight: 'calc(100vh - 120px)' }}
        >
          {/* {qaHistory.map((qa) => (
            <ChatMessage
              key={qa.id}
              question={qa.question}
              answer={getAnswer(qa.id)}
              isWaiting={qa.isWaiting}
            />
          ))} */}
          {/* <ChatMessage
            key="test"
            question="test"
            answer="test"
            isWaiting={false}
          /> */}
        </div>
      )}
    </div>
  );
}
