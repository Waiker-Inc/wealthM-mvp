import { cn } from "@/lib/utils";
import Typography from "./ui/typography";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface TabProps {
  activeTab: string;
  tabList: { value: string; label: string }[];
  setActive: (value: string) => void;
}

export default function Tab({ tabList, activeTab, setActive }: TabProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [leftRef, leftInView] = useInView({ threshold: 0.5 });
  const [rightRef, rightInView] = useInView({ threshold: 0.5 });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScroll = (direction: "left" | "right") => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += direction === "right" ? 10 : -10;
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
    <div className="relative w-full flex flex-row overflow-x-scroll scrollbar-hide">
      {/* 좌측 버튼 */}
      {!leftInView && (
        <div className="w-[34px] h-[90px] absolute left-0 top-[-25px] pointer-events-none transform rotate-90 bg-gradient-to-b from-transparent to-ground2/80 z-10" />
      )}
      {!leftInView && (
        <button
          className="p-1.5 cursor-pointer absolute left-0 top-[10px] size-4 z-20"
          onMouseDown={() => startScroll("left")}
          onMouseUp={stopScroll}
          onMouseLeave={stopScroll}
          onTouchStart={() => startScroll("left")}
          onTouchEnd={stopScroll}
        >
          <ChevronLeft className="size-4" />
        </button>
      )}
      <div
        ref={scrollRef}
        className="w-full overflow-x-scroll scrollbar-hide flex border-b border-border"
      >
        <div
          ref={leftRef}
          className="w-px min-w-2 h-full flex-shrink-0 inline-block"
        />
        {tabList.map((tab) => (
          <button
            key={tab.value}
            className={cn(
              "px-4 py-3 cursor-pointer font-semibold text-base transition-all border-b-2 whitespace-nowrap border-transparent hover:text-primary/80 text-mono400",
              {
                "text-white border-primary": activeTab === tab.value,
              }
            )}
            onClick={() => setActive(tab.value)}
            aria-selected={activeTab === tab.value}
            tabIndex={0}
            role="tab"
            type="button"
          >
            <Typography size="body-sm">{tab.label}</Typography>
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
          onMouseDown={() => startScroll("right")}
          onMouseUp={stopScroll}
          onMouseLeave={stopScroll}
          onTouchStart={() => startScroll("right")}
          onTouchEnd={stopScroll}
        >
          <ChevronRight className="size-4" />
        </button>
      )}
    </div>
  );
}
