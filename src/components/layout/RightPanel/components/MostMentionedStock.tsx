import { getMostMentionedStock } from "@/api/news";
import Typography from "@/components/ui/typography";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { type MostMentionedStock } from "@/api/news";

const MostMentionedStock = () => {
  const { data } = useQuery({
    queryKey: ["most-mentioned-stock"],
    queryFn: () =>
      getMostMentionedStock({
        page: 1,
        size: 5,
        lang: "KO",
        timeCodes: ["US"],
        symbolTypes: ["stock"],
        startDt: dayjs().subtract(1, "day").format("YYYY-MM-DD[T]HH:mm:ss[Z]"),
        endDt: dayjs().format("YYYY-MM-DD[T]HH:mm:ss[Z]"),
      }),
  });

  return (
    <div>
      <div className="flex flex-col gap-[20px]">
        <Typography size="title-lg" weight="bold">
          뉴스에 많이 나온 종목
        </Typography>
        {data && data.length > 0 ? (
          <div className="flex flex-col gap-[24px]">
            {data?.map((item, index) => (
              <StockItem key={item.ric} item={item} rank={index + 1} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center py-[60px]">
            <Typography size="body-sm" className="text-mono400">
              뉴스에 많이 나온 종목이 없습니다.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default MostMentionedStock;

const StockItem = ({
  item,
  rank,
}: {
  item: MostMentionedStock;
  rank: number;
}) => {
  return (
    <div className="cursor-pointer flex flex-row gap-x-2 items-center">
      <div className="text-sm font-medium">{rank}</div>
      <div className="flex flex-row gap-x-2">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="size-[20px] rounded-full"
        />
        <div className="flex flex-row gap-x-2 justify-between w-full items-center text-700">
          <Typography size="body-sm" weight="regular">
            {item.officialName}
          </Typography>
          <Typography size="label-md" weight="regular" className="text-mono400">
            {item.ticker}
          </Typography>
        </div>
      </div>
    </div>
  );
};
