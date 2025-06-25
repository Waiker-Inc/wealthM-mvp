import { Button } from '../ui/button';
import { Dialog, DialogContent } from '../ui/dialog';
import { Input } from '../ui/input';
import { Progress } from '../ui/progress';
import Typography from '../ui/typography';
import MarketTabs from './MarketTabs';
import { GripVertical, X } from 'lucide-react';

export default function MyFavoritSymbolDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="min-w-[80%] h-[90vh] bg-space2 p-0"
      >
        <div className="flex items-start w-full">
          <div className="max-w-[776px] flex-1 h-full mx-auto py-[40px]">
            <Typography size="title-lg" weight="bold">
              내 관심 심볼 관리
            </Typography>
            <Input
              placeholder="종목, ETF, 경제지표를 검색해보세요"
              className="mt-[16px]"
              autoFocus
            />
            <MarketTabs />
          </div>
          {/* 사이드바 */}
          <div className="bg-ground2 p-[40px_24px] w-[320px] h-full relative">
            <Typography size="body-lg">내 관심 심볼</Typography>
            <Typography size="body-sm" className="text-mono400 mt-[12px]">
              최대 20개까짐나 등록할 수 있습니다.
            </Typography>
            <div className="flex items-center gap-[10px] mt-[5px]">
              <Progress max={100} value={50} />
              <Typography size="label-md" className="text-mono400">
                5/10
              </Typography>
            </div>
            <ul className="mt-[24px]">
              <li className="flex items-center gap-[12px] p-[8px] rounded-[8px] hover:bg-mono50 cursor-pointer">
                <GripVertical className="text-mono200" size={16} />
                <Typography>팔란티어</Typography>
                <X className="text-mono200 ml-auto" size={16} />
              </li>
              <li className="flex items-center gap-[12px] p-[8px] rounded-[8px] hover:bg-mono50 cursor-pointer">
                <GripVertical className="text-mono200" size={16} />
                <Typography>팔란티어</Typography>
                <X className="text-mono200 ml-auto" size={16} />
              </li>
              <li className="flex items-center gap-[12px] p-[8px] rounded-[8px] hover:bg-mono50 cursor-pointer">
                <GripVertical className="text-mono200" size={16} />
                <Typography>팔란티어</Typography>
                <X className="text-mono200 ml-auto" size={16} />
              </li>
            </ul>
            <div className="absolute bottom-[40px] left-0 right-0 px-[24px] flex items-end gap-[10px]">
              <Button
                className="flex-1 h-[60px] bg-transparent border border-mono200 text-white"
                onClick={onClose}
              >
                <Typography>취소하기</Typography>
              </Button>
              <Button className="flex-1 h-[60px] bg-green700">
                <Typography>완료하기</Typography>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
