import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
// 마크다운을 파싱하여 HTML로 변환하는 커스텀 파서
const parseMarkdown = (markdown: string): string => {
  let html = markdown;

  // HTML 코드 블록을 실제 HTML로 변환 (언어 표시 제거)
  html = html.replace(/```html\s*([\s\S]*?)\s*```/g, (_, htmlContent) => {
    // HTML 내용에서 불필요한 이스케이프 제거
    const cleanHtml = htmlContent
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .trim();

    // 언어 표시 없이 HTML만 반환
    return cleanHtml;
  });

  // 일반 코드 블록도 언어 표시 제거
  html = html.replace(/```(\w+)?\s*([\s\S]*?)\s*```/g, (_, __, codeContent) => {
    return `<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm">${codeContent.trim()}</code></pre>`;
  });

  // 테이블 처리 (개선된 버전)
  html = html.replace(/(\|.*\|[\s\S]*?)(?=\n\n|\n#|\n##|\n###|$)/g, (match) => {
    const lines = match.trim().split('\n');
    if (lines.length < 2) return match;

    const tableRows = lines.filter((line) => line.trim().startsWith('|'));
    if (tableRows.length < 2) return match;

    let tableHtml =
      '<div class="overflow-x-auto my-6"><table class="min-w-full border-collapse border border-border">';

    tableRows.forEach((row, index) => {
      const cells = row
        .split('|')
        .slice(1, -1) // 첫 번째와 마지막 빈 요소 제거
        .map((cell) => cell.trim());

      if (index === 0) {
        // 헤더 행
        tableHtml += '<thead><tr>';
        cells.forEach((cell) => {
          tableHtml += `<th class="border border-border px-3 py-2 text-left font-semibold bg-muted">${cell}</th>`;
        });
        tableHtml += '</tr></thead><tbody>';
      } else if (index === 1 && cells.every((cell) => /^[-:]+$/.test(cell))) {
        // 구분선 행은 건너뛰기
        return;
      } else {
        // 데이터 행
        tableHtml += '<tr>';
        cells.forEach((cell) => {
          tableHtml += `<td class="border border-border px-3 py-2">${cell}</td>`;
        });
        tableHtml += '</tr>';
      }
    });

    tableHtml += '</tbody></table></div>';
    return tableHtml;
  });

  // 제목 처리
  html = html.replace(
    /^### (.*$)/gim,
    '<h3 class="text-lg font-semibold mt-6 mb-3">$1</h3>'
  );
  html = html.replace(
    /^## (.*$)/gim,
    '<h2 class="text-xl font-bold mt-8 mb-4">$1</h2>'
  );
  html = html.replace(
    /^# (.*$)/gim,
    '<h1 class="text-2xl font-bold mt-10 mb-6">$1</h1>'
  );

  // 구분선 처리
  html = html.replace(/^---$/gim, '<hr class="my-6 border-border" />');

  // 강조 처리
  html = html.replace(
    /\*\*(.*?)\*\*/g,
    '<strong class="font-semibold">$1</strong>'
  );
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

  // 인라인 코드 처리
  html = html.replace(
    /`([^`]+)`/g,
    '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>'
  );

  // 링크 처리
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-primary/80 underline">$1</a>'
  );

  // 리스트 처리
  // eslint-disable-next-line no-useless-escape
  html = html.replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>');
  html = html.replace(
    /(<li.*<\/li>)/s,
    '<ul class="list-disc ml-6 my-4">$1</ul>'
  );

  // 단락 처리
  html = html.replace(/\n\n([^<].*)/g, '<p class="my-4">$1</p>');

  return html;
};

export default function ChatResponseRender({
  message,
  processMessage,
}: {
  message: string;
  processMessage?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [renderedHtml, setRenderedHtml] = useState<string>('');

  useEffect(() => {
    const html = parseMarkdown(message);
    setRenderedHtml(html);
  }, [message]);

  // HTML 스크립트 실행을 위한 useEffect (완전히 새로운 접근)
  useEffect(() => {
    if (!containerRef.current || !renderedHtml) return;

    // DOM이 완전히 렌더링될 때까지 대기
    const timer = setTimeout(() => {
      try {
        // 컨테이너 내의 모든 script 태그 찾기
        const scripts = containerRef.current?.querySelectorAll('script');

        if (!scripts || scripts.length === 0) {
          return;
        }

        scripts.forEach((script) => {
          // 기존 스크립트가 이미 실행되었는지 확인
          if (script.dataset.executed === 'true') {
            return;
          }

          try {
            // 새로운 script 요소 생성
            const newScript = document.createElement('script');

            // src가 있는 경우 (외부 스크립트)
            if (script.src) {
              newScript.src = script.src;
              newScript.async = script.async || true;
            }

            // 인라인 스크립트인 경우
            if (script.textContent) {
              newScript.textContent = script.textContent;
            }

            // type 속성 복사
            if (script.type) {
              newScript.type = script.type;
            }

            // 기존 스크립트를 새 스크립트로 교체
            script.parentNode?.replaceChild(newScript, script);

            // 실행 완료 표시
            script.dataset.executed = 'true';
          } catch (error) {
            console.error('Script execution error:', error);
          }
        });
      } catch (error) {
        console.error('Script loading error:', error);
      }
    }, 500); // DOM 렌더링을 위한 더 긴 지연

    return () => clearTimeout(timer);
  }, [renderedHtml]);

  if (processMessage) {
    return (
      <div className="flex items-center gap-2">
        <div className="animate-spin">
          <Loader2 className="w-4 h-4" />
        </div>
        <div>{processMessage}</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'prose prose-sm max-w-none dark:prose-invert',
        'prose-headings:text-foreground prose-p:text-foreground',
        'prose-strong:text-foreground prose-em:text-foreground',
        'prose-code:text-foreground prose-pre:bg-muted',
        'prose-blockquote:border-l-primary',
        'prose-a:text-primary hover:prose-a:text-primary/80',
        'prose-table:border-border prose-th:border-border prose-td:border-border'
      )}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}
