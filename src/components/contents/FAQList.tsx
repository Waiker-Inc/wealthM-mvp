import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import Typography from '../ui/typography';

const faqList = [
  {
    symbol: 'AAPL.O',
    type: 'stock',
    keyword: '실적 전망',
    question: '다음 분기 실적 전망은 어떻게 되나요?',
    koreanName: '애플',
  },
  {
    symbol: 'TSLA.O',
    type: 'stock',
    keyword: '어닝 서프라이즈',
    question: '최근 어닝 서프라이즈 현황은 어떤가요?',
    koreanName: '테슬라',
  },
  {
    symbol: 'NVDA.O',
    type: 'stock',
    keyword: '기관 거래',
    question: '기관투자자들이 최근 거래했나요?',
    koreanName: '엔비디아',
  },
  {
    symbol: 'GOOGL.O',
    type: 'stock',
    keyword: '주가',
    question: '현재 주가는 어떻게 되나요?',
    koreanName: '알파벳',
  },
  {
    symbol: 'MSFT.O',
    type: 'stock',
    keyword: '매출',
    question: '최근 매출 성장률은 어떻게 되나요?',
    koreanName: '마이크로소프트',
  },
  {
    symbol: 'AMZN.O',
    type: 'stock',
    keyword: '최근 소식',
    question: '관련 최근 뉴스는 무엇인가요?',
    koreanName: '아마존',
  },
  {
    symbol: 'META.O',
    type: 'stock',
    keyword: '이익',
    question: '분기별 순이익 변화는 어떤가요?',
    koreanName: '메타',
  },
  {
    symbol: 'NFLX.O',
    type: 'stock',
    keyword: '이슈',
    question: '현재 주요 이슈는 무엇인가요?',
    koreanName: '넷플릭스',
  },
  {
    symbol: 'AMD.O',
    type: 'stock',
    keyword: '실적 발표일',
    question: '다음 실적 발표일은 언제인가요?',
    koreanName: 'AMD',
  },
];

export default function FAQList({
  handleSubmit,
}: {
  handleSubmit: (question: string) => void;
}) {
  return (
    <div className="mt-[56px]">
      <Typography size="body-lg" weight="bold">
        많이하는 질문
      </Typography>
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full mt-[10px]"
      >
        <CarouselContent>
          {faqList.map((item) => (
            <CarouselItem
              key={item.symbol}
              className="md:basis-1/2 lg:basis-1/3 cursor-pointer"
              onClick={() => {
                handleSubmit(
                  `${item.koreanName}의 ${item.keyword} 관련 질문: ${item.question}`
                );
              }}
            >
              <div className="p-1">
                <Card className="h-[160px] p-[16px]">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="flex items-center gap-[10px]">
                      <Avatar className="w-[16px] h-[16px]">
                        <AvatarImage
                          src={`https://hub.waiker.ai/logo/square/${item.symbol}.png`}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Typography size="body-sm">{item.koreanName}</Typography>
                    </div>
                    <Typography size="body-sm" className="mt-[10px]">
                      {item.question}
                    </Typography>
                    <div className="flex items-center gap-[10px] mt-auto">
                      <Badge variant="outline" className="text-mono400">
                        #{item.keyword}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
