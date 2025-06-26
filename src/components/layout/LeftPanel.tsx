import { AlignLeft, ArrowUpDown, Bolt, Pen } from "lucide-react";
import Typography from "../ui/typography";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";
import MyFavoriteSymbolDialog from "@/components/contents/MyFavoriteSymbolDialog";
import { Progress } from "../ui/progress";

export default function LeftPanel() {
  const [isOpenFavorite, setIsOpenFavorite] = useState(false);

  return (
    <aside className="bg-ground2 h-[100vh] p-[40px_24px] text-white overflow-auto">
      <h1 className="flex items-center justify-center">
        <img src="/logo.png" alt="logo" className="w-[54px] h-[36px]" />
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
            <Typography size="label-lg">오늘</Typography>
            <ul>
              <Typography
                as="li"
                size="body-sm"
                className="cursor-pointer text-mono450 p-[8px] rounded-[4px] hover:bg-mono50 hover:text-white"
              >
                팔란티어의 1년 수익률
              </Typography>
            </ul>
          </div>
          <div className="mt-[16px] ml-[8px]">
            <Typography size="label-lg">어제</Typography>
            <ul>
              <Typography
                as="li"
                size="body-sm"
                className="cursor-pointer text-mono450 p-[8px] rounded-[4px] hover:bg-mono50 hover:text-white"
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
            {Array.from({ length: 10 }).map((_, index) => (
              <li className="flex items-center w-full gap-[12px]" key={index}>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <Typography size="body-sm">테슬라</Typography>
                  <Typography size="label-md" className="text-mono400">
                    TSLA
                  </Typography>
                </div>
                <div className="ml-auto">
                  <Typography size="body-sm" className="text-red700">
                    +2.39%
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
