import { AlignLeft, Bolt, Pen } from 'lucide-react';
import Typography from '../ui/typography';

export default function LeftPanel() {
  return (
    <aside className="bg-[#101317] h-[100vh] p-[40px_24px] text-white overflow-auto">
      <h1 className="flex items-center justify-center">
        <img src="/logo.png" alt="logo" className="w-[54px] h-[36px]" />
      </h1>
      <ul className="mt-[48px] flex flex-col gap-[32px]">
        <li className="flex items-center gap-[10px]">
          <Pen size={20} />
          <Typography size="body-lg" weight="bold">
            새로운 질문
          </Typography>
        </li>
        <li className="flex items-center gap-[10px]">
          <AlignLeft size={20} />
          <Typography size="body-lg" weight="bold">
            지난 질문들
          </Typography>
          <div>
            <Typography>오늘</Typography>
            <ul>
              <Typography as="li">팔란티어의 1년 수익률</Typography>
            </ul>
          </div>
        </li>
        <li className="flex items-center gap-[10px]">
          <Bolt size={20} />
          <Typography size="body-lg" weight="bold">
            내 관심 심볼
          </Typography>
        </li>
      </ul>
    </aside>
  );
}
