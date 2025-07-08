import { AlignLeft, ArrowUpDown, Bolt, Pen } from 'lucide-react';
import Typography from '../ui/typography';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { useState } from 'react';
import MyFavoriteSymbolDialog from '@/components/contents/MyFavoriteSymbolDialog';
import { Progress } from '../ui/progress';
import { useQuery } from '@tanstack/react-query';
import { useFavoriteSymbols } from '@/hooks/useFavoriteSymbols';
import { getPriceChangeRate } from '@/api/price';
import { cn } from '@/lib/utils';
import { getChatHistoryTaskList } from '@/api/chart';
import useWebSocket from '@/hooks/useWebSocket';

export default function LeftPanel() {
  const { symbols } = useFavoriteSymbols();
  const [isOpenFavorite, setIsOpenFavorite] = useState(false);
  const ricList = symbols.map((symbol) => symbol.ric);
  const { userId } = useWebSocket({});

  const { data } = useQuery({
    queryKey: ['left-price-change-rate', ricList],
    queryFn: () => getPriceChangeRate({ ricList }),
    enabled: ricList.length > 0,
  });

  const { data: taskList } = useQuery({
    queryKey: ['left-task-list', userId],
    queryFn: () => getChatHistoryTaskList(userId),
  });

  console.log(taskList, 666);

  // console.log(data);

  return (
    <aside className="bg-bg-low h-[100vh] p-[40px_24px] text-700 overflow-auto">
      <h1 className="flex items-center justify-center">
        <svg
          width="46"
          height="40"
          viewBox="0 0 46 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.8963 0L0.503906 20H7.51713L20.9096 0H13.8963Z"
            fill="#797979"
          />
          <path
            d="M28.5995 5.2354L38.4871 20H45.5003L32.1079 0H25.0947L11.6987 20L17.3513 28.4389L20.8597 23.2035L18.7155 20L28.5995 5.2354Z"
            fill="#797979"
          />
          <path
            d="M38.4868 20L25.0944 40H32.1076L45.5 20H38.4868Z"
            fill="white"
          />
          <path
            d="M30.7968 25.2354L34.3052 20L28.6526 11.561L25.1442 16.7964L27.2884 20L17.4008 34.7646L7.51322 20H0.5L13.8069 39.869C13.8354 39.9115 13.8746 39.9433 13.9174 39.9681L13.896 40H20.9128L30.8004 25.2354H30.7968Z"
            fill="white"
          />
        </svg>
      </h1>
      <ul className="mt-[48px] flex flex-col gap-[32px]">
        <li>
          <div className="flex items-center gap-[10px]">
            <Pen size={20} />
            <Typography size="body-lg" weight="bold">
              새로운 질문
            </Typography>
          </div>
          <Typography size="body-sm" className="text-mono400 mt-[12px]">
            하루에 최대 10개의 질문이 가능합니다.
          </Typography>
          <div className="flex items-center gap-[10px] mt-[5px]">
            <Progress max={100} value={50} />
            <Typography size="label-md" className="text-mono400">
              5/10
            </Typography>
          </div>
        </li>
        <li>
          <div className="flex items-center gap-[10px]">
            <AlignLeft size={20} />
            <Typography size="body-lg" weight="bold">
              지난 질문들
            </Typography>
          </div>

          <div className="mt-[16px] ml-[8px]">
            <Typography size="label-lg" className="text-text-highest">
              오늘
            </Typography>
            <ul>
              <Typography
                as="li"
                size="body-sm"
                className="cursor-pointer text-text-low p-[8px] rounded-[4px] hover:bg-surface-low hover:text-700"
              >
                팔란티어의 1년 수익률
              </Typography>
            </ul>
          </div>
          <div className="mt-[16px] ml-[8px]">
            <Typography size="label-lg" className="text-text-highest">
              어제
            </Typography>
            <ul>
              <Typography
                as="li"
                size="body-sm"
                className="cursor-pointer text-text-low p-[8px] rounded-[4px] hover:bg-surface-low hover:text-700"
              >
                최근 급등주 리스트
              </Typography>
            </ul>
          </div>
        </li>
        <li>
          <div className="flex items-center gap-[10px]">
            <Bolt size={20} />
            <Typography size="body-lg" weight="bold">
              내 관심 심볼
            </Typography>
            <Button
              className="ml-auto h-[27px] bg-mono50 text-mono600 cursor-pointer"
              onClick={() => {
                setIsOpenFavorite(!isOpenFavorite);
              }}
            >
              편집
            </Button>
          </div>
          <div className="flex items-center gap-[4px] mt-[16px]">
            <Typography size="label-md" className="text-mono400">
              상승률 순
            </Typography>
            <ArrowUpDown size={16} className="text-mono400" />
          </div>
          <ul className="mt-[16px] flex flex-col gap-[16px]">
            {data?.map((item) => (
              <li
                className="flex items-center w-full gap-[12px]"
                key={item.ric}
              >
                <Avatar>
                  <AvatarImage src={item.imgUrl} />
                </Avatar>
                <div>
                  <Typography size="body-sm">{item.name}</Typography>
                  <Typography size="label-md" className="text-text-low">
                    {item.ticker}
                  </Typography>
                </div>
                <div className="ml-auto">
                  <Typography
                    size="body-sm"
                    className={cn(
                      item.priceChangeRate > 0
                        ? 'text-rise-500'
                        : 'text-drop-500'
                    )}
                  >
                    {item.priceChangeRate > 0 ? '+' : ''}
                    {item.priceChangeRate.toFixed(1)}%
                  </Typography>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <MyFavoriteSymbolDialog
        isOpen={isOpenFavorite}
        onClose={() => {
          setIsOpenFavorite(false);
        }}
      />
    </aside>
  );
}
