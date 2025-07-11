import { useState } from 'react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { CornerDownLeft } from 'lucide-react';
import { usePanelSizeStore } from '@/stores/panelSizeStore';

interface ChatInputProps {
  onSubmit: (value: string) => void;
  isSearch: boolean;
}

export const ChatInput = ({ onSubmit, isSearch }: ChatInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');
  const leftPanelWidth = usePanelSizeStore((state) => state.leftPanelWidth);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;

    onSubmit(value);
    setValue('');
  };

  // 중앙 패널의 시작 위치와 너비 계산
  const centerPanelLeft = leftPanelWidth;
  const centerPanelWidth = window.innerWidth - leftPanelWidth;

  // Contents 영역 내에서의 중앙 위치 계산
  const inputLeft = centerPanelLeft + centerPanelWidth / 2;
  const maxWidth = Math.min(centerPanelWidth - 48, 776);

  return (
    <form
      className={cn(
        `fixed z-20 transition-all duration-700 ease-in-out
        rounded-[16px] p-[16px_24px] bg-ground2 border-2 border-solid border-transparent
        ${isFocused && 'border-white'}
        ${value && 'border-green700'}
        ${isSearch ? 'bottom-[40px] shadow-2xl' : 'top-[40px]'}
        `
      )}
      style={{
        left: `${inputLeft}px`,
        width: `${maxWidth}px`,
        transform: 'translateX(-50%)',
      }}
      onSubmit={handleSubmit}
    >
      <div className="flex items-center justify-between">
        <Input
          placeholder="Have any investment concerns? Ask WealthM for clear answers"
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
