/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import Typography from "../ui/typography";
import { GripVertical, Images, Search, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useFavoriteSymbols } from "../../hooks/useFavoriteSymbols";
import { useQuery } from "@tanstack/react-query";
import { getChartStock, type ChartTabEnum } from "@/api/chart";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { getSearchStock, type ResGetSearchStock } from "@/api/search";
import { useDebounce } from "use-debounce";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { FavoriteSymbol } from "@/types/favoritSymbol";
import type { DragEndEvent } from "@dnd-kit/core";
import { Star } from "lucide-react";

const TABS: { value: ChartTabEnum; label: string; key: string }[] = [
  { value: "TURN_OVER", label: "거래대금", key: "tradeVolume" },
  { value: "TRADE_VOLUME", label: "거래량", key: "tradeVolume" },
  { value: "RAPID_RISE", label: "급상승", key: "percentChange" },
  { value: "RAPID_FALL", label: "급하락", key: "percentChange" },
  { value: "ETF", label: "ETF", key: "tradeVolume" },
];

// 1. 탭별 컬럼 정의
const TAB_COLUMNS: Record<string, { key: string; label: string }[]> = {
  TURN_OVER: [
    { key: "stock", label: "종목" },
    { key: "price", label: "현재가" },
    { key: "percentChange", label: "등락률" },
    { key: "tradeVolume", label: "거래대금" },
  ],
  TRADE_VOLUME: [
    { key: "stock", label: "종목" },
    { key: "price", label: "현재가" },
    { key: "percentChange", label: "등락률" },
    { key: "tradeVolume", label: "거래량" },
  ],
  RAPID_RISE: [
    { key: "stock", label: "종목" },
    { key: "price", label: "현재가" },
    { key: "percentChange", label: "등락률" },
  ],
  RAPID_FALL: [
    { key: "stock", label: "종목" },
    { key: "price", label: "현재가" },
    { key: "percentChange", label: "등락률" },
  ],
  ETF: [
    { key: "stock", label: "종목" },
    { key: "tradeVolume", label: "시가총액" },
    { key: "percentChange", label: "등락률" },
  ],
};

// 2. 컬럼별 셀 렌더 함수
interface StockItem {
  stockName: string;
  stockImageUrl: string;
  price?: number;
  percentChange: number;
  tradeVolume?: number;
  ric: string;
}
function renderCell(
  item: StockItem,
  key: string,
  isSymbolFavorite: (ric: string) => boolean,
  removeFavoriteSymbol: (ric: string) => void,
  addFavoriteSymbol: (symbol: FavoriteSymbol) => void
) {
  const isFavorite = isSymbolFavorite(item.ric);
  switch (key) {
    case "stock":
      return (
        <td className="px-2 py-3 flex items-center gap-x-2 ">
          <button
            className="cursor-pointer"
            onClick={() => {
              if (isFavorite) {
                removeFavoriteSymbol(item.ric);
              } else {
                addFavoriteSymbol({
                  ric: item.ric,
                  name: item.stockName,
                  order: 0,
                });
              }
            }}
          >
            <Star
              size={16}
              fill={isFavorite ? "#F5E500" : "#3E4144"}
              stroke={isFavorite ? "#F5E500" : "#3E4144"}
            />
          </button>
          <img
            src={item.stockImageUrl}
            alt={item.stockName}
            className="size-[20px] rounded-full"
          />
          {item.stockName}
        </td>
      );
    case "price":
      return (
        <td className="px-2 py-3 text-end">
          {item.price?.toLocaleString()}달러
        </td>
      );
    case "percentChange":
      return (
        <td
          className={cn(
            "px-2 py-3 text-end",
            item.percentChange > 0 ? "text-green700" : "text-red700"
          )}
        >
          {item.percentChange.toFixed(2)}%
        </td>
      );
    case "tradeVolume":
      return (
        <td className="px-2 py-3 text-end">
          {item.tradeVolume?.toLocaleString()}
        </td>
      );
    default:
      return null;
  }
}

