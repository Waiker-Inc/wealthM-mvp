import { useState } from 'react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import { CornerDownLeft } from 'lucide-react';
import Typography from '../ui/typography';
import FAQList from '../contents/FAQList';
import QuestionCreator from '../contents/QuestionCreator';

export default function Contents() {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('submit');
    e.preventDefault();
    console.log(value);
  };

  return (
    <div className="p-[40px]">
      <div className="w-[776px] mx-auto">
        <form
          className={cn(
            `${
              isFocused ? 'border-white' : ''
            } rounded-[16px] p-[16px_24px] bg-ground2 border-2 border-solid border-transparent ${
              value ? 'border-green700' : ''
            }`
          )}
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="물어봐"
            autoFocus
            className={`!border-none !outline-none placeholder:text-mono500 !focus:outline-none !focus:ring-0 !focus:border-none !bg-transparent p-0 h-[29px] !text-[18px] ${
              value ? 'text-green700' : ''
            }`}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
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
        <FAQList />
        <QuestionCreator />
      </div>
    </div>
  );
}
