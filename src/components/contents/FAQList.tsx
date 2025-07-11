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
    keyword: 'Performance Outlook',
    question: 'What is the performance outlook for next quarter?',
    koreanName: 'Apple',
  },
  {
    symbol: 'TSLA.O',
    type: 'stock',
    keyword: 'Earnings Surprise',
    question: 'How are the recent earnings surprises?',
    koreanName: 'Tesla',
  },
  {
    symbol: 'NVDA.O',
    type: 'stock',
    keyword: 'Institutional Trading',
    question: 'Have institutional investors traded recently?',
    koreanName: 'NVIDIA',
  },
  {
    symbol: 'GOOGL.O',
    type: 'stock',
    keyword: 'Stock Price',
    question: 'What is the current stock price?',
    koreanName: 'Alphabet',
  },
  {
    symbol: 'MSFT.O',
    type: 'stock',
    keyword: 'Revenue',
    question: 'What is the recent revenue growth rate?',
    koreanName: 'Microsoft',
  },
  {
    symbol: 'AMZN.O',
    type: 'stock',
    keyword: 'Recent News',
    question: 'What are the recent news related to the company?',
    koreanName: 'Amazon',
  },
  {
    symbol: 'META.O',
    type: 'stock',
    keyword: 'Profit',
    question: 'How has quarterly net income changed?',
    koreanName: 'Meta',
  },
  {
    symbol: 'NFLX.O',
    type: 'stock',
    keyword: 'Issues',
    question: 'What are the current major issues?',
    koreanName: 'Netflix',
  },
  {
    symbol: 'AMD.O',
    type: 'stock',
    keyword: 'Earnings Date',
    question: 'When is the next earnings announcement date?',
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
        Frequently Asked Questions
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