// 검색 input + 드롭다운 컴포넌트
function SearchInputWithDropdown() {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useDebounce(searchQuery, 300);
  const [highlightIndex, setHighlightIndex] = useState(0);

  const { addFavoriteSymbol } = useFavoriteSymbols();
  const { data } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () =>
      getSearchStock({ keyword: debouncedQuery, page: 0, size: 12 }),
    enabled: !!debouncedQuery,
  });

  const handleSearchSubmit = useCallback(() => {
    if (!searchQuery.trim()) return;

    console.log(searchQuery);
    // 임시로 더미 데이터 추가 (실제로는 API 호출)
    // addFavoriteSymbol(data[0]);
    setSearchQuery("");
  }, [searchQuery, addFavoriteSymbol]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!data || data.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightIndex((prev) => Math.min(prev + 1, data.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        const selected = data[highlightIndex];
        if (selected) {
          console.log(selected);
          addFavoriteSymbol({
            ric: selected.ric,
            name: selected.name,
            order: 0,
          });
          setSearchQuery("");
          setShowSearchResults(false);
        }
      }
    },
    [data, highlightIndex, addFavoriteSymbol]
  );

  const handleInputFocus = useCallback(() => {
    if (searchQuery.trim()) {
      setShowSearchResults(true);
    }
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(!!e.target.value.trim());
  };

  const handleResultClick = (result: ResGetSearchStock) => {
    addFavoriteSymbol({
      ric: result.ric,
      name: result.name,
      order: 0,
    });
    setSearchQuery("");
    setShowSearchResults(false);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setHighlightIndex(0);
    }
  }, [data]);

  return (
    <div
      className="w-[400px] mx-auto relative"
      onClick={(e) => e.stopPropagation()}
    >
      <Input
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleInputFocus}
        placeholder="종목, ETF, 경제지표를 검색해보세요"
        autoFocus
        className="p-[12px_24px] h-[48px] w-[400px] rounded-full"
      />
      <Search
        className="absolute right-[24px] top-[50%] translate-y-[-50%] text-mono200 cursor-pointer"
        onClick={handleSearchSubmit}
      />
      {showSearchResults && data && data.length > 0 && (
        <div className="absolute left-0 top-[56px] z-10 bg-ground2 rounded-lg shadow-lg border border-mono200 overflow-y-auto max-h-[420px] w-[400px]">
          {data.map((result, idx) => (
            <div
              key={result.ric}
              className={cn(
                "w-full px-4 py-3 hover:bg-mono50 cursor-pointer",
                idx === highlightIndex && "bg-mono100"
              )}
              onClick={() => handleResultClick(result)}
            >
              <span className="font-semibold">{result.name}</span>
              <span className="ml-2 text-mono400 text-sm">{result.ric}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SortableFavoriteItem({
  symbol,
  onRemove,
}: {
  symbol: FavoriteSymbol;
  onRemove: (ric: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: symbol.ric });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    background: isDragging ? "#f5f5f5" : undefined,
  };
  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex items-center gap-[12px] p-[8px] rounded-[8px] hover:bg-mono50 cursor-pointer"
    >
      <span {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical className="text-mono200" size={16} />
      </span>
      <div className="flex-1 min-w-0">
        <Typography className="truncate">{symbol.name}</Typography>
        <Typography size="body-sm" className="text-mono400 truncate">
          {symbol.ric}
        </Typography>
      </div>
      <X
        className="text-mono200 ml-auto"
        size={16}
        onClick={(e) => {
          e.stopPropagation();
          onRemove(symbol.ric);
        }}
      />
    </li>
  );
}

// 관심 심볼 사이드바 컴포넌트
function FavoriteSidebar({ onClose }: { onClose: () => void }) {
  const {
    symbols,
    removeFavoriteSymbol,
    totalCount,
    maxCount,
    reorderSymbols,
  } = useFavoriteSymbols();
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = symbols.findIndex((s) => s.ric === active.id);
      const newIndex = symbols.findIndex((s) => s.ric === over?.id);
      reorderSymbols(oldIndex, newIndex);
    }
  };

  return (
    <div className="bg-ground2 p-[40px_24px] w-[320px] h-full relative">
      <Typography size="body-lg">내 관심 심볼</Typography>
      <Typography size="body-sm" className="text-mono400 mt-[12px]">
        최대 {maxCount}개까지만 등록할 수 있습니다.
      </Typography>
      <div className="flex items-center gap-[10px] mt-[5px]">
        <Progress max={maxCount} value={totalCount} />
        <Typography size="label-md" className="text-mono400">
          {totalCount}/{maxCount}
        </Typography>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={symbols.map((s) => s.ric)}
          strategy={verticalListSortingStrategy}
        >
          <ul>
            {symbols.map((symbol) => (
              <SortableFavoriteItem
                key={symbol.ric}
                symbol={symbol}
                onRemove={removeFavoriteSymbol}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <div className="absolute bottom-[40px] left-0 right-0 px-[24px] flex items-end gap-[10px]">
        <Button
          className="flex-1 h-[60px] bg-green700"
          onClick={() => {
            onClose();
          }}
        >
          <Typography>닫기</Typography>
        </Button>
      </div>
    </div>
  );
}

// 탭 및 테이블 컴포넌트
function StockTable({
  TABS,
  TAB_COLUMNS,
  activeTab,
  setActiveTab,
  data,
  ref,
  isSymbolFavorite,
  removeFavoriteSymbol,
  addFavoriteSymbol,
}: {
  TABS: { value: ChartTabEnum; label: string; key: string }[];
  TAB_COLUMNS: Record<string, { key: string; label: string }[]>;
  activeTab: ChartTabEnum;
  setActiveTab: (tab: ChartTabEnum) => void;
  data: StockItem[];
  ref: React.RefObject<HTMLDivElement> | ((node?: Element | null) => void);
  isSymbolFavorite: (ric: string) => boolean;
  removeFavoriteSymbol: (ric: string) => void;
  addFavoriteSymbol: (symbol: FavoriteSymbol) => void;
}) {
  return (
    <div className="w-full mt-[40px]">
      {/* 탭 헤더 */}
      <div className="flex border-b border-border">
        {TABS?.map((item) => (
          <button
            key={`${item.value}-${item.label}`}
            className={`px-4 py-3 font-semibold text-base transition-all
              border-b-2
              ${
                activeTab === item.value
                  ? "text-700 border-primary"
                  : "border-transparent hover:text-primary/80 text-mono400"
              }`}
            onClick={() => setActiveTab(item.value)}
            aria-selected={activeTab === item.value}
            tabIndex={0}
            role="tab"
            type="button"
          >
            <Typography size="body-sm">{item.label}</Typography>
          </button>
        ))}
      </div>
      {/* 탭 컨텐츠 */}
      <div className="py-4 max-h-[800px] overflow-y-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              {TAB_COLUMNS[activeTab]?.map((col, idx) => (
                <th
                  key={col.key}
                  className={cn(
                    "px-2 py-1 text-mono400 text-end",
                    idx === 0 && "text-left"
                  )}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.stockName}>
                {TAB_COLUMNS[activeTab]?.map((col) =>
                  renderCell(
                    item,
                    col.key,
                    isSymbolFavorite,
                    removeFavoriteSymbol,
                    addFavoriteSymbol
                  )
                )}
              </tr>
            ))}
          </tbody>
          <div ref={ref} className="h-px" />
        </table>
      </div>
    </div>
  );
}

export default function MyFavoriteSymbolDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [count, setCount] = useState(40);
  const { ref, inView } = useInView();
  const [, setImageBase64] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ChartTabEnum>("TURN_OVER");

  const { data } = useQuery({
    queryKey: ["favorite", activeTab],
    queryFn: () => getChartStock({ chartTabEnum: activeTab, count }),
    select: (data) => data.filter((item) => item.type === "STOCK"),
  });

  const maxSize = 2 * 1024 * 1024;
  const accept = {
    "image/jpeg": [],
    "image/png": [],
    "image/webp": [],
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImageBase64(reader.result);
        setImageName(file.name);
        setError(null);
      }
    };
    reader.readAsDataURL(file);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDropRejected = useCallback((fileRejections: any) => {
    if (!fileRejections.length) return;
    const { errors } = fileRejections[0];
    if (errors.some((e: { code: string }) => e.code === "file-too-large")) {
      setError("2MB 이하의 이미지만 업로드할 수 있습니다.");
    } else if (
      errors.some((e: { code: string }) => e.code === "file-invalid-type")
    ) {
      setError("jpg, png, webp 형식의 이미지만 업로드할 수 있습니다.");
    } else {
      setError("이미지 업로드에 실패했습니다.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept,
    maxSize,
    multiple: false,
  });

  const { isSymbolFavorite, addFavoriteSymbol, removeFavoriteSymbol } =
    useFavoriteSymbols();

  useEffect(() => {
    if (inView) {
      setCount((prev) => prev + 10);
    }
  }, [inView]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="min-w-[80%] h-[90vh] bg-space2 p-0"
      >
        <div className="flex items-start w-full">
          <div className="max-w-[776px] flex-1 h-full mx-auto py-[40px] ">
            <Typography size="title-lg" weight="bold">
              내 관심 심볼 관리
            </Typography>
            <div
              {...getRootProps()}
              className={`mt-[16px] rounded-[8px] p-[16px] h-[274px] flex flex-col justify-center ${
                isDragActive ? "bg-mono50 opacity-50" : "bg-ground2"
              }`}
              aria-label="이미지 드래그 앤 드롭 영역"
            >
              <div className="flex items-center gap-[24px] w-[400px] mx-auto">
                <Images size={40} />
                <div>
                  <Typography size="body-sm" className="text-mono400">
                    이미지를 드래그하거나 업로드하면,
                  </Typography>
                  <Typography size="body-sm">
                    심볼을 자동으로 인식해 내 관심 심볼을 만들어 드립니다.
                  </Typography>
                  {imageName && (
                    <Typography size="body-sm" className="text-green700">
                      첨부된 파일: {imageName}
                    </Typography>
                  )}
                  {/* {(error || storeError) && (
                    <Typography size="body-sm" className="text-red-500 mt-2">
                      {error || storeError}
                    </Typography>
                  )} */}
                </div>
              </div>
              <input {...getInputProps()} accept="image/*" />
              <div className="flex items-center gap-[10px] w-[400px] mx-auto my-[32px]">
                <div className="h-[1px] flex-1 bg-mono200" />
                <Typography size="label-md" className="text-mono400">
                  또는
                </Typography>
                <div className="h-[1px] flex-1 bg-mono200" />
              </div>
              <SearchInputWithDropdown />
            </div>
            <StockTable
              TABS={TABS}
              TAB_COLUMNS={TAB_COLUMNS}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              data={data || []}
              ref={ref}
              isSymbolFavorite={isSymbolFavorite}
              removeFavoriteSymbol={removeFavoriteSymbol}
              addFavoriteSymbol={addFavoriteSymbol}
            />
          </div>
          <FavoriteSidebar onClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
