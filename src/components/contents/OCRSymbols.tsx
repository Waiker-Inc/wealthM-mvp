import { LoaderCircle } from 'lucide-react';
import Typography from '../ui/typography';

export interface OCRResult {
  'stock symbols': [
    {
      symbol: string;
      exchange: string;
    }
  ];
  phrases: string[];
}

export default function OCRSymbols({
  ocrResult,
  isProcessing,
}: {
  ocrResult: OCRResult[];
  isProcessing: boolean;
}) {
  if (isProcessing) {
    return (
      <div className="mt-[40px] flex items-center justify-center">
        <LoaderCircle className="animate-spin" size={24} />
      </div>
    );
  }
  return (
    <div className="mt-[40px]">
      <Typography size="body-md" weight="bold">
        가져온 심볼 리스트
      </Typography>
      <Typography size="body-sm" className="text-mono400">
        종목을 선택해 관심 목록에 추가하세요.
      </Typography>
      <ul className="mt-[16px] flex items-center gap-[16px] flex-wrap">
        {ocrResult.map((item) => (
          <li
            key={item['stock symbols'][0].symbol}
            className="bg-mono50 rounded-[4px] p-[6px_16px_6px_12px] max-w-fit cursor-pointer"
          >
            <Typography size="body-sm" className="text-mono450">
              {item.phrases[0]}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
}
