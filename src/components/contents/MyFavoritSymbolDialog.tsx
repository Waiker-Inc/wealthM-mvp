import { Dialog, DialogContent } from '../ui/dialog';
import { Input } from '../ui/input';
import Typography from '../ui/typography';
import MarketTabs from './MarketTabs';

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
          <div className="bg-ground2 p-[40px_24px] w-[320px] h-full">123</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
