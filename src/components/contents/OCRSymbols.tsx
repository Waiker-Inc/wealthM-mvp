import { LoaderCircle } from 'lucide-react';
import Typography from '../ui/typography';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export interface OCRResult {
  search_phrase: string;
  name_en: string;
  name_ko: string;
  db_info: {
    ric: string;
    ticker: string;
    exchange: string;
    time_code: string;
    image_url: string;
  };
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
        Imported Symbol List
      </Typography>
      <Typography size="body-sm" className="text-mono400">
        Select stocks to add to your watchlist.
      </Typography>
      <ul className="mt-[16px] flex items-center gap-[16px] flex-wrap">
        {ocrResult.map((item) => (
          <li
            key={item.db_info.ric}
            className="bg-mono50 rounded-[4px] p-[6px_16px_6px_12px] max-w-fit cursor-pointer flex items-center gap-[10px]"
          >
            <Avatar className="min-w-[16px] min-h-[16px] w-[16px] h-[16px]">
              <AvatarImage src={item.db_info.image_url} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Typography size="body-sm" className="text-mono450">
              {item.phrases[0]}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
}
