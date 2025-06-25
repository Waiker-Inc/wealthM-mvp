import { useState } from 'react';
import Typography from '../ui/typography';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

const tabList = [
  { value: 'amount', label: '거래대금' },
  { value: 'volume', label: '거래량' },
  { value: 'up', label: '급상승' },
  { value: 'down', label: '급하락' },
  { value: 'etf', label: 'ETF' },
  { value: 'eco', label: '경제지표' },
];

export default function CustomTabs() {
  const [active, setActive] = useState('amount');

  return (
    <div className="w-full mt-[40px]">
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
      <div className="py-4">
        {active === 'amount' && <AmountTable />}
        {active === 'volume' && (
          <div className="text-muted-foreground p-8 text-center">
            거래량 데이터 준비중
          </div>
        )}
        {active === 'up' && (
          <div className="text-muted-foreground p-8 text-center">
            급상승 데이터 준비중
          </div>
        )}
        {active === 'down' && (
          <div className="text-muted-foreground p-8 text-center">
            급하락 데이터 준비중
          </div>
        )}
        {active === 'etf' && (
          <div className="text-muted-foreground p-8 text-center">
            ETF 데이터 준비중
          </div>
        )}
        {active === 'eco' && (
          <div className="text-muted-foreground p-8 text-center">
            경제지표 데이터 준비중
          </div>
        )}
      </div>
    </div>
  );
}

// 거래대금 테이블 예시
function AmountTable() {
  const data = [
    {
      rank: 1,
      name: '테슬라',
      logo: '/logos/tesla.png',
      change: '+2.38%',
      price: '124.28달러',
      amount: '3.1조',
      favorite: false,
    },
    {
      rank: 2,
      name: '팔란티어',
      logo: '/logos/palantir.png',
      change: '+2.38%',
      price: '124.28달러',
      amount: '3.1조',
      favorite: true,
    },
    {
      rank: 3,
      name: '엔비디아',
      logo: '/logos/nvidia.png',
      change: '+2.38%',
      price: '124.28달러',
      amount: '3.1조',
      favorite: false,
    },
    {
      rank: 4,
      name: '알파벳 A',
      logo: '/logos/google.png',
      change: '+2.38%',
      price: '124.28달러',
      amount: '3.1조',
      favorite: false,
    },
    {
      rank: 5,
      name: '아마존',
      logo: '/logos/amazon.png',
      change: '+2.38%',
      price: '124.28달러',
      amount: '3.1조',
      favorite: true,
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left">
        <thead>
          <tr className="text-muted-foreground text-sm ">
            <th className="font-normal px-2 py-2">
              <Typography size="body-sm" className="text-mono400">
                종목
              </Typography>
            </th>
            <th className="font-normal px-2 py-2">
              <Typography size="body-sm" className="text-mono400">
                등락률
              </Typography>
            </th>
            <th className="font-normal px-2 py-2">
              <Typography size="body-sm" className="text-mono400">
                현재가
              </Typography>
            </th>
            <th className="font-normal px-2 py-2">
              <Typography size="body-sm" className="text-mono400">
                거래대금
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.rank} className=" last:border-0">
              <td className="flex items-center gap-2 px-2 py-2">
                <span
                  className={`w-4 text-center text-xs ${
                    row.favorite ? 'text-yellow-400' : 'text-muted-foreground'
                  }`}
                >
                  {row.favorite ? '★' : '☆'}
                </span>
                <span className="text-xs text-muted-foreground w-4 text-center">
                  {row.rank}
                </span>
                <Avatar className="w-[24px] h-[24px] rounded-full overflow-hidden">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="ml-2">{row.name}</span>
              </td>
              <td className="text-red-500 font-semibold px-2 py-2">
                {row.change}
              </td>
              <td className="px-2 py-2">{row.price}</td>
              <td className="px-2 py-2">{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
