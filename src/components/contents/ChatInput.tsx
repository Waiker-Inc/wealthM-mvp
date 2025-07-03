import { useState } from 'react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { CornerDownLeft } from 'lucide-react';

interface ChatInputProps {
  onSubmit: (value: string) => void;
  isSearch: boolean;
}

export const ChatInput = ({ onSubmit, isSearch }: ChatInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;

    onSubmit(value);
    setValue('');
  };

  return (
    <form
      className={cn(
        `absolute left-1/2 z-20 w-[776px] max-w-full transition-all duration-700 ease-in-out
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
      onSubmit={handleSubmit}
    >
      <div className="flex items-center justify-between">
        <Input
          placeholder="막연한 투자 고민, 웰스엠에 질문하여 명쾌하게 풀어보세요"
          autoFocus
          className={`!border-none !outline-none !ring-0 !focus:outline-none !focus:border-none !focus:ring-0 !focus:ring-transparent !focus:shadow-none placeholder:text-mono500 !bg-transparent p-0 h-[29px] !text-[18px] ${
            value ? 'text-green700' : ''
          }`}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <button
          type="submit"
          className="flex items-center justify-center rounded-full bg-mono100 p-[12px] flex-grow "
        >
          <CornerDownLeft
            size={20}
            className={`${value ? 'text-green700' : ''}`}
          />
        </button>
      </div>
    </form>
  );
};
