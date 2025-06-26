import { useCallback, useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent } from '../ui/dialog';
import { Input } from '../ui/input';
import { Progress } from '../ui/progress';
import Typography from '../ui/typography';
import MarketTabs from './MarketTabs';
import { GripVertical, Images, Search, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useFavoriteSymbols } from '../../hooks/useFavoriteSymbols';

export default function MyFavoritSymbolDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  console.info(imageBase64);

  const {
    symbols,
    error: storeError,
    addFavoriteSymbol,
    removeFavoriteSymbol,
    totalCount,
    maxCount,
  } = useFavoriteSymbols();

  const maxSize = 2 * 1024 * 1024;
  const accept = {
    'image/jpeg': [],
    'image/png': [],
    'image/webp': [],
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
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
    if (errors.some((e: { code: string }) => e.code === 'file-too-large')) {
      setError('2MB 이하의 이미지만 업로드할 수 있습니다.');
    } else if (
      errors.some((e: { code: string }) => e.code === 'file-invalid-type')
    ) {
      setError('jpg, png, webp 형식의 이미지만 업로드할 수 있습니다.');
    } else {
      setError('이미지 업로드에 실패했습니다.');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept,
    maxSize,
    multiple: false,
  });

  const handleSearchSubmit = useCallback(() => {
    if (!searchQuery.trim()) return;

    // 임시로 더미 데이터 추가 (실제로는 API 호출)
    addFavoriteSymbol(
      searchQuery,
      searchQuery.toUpperCase(),
      `${searchQuery.toUpperCase()}.O`
    );
    setSearchQuery('');
  }, [searchQuery, addFavoriteSymbol]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleSearchSubmit();
      }
    },
    [handleSearchSubmit]
  );

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
            <div
              {...getRootProps()}
              className={`mt-[16px] rounded-[8px] p-[16px] h-[274px] flex flex-col justify-center ${
                isDragActive ? 'bg-mono50 opacity-50' : 'bg-ground2'
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
                  {(error || storeError) && (
                    <Typography size="body-sm" className="text-red-500 mt-2">
                      {error || storeError}
                    </Typography>
                  )}
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
              <div
                className="w-[400px] mx-auto relative"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="종목, ETF, 경제지표를 검색해보세요"
                  autoFocus
                  className="p-[12px_24px] h-[48px] w-[400px] rounded-full"
                />
                <Search
                  className="absolute right-[24px] top-[50%] translate-y-[-50%] text-mono200 cursor-pointer"
                  onClick={handleSearchSubmit}
                />
              </div>
            </div>
            <MarketTabs />
          </div>
          {/* 사이드바 */}
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
            <ul className="mt-[24px] space-y-2">
              {symbols.map((symbol) => (
                <li
                  key={symbol.id}
                  className="flex items-center gap-[12px] p-[8px] rounded-[8px] hover:bg-mono50 cursor-pointer"
                >
                  <GripVertical className="text-mono200" size={16} />
                  <div className="flex-1 min-w-0">
                    <Typography className="truncate">{symbol.name}</Typography>
                    <Typography
                      size="body-sm"
                      className="text-mono400 truncate"
                    >
                      {symbol.ticker}
                    </Typography>
                  </div>
                  <X
                    className="text-mono200 ml-auto"
                    size={16}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFavoriteSymbol(symbol.id);
                    }}
                  />
                </li>
              ))}
              {symbols.length === 0 && (
                <li className="text-center py-8">
                  <Typography size="body-sm" className="text-mono400">
                    등록된 관심 심볼이 없습니다.
                  </Typography>
                </li>
              )}
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
