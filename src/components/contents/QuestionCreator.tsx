import { useEffect, useState } from 'react';
import Typography from '../ui/typography';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Check } from 'lucide-react';
import { useFavoriteSymbols } from '@/hooks/useFavoriteSymbols';
import { useQuery } from '@tanstack/react-query';
import { getPriceChangeRate } from '@/api/price';
import keywordData from '@/constants/keyword.json';

const tabList = [
  { value: 'my', label: 'My Favorite Symbols' },
  { value: 'popular', label: 'Popular Symbols' },
];

export default function QuestionCreator({
  handleSubmit,
}: {
  handleSubmit: (question: string) => void;
}) {
  const [active, setActive] = useState('my');
  return (
    <div className="mt-[58px]">
      <Typography size="body-lg" weight="bold">
        Create Questions with Clicks
      </Typography>
      <Typography size="body-sm" className="text-mono400 mt-[4px]">
        Create your own question prompts by clicking on favorite stocks and
        keywords
      </Typography>
      <div className="w-full mt-[16px]">
        {/* Tab Header */}
        <div className="flex border-b border-border">
          {tabList.map((tab) => (
            <button
              key={tab.value}
              className={`px-4 py-3 font-semibold text-base transition-all
              border-b-2 cursor-pointer
              ${
                active === tab.value
                  ? 'text-white border-primary'
                  : 'border-transparent hover:text-primary/80 text-mono400'
              }`}
              onClick={() => setActive(tab.value)}
              aria-selected={active === tab.value}
              tabIndex={0}
              role="tab"
              type="button"
            >
              <Typography size="body-sm">{tab.label}</Typography>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-4">
          {active === 'my' && <MySymbolTable handleSubmit={handleSubmit} />}
        </div>
      </div>
    </div>
  );
}

function MySymbolTable({
  handleSubmit,
}: {
  handleSubmit: (question: string) => void;
}) {
  const { symbols } = useFavoriteSymbols();
  const [activeSymbol, setActiveSymbol] = useState<string | null>(null);
  const [activeKeyword, setActiveKeyword] = useState<string | null>(null);
  const ricList = symbols.map((symbol) => symbol.ric);

  const { data } = useQuery({
    queryKey: ['click-question', ricList],
    queryFn: () => getPriceChangeRate({ ricList }),
    enabled: ricList.length > 0,
  });

  // Symbol click
  const handleSymbolClick = (id: string) => {
    setActiveSymbol(id === activeSymbol ? null : id);
  };

  // Keyword click
  const handleKeywordClick = (id: string) => {
    setActiveKeyword(id === activeKeyword ? null : id);
  };

  useEffect(() => {
    if (activeSymbol && activeKeyword) {
      handleSubmit(`${activeSymbol} ${activeKeyword}`);
    }
  }, [activeSymbol, activeKeyword]);

  return (
    <div className="mt-[20px] flex">
      {/* Symbol List */}
      <div className="flex-1">
        <Typography size="body-sm">Symbol</Typography>
        <div className="mt-[16px]">
          {data?.map((symbol) => {
            const isActive = activeSymbol === symbol.name;
            return (
              <div
                key={symbol.ric}
                tabIndex={0}
                role="button"
                aria-label={symbol.name}
                onClick={() => handleSymbolClick(symbol.name)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && handleSymbolClick(symbol.ric)
                }
                className={`flex items-center gap-[10px] py-[12px] px-2 rounded-lg cursor-pointer transition ${
                  activeSymbol && !isActive && 'opacity-50'
                }`}
              >
                {isActive ? (
                  <div className="w-[32px] h-[32px] bg-green700 rounded-full flex items-center justify-center">
                    <Check className="text-700" size={16} />
                  </div>
                ) : (
                  <Avatar className="w-[32px] h-[32px]">
                    <AvatarImage src={symbol.imgUrl} />
                    <AvatarFallback>{symbol.name[0]}</AvatarFallback>
                  </Avatar>
                )}

                <div>
                  <Typography size="body-sm">{symbol.name}</Typography>
                  <Typography size="label-md" className="text-mono400">
                    {symbol.ticker}
                  </Typography>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Keyword List */}
      <div className="flex-1">
        <Typography size="body-sm">Keyword</Typography>
        <div className="mt-[16px] flex gap-[10px] flex-wrap">
          {keywordData.map((keyword) => {
            const isActive = activeKeyword === keyword.keyword;
            return (
              <button
                key={keyword.keyword}
                tabIndex={0}
                aria-label={keyword.keyword}
                onClick={() => handleKeywordClick(keyword.question)}
                className={`rounded-[4px] p-[6px_12px] max-w-fit min-w-fit text-mono450 text-sm transition cursor-pointer
                  ${isActive ? 'bg-green700 text-white' : 'bg-mono50'}
                `}
              >
                #{keyword.keyword}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
