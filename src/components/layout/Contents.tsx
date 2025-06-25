import { useState } from 'react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { CornerDownLeft } from 'lucide-react';
import Typography from '../ui/typography';
import FAQList from '../contents/FAQList';
import QuestionCreator from '../contents/QuestionCreator';

export default function Contents() {
  const [isFocused, setIsFocused] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [hideContent, setHideContent] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [value, setValue] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleContentTransitionEnd = () => {
    if (isSearch) setHideContent(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;
    setIsSearch(true);
    setQuestion(value);
    setIsWaiting(true);

    setTimeout(() => {
      setIsWaiting(false);
      setAnswer('이곳에 실제 답변이 표시됩니다.');
    }, 5000);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <form
        className={cn(
          `fixed left-1/2 z-20 w-[776px] max-w-full transition-all duration-700 ease-in-out
          rounded-[16px] p-[16px_24px] bg-ground2 border-2 border-solid border-transparent
          ${isFocused && 'border-white'}
          ${value && 'border-green700'}
          ${
            isSearch
              ? 'bottom-[40px] top-auto -translate-x-1/2 shadow-2xl'
              : 'top-[40px] bottom-auto -translate-x-1/2'
          }
          `
        )}
        style={{
          opacity: isSearch && !isWaiting ? 0.95 : 1,
        }}
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="물어봐"
          autoFocus
          className={`!border-none !outline-none placeholder:text-mono500 !focus:outline-none !focus:ring-0 !focus:border-none !bg-transparent p-0 h-[29px] !text-[18px] ${
            value ? 'text-green700' : ''
          }`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className="flex items-center justify-between mt-[16px]">
          <Typography>웹검색</Typography>
          <button
            type="submit"
            className="flex items-center justify-center rounded-full bg-mono100 p-[12px]"
          >
            <CornerDownLeft
              size={20}
              className={`${value ? 'text-green700' : ''}`}
            />
          </button>
        </div>
      </form>

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
          className="w-[776px] mx-auto flex flex-col gap-4 items-start pt-[40px] pb-[120px] min-h-screen absolute top-0 left-[calc(50%-388px)]"
          style={{ minHeight: 'calc(100vh - 120px)' }}
        >
          <div className="self-end bg-green700 text-white px-5 py-3 rounded-2xl rounded-br-sm shadow-lg max-w-[70%] text-base animate-fade-in">
            {question}
          </div>
          {isWaiting && (
            <div className="flex items-center gap-2 mt-2 animate-fade-in">
              <div className="w-2 h-2 bg-mono400 rounded-full animate-bounce [animation-delay:0ms]" />
              <div className="w-2 h-2 bg-mono400 rounded-full animate-bounce [animation-delay:150ms]" />
              <div className="w-2 h-2 bg-mono400 rounded-full animate-bounce [animation-delay:300ms]" />
              <span className="ml-2 text-mono400 text-sm">답변 생성 중...</span>
            </div>
          )}
          {!isWaiting && answer && (
            <div className="self-start bg-mono100 text-mono900 px-5 py-3 rounded-2xl rounded-bl-sm shadow max-w-[70%] text-base animate-fade-in">
              {answer}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
