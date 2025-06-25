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

export default function FAQList() {
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
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="h-[160px] p-[16px]">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="flex items-center gap-[10px]">
                      <Avatar className="w-[16px] h-[16px]">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Typography size="body-sm">테슬라</Typography>
                    </div>
                    <Typography size="body-sm" className="mt-[10px]">
                      테슬라의 현재 주가 및 일간 변동률을 알려줘!
                    </Typography>
                    <div className="flex items-center gap-[10px] mt-auto">
                      <Badge variant="outline" className="text-mono400">
                        #주식
                      </Badge>
                      <Badge variant="outline" className="text-mono400">
                        #일간 변동률
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
