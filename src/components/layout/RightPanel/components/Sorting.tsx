import { useInView } from 'react-intersection-observer';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  getChartStock,
  type ChartTabEnum,
  type ResGetChartStock,
} from '@/api/chart';
import StockModal from '@/components/modal/StockModal';
import { useModalStore } from '@/stores/modalStore';
import Typography from '@/components/ui/typography';

const TABS: { value: ChartTabEnum; label: string; key: string }[] = [
  { value: 'TURN_OVER', label: '거래대금', key: 'tradeVolume' },
  { value: 'TRADE_VOLUME', label: '거래량', key: 'tradeVolume' },
  { value: 'RAPID_RISE', label: '급상승', key: 'percentChange' },
  { value: 'RAPID_FALL', label: '급하락', key: 'percentChange' },
  { value: 'ETF', label: 'ETF', key: 'tradeVolume' },
];

export default function Sorting() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [leftRef, leftInView] = useInView({ threshold: 0.5 });
  const [rightRef, rightInView] = useInView({ threshold: 0.5 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [activeTab, setActiveTab] = useState(TABS[0].value);
  const { data } = useQuery({
    queryKey: ['sorting', activeTab],
    queryFn: () => getChartStock({ chartTabEnum: activeTab, count: 5 }),
    select: (data) => data.filter((item) => item.type === 'STOCK'),
  });

  const startScroll = (direction: 'left' | 'right') => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += direction === 'right' ? 10 : -10;
      }
    }, 16);
  };

  const stopScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Typography size="title-lg" weight="bold">
        실시간 차트
      </Typography>
      <div className="w-full">
        {/* 탭 헤더 */}
        <div className="relative w-full flex flex-row">
          {/* 좌측 버튼 */}
          {!leftInView && (
            <div className="w-[34px] h-[90px] absolute left-0 top-[-25px] pointer-events-none transform rotate-90 bg-gradient-to-b from-transparent to-ground2/80 z-10" />
          )}
          {!leftInView && (
            <button
              className="p-1.5 cursor-pointer absolute left-0 top-[10px] size-4 z-20"
              onMouseDown={() => startScroll('left')}
              onMouseUp={stopScroll}
              onMouseLeave={stopScroll}
              onTouchStart={() => startScroll('left')}
              onTouchEnd={stopScroll}
            >
              <ChevronLeft className="size-4" />
            </button>
          )}
          <div
            ref={scrollRef}
            className="w-full overflow-x-scroll scrollbar-hide flex border-b border-[#24272A]"
          >
            <div
              ref={leftRef}
              className="w-px min-w-2 h-full flex-shrink-0 inline-block"
            />
            {TABS.map((tab) => (
              <button
                key={tab.value}
                className={`px-4 py-3 font-semibold text-base transition-all border-b-2 whitespace-nowrap
                  ${
                    activeTab === tab.value
                      ? 'text-700 border-white'
                      : 'border-transparent hover:text-primary/80 text-mono400'
                  }
                `}
                onClick={() => setActiveTab(tab.value)}
                aria-selected={activeTab === tab.value}
                tabIndex={0}
                role="tab"
                type="button"
              >
                {tab.label}
              </button>
            ))}
            <div
              ref={rightRef}
              className="w-px min-w-2 h-full flex-shrink-0 inline-block"
            />
          </div>
          {/* 우측 버튼 */}
          {!rightInView && (
            <div className="w-[34px] h-[90px] absolute right-0 top-[-25px] pointer-events-none transform rotate-[-90deg] bg-gradient-to-b from-transparent to-ground2/80" />
          )}
          {!rightInView && (
            <button
              className="p-1.5 cursor-pointer absolute right-0 top-[10px] size-4 "
              onMouseDown={() => startScroll('right')}
              onMouseUp={stopScroll}
              onMouseLeave={stopScroll}
              onTouchStart={() => startScroll('right')}
              onTouchEnd={stopScroll}
            >
              <ChevronRight className="size-4" />
            </button>
          )}
        </div>
        {/* 탭 컨텐츠 */}
        <div className="py-4 flex flex-col gap-y-4">
          {data?.map((item) => (
            <StockItem key={item.stockName} item={item} activeTab={activeTab} />
          ))}
        </div>
      </div>
    </div>
  );
}

const StockItem = ({
  item,
  activeTab,
}: {
  item: ResGetChartStock;
  activeTab: ChartTabEnum;
}) => {
  const { openModal } = useModalStore();
  const key = TABS.find((tab) => tab.value === activeTab)
    ?.key as keyof typeof item;

  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        openModal(StockModal, { ric: 'asdf' });
      }}
    >
      <div className="flex flex-row gap-x-2">
        <img
          src={item.stockImageUrl}
          alt={item.stockName}
          className="size-[20px] rounded-full"
        />
        <div className="flex flex-row gap-x-2 justify-between w-full">
          <div className="text-sm font-medium">{item.stockName}</div>
          <div className="text-sm text-mono400">
            {item[key].toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};
