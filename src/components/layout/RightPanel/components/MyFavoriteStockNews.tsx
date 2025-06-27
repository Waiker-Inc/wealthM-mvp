import { getFiling } from "@/api/filing";
import { getAINewsDetail, getAINewsList } from "@/api/news";
import { getPriceChangeRate } from "@/api/price";

import Tab from "@/components/Tab";
import Typography from "@/components/ui/typography";
import { useFavoriteSymbols } from "@/hooks/useFavoriteSymbols";
import { getRelativeTime } from "@/lib/utils";
import { useQueries, useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";

const SIZE = 3;
const LANG = "KO";
const PAGE = 1;

const TABS: { value: string; label: string }[] = [
  { value: "PRICE_CHANGE_RATE", label: "등락" },
  { value: "PERFORMANCE", label: "실적" },
  { value: "NEWS", label: "뉴스" },
  { value: "ANNOUNCEMENT", label: "공시" },
];

export default function MyFavoriteStockNews() {
  const { symbols } = useFavoriteSymbols();
  const [activeTab, setActiveTab] = useState<string>("PRICE_CHANGE_RATE");
  const ricList = symbols.map((symbol) => symbol.ric);

  return (
    <div>
      <div className="flex flex-col gap-y-4">
        <Typography size="title-lg" weight="bold">
          내 관심 소식
        </Typography>
        <Tab tabList={TABS} activeTab={activeTab} setActive={setActiveTab} />
      </div>
      <div>
        {activeTab === "PRICE_CHANGE_RATE" && (
          <PriceChangeRate ricList={ricList} />
        )}
        {activeTab === "ANNOUNCEMENT" && <Announcements ricList={ricList} />}
        {activeTab === "PERFORMANCE" && <Earning />}
        {activeTab === "NEWS" && <News ricList={ricList} />}
      </div>
    </div>
  );
}

// 카드 컴포넌트
interface ItemProps {
  title: string;
  subTitle: string;
  ric: string;
  imageUrl: string;
  time: string;
  originPress?: string;
}

const Item = ({
  title,
  subTitle,
  ric,
  imageUrl,
  time,
  originPress,
}: ItemProps) => (
  <div className="flex flex-col gap-y-2 border border-mono200 rounded-lg p-4 cursor-pointer">
    <div>
      <Typography size="body-sm" weight="medium" className="text-mono700">
        {title}
      </Typography>
      <Typography size="body-sm" weight="regular" className="text-mono500">
        {subTitle}
      </Typography>
    </div>
    <div className="flex flex-row gap-x-2 items-center">
      <div className="flex flex-row gap-[4px] items-center p-[3px_8px_4px_3px] bg-mono50 rounded-full w-fit">
        <img src={imageUrl} alt={ric} className="size-[16px] rounded-full" />
        <Typography size="label-md" weight="regular" className="text-mono700">
          {ric}
        </Typography>
      </div>
      <div className="flex flex-row gap-x-[2px] items-center">
        {originPress && (
          <>
            <Typography
              size="label-md"
              weight="regular"
              className="text-mono400"
            >
              {originPress}
            </Typography>
            <div
              className="w-1 h-1 rounded-full bg-mono300 mx-1"
              style={{ minWidth: 4, minHeight: 4 }}
            />
          </>
        )}
        <Typography size="label-md" weight="regular" className="text-mono400">
          {time}
        </Typography>
      </div>
    </div>
  </div>
);

// 등락
const PriceChangeRate = ({ ricList }: { ricList: string[] }) => {
  const { data } = useQuery({
    queryKey: ["price-change-rate", ricList],
    queryFn: () => getPriceChangeRate({ ricList }),
    enabled: ricList.length > 0,
    select: (data) => data.filter((item) => item.priceChangeRange >= 5),
  });

  if (data?.length === 0 || !data) {
    return (
      <div className="flex justify-center items-center py-[60px]">
        <Typography size="body-sm" className="text-mono400">
          등락 소식이 없습니다.
        </Typography>
      </div>
    );
  }

  return (
    <div className="mt-5 flex flex-col gap-y-2">
      {data?.map((item) => {
        const isPositive = item.priceChangeRate > 0;
        return (
          <Item
            key={item.ric}
            title={`주가가 ${item.priceChangeRate.toFixed(1)}% ${
              isPositive ? "상승" : "하락"
            }했어요`}
            subTitle={`최근 ${item.priceChangeRate.toFixed(
              1
            )} 개월 중 가장 크게 ${isPositive ? "상승" : "하락"}했어요`}
            ric={item.ric}
            imageUrl={"https://github.com/shadcn.png"}
            time={getRelativeTime("")}
          />
        );
      })}
    </div>
  );
};

// 공시
const Announcements = ({ ricList }: { ricList: string[] }) => {
  const { data } = useQuery({
    queryKey: ["filing", ricList],
    queryFn: () => getFiling({ ricList, page: PAGE, size: SIZE, lang: LANG }),
    enabled: ricList.length > 0,
    select: (data) =>
      data.filter((item) => {
        const publishedDate = new Date(item.publishedDt);
        const now = new Date();
        const diffDays =
          (now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24);
        return diffDays <= 7 && item.tags && item.tags.length >= 2;
      }),
  });

  if (data?.length === 0 || !data) {
    return (
      <div className="flex justify-center items-center py-[60px]">
        <Typography size="body-sm" className="text-mono400">
          공시 소식이 없습니다.
        </Typography>
      </div>
    );
  }

  const tags = data
    ?.map((item) => item.tags.map((tag: string) => `#${tag}`).join(" "))
    .join(" ");

  return (
    <div className="mt-5 flex flex-col gap-y-2">
      {data.map((item, index) => {
        return (
          <Item
            key={`${item.ric}-${index}`}
            title={item.title}
            subTitle={tags || ""}
            ric={item.ric}
            imageUrl={item.imgUrl}
            time={getRelativeTime(item.publishedDt)}
          />
        );
      })}
    </div>
  );
};

// 실적
const Earning = () => {
  return (
    <div className="flex justify-center items-center py-[60px]">
      <Typography size="body-sm" className="text-mono400">
        실적 소식이 없습니다.
      </Typography>
    </div>
  );
};

// 뉴스
const News = ({ ricList }: { ricList: string[] }) => {
  const { data } = useQuery({
    queryKey: ["news", ricList],
    queryFn: () =>
      getAINewsList({
        ricList,
        page: PAGE,
        size: SIZE,
        fromTargetDate: dayjs()
          .subtract(7, "day")
          .format("YYYY-MM-DD[T]HH:mm:ss[Z]")
          .toString(),
        toTargetDate: dayjs().format("YYYY-MM-DD[T]HH:mm:ss[Z]").toString(),
      }),
    enabled: ricList.length > 0,
  });

  const newsIds = data?.map((item) => item.newsId) ?? [];

  const detailQueries = useQueries({
    queries: newsIds.map((newsId) => ({
      queryKey: ["news", "detail", newsId],
      queryFn: () => getAINewsDetail(newsId),
      enabled: !!newsId,
    })),
  });

  if (!data || data.length === 0 || !detailQueries || newsIds.length === 0) {
    return (
      <div className="flex justify-center items-center py-[60px]">
        <Typography size="body-sm" className="text-mono400">
          뉴스 소식이 없습니다.
        </Typography>
      </div>
    );
  }

  return (
    <div className="mt-5 flex flex-col gap-y-2">
      {detailQueries.map((query) => {
        const detail = query.data;
        if (!detail) return null;
        return (
          <Item
            key={detail.newsId}
            title={detail.title}
            subTitle={detail.summary && detail.summary.split("☉")?.[1]}
            ric={detail.tickerList?.[0]?.ric || ""}
            imageUrl={detail.tickerList?.[0]?.companyImageUrl || ""}
            originPress={detail.originPress}
            time={getRelativeTime(detail.publishedDt)}
          />
        );
      })}
    </div>
  );
};
