import { useState } from 'react';
import Typography from '../ui/typography';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Check } from 'lucide-react';
import { useFavoriteSymbols } from '@/hooks/useFavoriteSymbols';
import { useQuery } from '@tanstack/react-query';
import { getPriceChangeRate } from '@/api/price';
import keywordData from '@/constants/keyword.json';

const tabList = [
  { value: 'my', label: '내 관심 심볼' },
  { value: 'popular', label: '질문이 많은 심볼' },
];

export default function QuestionCreator() {
  const [active, setActive] = useState('my');
  return (
    <div className="mt-[58px]">
      <Typography size="body-lg" weight="bold">
        클릭으로 질문 생성
      </Typography>
      <Typography size="body-sm" className="text-mono400 mt-[4px]">
        관심 종목과 키워드를 클릭하여 나만의 질문 프롬프트를 생성해보세요
      </Typography>
      <div className="w-full mt-[16px]">
        {/* 탭 헤더 */}
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

        {/* 탭 컨텐츠 */}
        <div className="py-4">{active === 'my' && <MySymbolTable />}</div>
      </div>
    </div>
  );
}

function MySymbolTable() {
  const { symbols } = useFavoriteSymbols();
  const [activeSymbol, setActiveSymbol] = useState<string | null>(null);
  const [activeKeyword, setActiveKeyword] = useState<string | null>(null);
  const ricList = symbols.map((symbol) => symbol.ric);

  const { data } = useQuery({
    queryKey: ['click-question', ricList],
    queryFn: () => getPriceChangeRate({ ricList }),
    enabled: ricList.length > 0,
  });

  // 심볼 클릭
  const handleSymbolClick = (id: string) => {
    setActiveSymbol(id === activeSymbol ? null : id);
  };

  // 키워드 클릭
  const handleKeywordClick = (id: string) => {
    setActiveKeyword(id === activeKeyword ? null : id);
  };

  // 필터링
  // const filteredSymbols = activeKeyword
  //   ? symbols.filter((s) => s.keywords.includes(activeKeyword))
  //   : symbols;
  // const filteredKeywords = activeSymbol
  //   ? keywords.filter((k) =>
  //       symbols.find((s) => s.id === activeSymbol)?.keywords.includes(k.id)
  //     )
  //   : keywords;

  return (
    <div className="mt-[20px] flex">
      {/* 심볼 리스트 */}
      <div className="flex-1">
        <Typography size="body-sm">심볼</Typography>
        <div className="mt-[16px]">
          {data?.map((symbol) => {
            const isActive = activeSymbol === symbol.ric;
            // const isDimmed =
            //   activeKeyword && !symbol.keywords.includes(activeKeyword);
            return (
              <div
                key={symbol.ric}
                tabIndex={0}
                role="button"
                aria-label={symbol.name}
                onClick={() => handleSymbolClick(symbol.ric)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && handleSymbolClick(symbol.ric)
                }
                className={`flex items-center gap-[10px] py-[12px] px-2 rounded-lg cursor-pointer transition`}
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
      {/* 키워드 리스트 */}
      <div className="flex-1">
        <Typography size="body-sm">키워드</Typography>
        <div className="mt-[16px] flex gap-[10px] flex-wrap">
          {keywordData.map((keyword) => {
            const isActive = activeKeyword === keyword.keyword;
            // const isDimmed =
            //   activeSymbol &&
            //   !data
            //     ?.find((s) => s.ric === activeSymbol)
            //     ?.keywords.includes(keyword.id);
            return (
              <button
                key={keyword.keyword}
                tabIndex={0}
                aria-label={keyword.keyword}
                onClick={() => handleKeywordClick(keyword.keyword)}
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
