import { useState } from 'react';
import Typography from '../ui/typography';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

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
              border-b-2
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
  const [tab, setTab] = useState<'all' | 'stock' | 'ETF' | 'index'>('all');
  return (
    <div>
      <div className="flex items-center gap-[10px]">
        <Typography
          size="label-lg"
          className={`rounded-full text-mono400 p-[6px_14px] ${
            tab === 'all' ? 'bg-mono50 text-white' : ''
          }`}
          onClick={() => setTab('all')}
        >
          전체
        </Typography>
        <Typography
          size="label-lg"
          className={`rounded-full text-mono400 p-[6px_14px] ${
            tab === 'stock' ? 'bg-mono50 text-white' : ''
          }`}
          onClick={() => setTab('stock')}
        >
          주식
        </Typography>
        <Typography
          size="label-lg"
          className={`rounded-full text-mono400 p-[6px_14px] ${
            tab === 'ETF' ? 'bg-mono50 text-white' : ''
          }`}
          onClick={() => setTab('ETF')}
        >
          ETF
        </Typography>
        <Typography
          size="label-lg"
          className={`rounded-full text-mono400 p-[6px_14px] ${
            tab === 'index' ? 'bg-mono50 text-white' : ''
          }`}
          onClick={() => setTab('index')}
        >
          경제지표
        </Typography>
      </div>
      {tab === 'all' && (
        <div className="mt-[20px] flex">
          <div className="flex-1">
            <Typography size="body-sm">심볼</Typography>
            <div className="mt-[16px]">
              {Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-[10px] py-[12px]"
                >
                  <Avatar className="w-[32px] h-[32px]">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <Typography size="body-sm">키워드</Typography>
                    <Typography size="label-md" className="text-mono400">
                      키워드
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <Typography size="body-sm">키워드</Typography>
            <div className="mt-[16px] flex gap-[10px] flex-wrap">
              {Array.from({ length: 10 }).map((_, index) => (
                <Typography
                  key={index}
                  size="body-sm"
                  className="rounded-[4px] bg-mono50 p-[6px_12px] max-w-fit text-mono450 min-w-fit"
                >
                  #키워드
                </Typography>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
