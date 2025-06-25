import { useState } from 'react';
import { cn } from '@/lib/utils';
import FAQList from '../contents/FAQList';
import QuestionCreator from '../contents/QuestionCreator';
import { ChatInput } from '../contents/ChatInput';
import { ChatMessage } from '../contents/ChatMessage';
import { useChat } from '@/hooks/useChat';
import { CHAT_CONSTANTS } from '@/constants/chat';

export default function Contents() {
  const [isSearch, setIsSearch] = useState(false);
  const [hideContent, setHideContent] = useState(false);
  const { qaHistory, addQuestion, simulateAnswer } = useChat();

  const handleContentTransitionEnd = () => {
    if (isSearch) setHideContent(true);
  };

  const handleSubmit = (question: string) => {
    setIsSearch(true);
    const questionId = addQuestion(question);
    simulateAnswer(questionId, CHAT_CONSTANTS.ANIMATION_DELAY);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
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
          {qaHistory.map((qa) => (
            <ChatMessage
              key={qa.id}
              question={qa.question}
              answer={qa.answer}
              isWaiting={qa.isWaiting}
            />
          ))}
        </div>
      )}
    </div>
  );
}
