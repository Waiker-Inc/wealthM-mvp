import { getEconomicIndicator } from "@/api/economic-indicator";
import Typography from "@/components/ui/typography";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ChevronRight } from "lucide-react";

const EconomicIndicatorCard = () => {
  const { data } = useQuery({
    queryKey: ["economic-indicator"],
    queryFn: () => getEconomicIndicator(),
  });

  return (
    <div className="flex flex-col gap-y-4 w-full border border-mono200 rounded-lg p-4 bg-mono50 cursor-pointer">
      <div className="flex flex-row gap-x-2 items-center justify-between">
        <div>
          <Typography size="body-md" weight="bold" className="text-mono700">
            {data?.indicatorName}
          </Typography>
          <Typography
            size="body-sm"
            weight="regular"
            className="text-green-700"
          >
            {getRemainTime(data?.announcementDt)}
          </Typography>
        </div>
        <ChevronRight className="size-4" />
      </div>
    </div>
  );
};

export default EconomicIndicatorCard;

function getRemainTime(announcementDt?: string) {
  if (!announcementDt) return "";
  const now = dayjs();
  const target = dayjs(announcementDt);
  const diff = target.diff(now);

  if (diff <= 0) return "이미 발표되었습니다";

  const days = target.diff(now, "day");
  const hours = target.diff(now.add(days, "day"), "hour");
  const minutes = target.diff(
    now.add(days, "day").add(hours, "hour"),
    "minute"
  );

  return `발표까지 ${days > 0 ? days + "일 " : ""}${
    hours > 0 ? hours + "시간 " : ""
  }${minutes > 0 ? minutes + "분 " : ""} 남았어요`;
}
