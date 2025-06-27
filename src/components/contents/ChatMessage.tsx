import { LoadingIndicator } from "./LoadingIndicator";
import { useEffect, useRef } from "react";

interface ChatMessageProps {
  question: string;
  answer?: string;
  isWaiting?: boolean;
}

// const temp = `"# 애플(AAPL) 주가에 관한 종합 보고서

// ---

// ## 1. 서론

// 애플(Apple Inc., NASDAQ: AAPL)은 세계에서 가장 가치 있는 기업 중 하나로, 기술 산업을 선도하는 글로벌 기업입니다. 애플의 주가는 투자자, 시장 분석가, 그리고 일반 대중에게 매우 중요한 지표로 작용하며, 기업의 재무 상태, 성장 가능성, 그리고 시장의 전반적인 분위기를 반영합니다. 본 보고서에서는 최신 애플 주가 차트, 최근 뉴스, 기관 투자자 및 내부자 거래 현황, 주요 일정, 그리고 배당 및 실적 정보를 종합적으로 분석하여 애플 주가의 현황과 전망을 심층적으로 다루겠습니다.

// ---

// ## 2. 애플 주가 현황 및 차트 분석

// 아래는 2025년 6월 기준 애플의 최신 주가 차트입니다. 차트는 TradingView의 고급 차트 위젯을 통해 제공되며, 일간(Daily) 간격으로 NASDAQ:AAPL의 주가 움직임을 보여줍니다. 비교 대상으로는 AMEX:SPY(미국 S&P 500 ETF)와 NASDAQ:QQQ(나스닥 100 ETF)가 포함되어 있어, 애플 주가의 상대적 움직임을 확인할 수 있습니다.

// <div class="tradingview-widget-container" style="width:100%">
//     <div class="tradingview-widget-container__widget" style="height:600px;width:100%"></div>
//     <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a></div>
//     <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js" async>
//       {"allow_symbol_change": true, "calendar": false, "details": false, "hide_side_toolbar": true, "hide_top_toolbar": false, "hide_legend": false, "hide_volume": true, "hotlist": false, "interval": "D", "locale": "en", "save_image": true, "style": "2", "symbol": "NASDAQ:AAPL", "theme": "dark", "timezone": "Etc/UTC", "backgroundColor": "#ffffff", "gridColor": "rgba(46, 46, 46, 0.06)", "watchlist": [], "withdateranges": false, "compareSymbols": [{"symbol": "AMEX:SPY", "position": "SameScale"}, {"symbol": "NASDAQ:QQQ", "position": "SameScale"}], "studies": [], "height": 600}
//     </script>
// </div>

// ### 2.1. 주가 동향

// - **최근 1년간 주가 흐름**: 애플 주가는 전반적으로 상승세를 유지하고 있으며, 기술주 전반의 변동성에도 불구하고 견고한 성장세를 보이고 있습니다.
// - **비교 지수 대비 성과**: S&P 500 및 나스닥 100 ETF 대비 애플 주가는 상대적으로 강한 상승 모멘텀을 유지하고 있어, 시장 내에서의 경쟁력과 투자 매력도를 반영합니다.

// ---

// ## 3. 애플 관련 최신 뉴스

// 아래는 애플과 관련된 최근 5건의 주요 뉴스 목록입니다. 뉴스는 시장 동향, 신제품 출시, 경영 전략, 규제 이슈 등 다양한 측면을 다루고 있어 투자 판단에 중요한 참고 자료가 됩니다.

// <!-- Waiker News Widget BEGIN -->
// <div class="waiker-news-widget-container" style="height:600px; width:100%;">
//   <div class="waiker-news-widget-container__widget"></div>
//   <script type="application/json">
//     {"mode": "list", "height": "600px", "width": "100%", "lang": "en", "symbolWcodeList": ["AAPL.NQ"], "page": 0, "size": 5}
//   </script>
// </div>
// <!-- Waiker News Widget END -->

// ### 3.1. 뉴스 요약

// - **신제품 출시 및 혁신**: 최근 애플은 차세대 아이폰 및 AR/VR 기기 출시 계획을 발표하며, 기술 혁신에 대한 기대감을 높이고 있습니다.
// - **재무 실적 발표**: 2025년 2분기 실적 발표에서 매출과 순이익이 시장 예상치를 상회하며 주가 상승에 긍정적인 영향을 미쳤습니다.
// - **규제 및 법적 이슈**: 일부 국가에서의 반독점 조사 및 개인정보 보호 관련 규제 강화 움직임이 있으나, 애플은 이에 적극 대응 중입니다.
// - **시장 확장 전략**: 신흥 시장에서의 판매 확대 및 서비스 부문 강화 전략이 주목받고 있습니다.
// - **주주 환원 정책**: 배당 확대 및 자사주 매입 계획이 투자자 신뢰를 높이고 있습니다.

// ---

// ## 4. 기관 투자자 보유 현황 및 주식 보유 거래 내역

// 기관 투자자들의 보유 현황과 거래 내역은 애플 주가의 안정성과 향후 방향성을 가늠하는 데 중요한 지표입니다.

// <!-- Iframe 임베딩: 기관 투자자 보유 현황 -->
// <iframe
//     id="f26c88ca-779f-43d3-a296-87014411dae5"
//     src="https://beta-embed.waiker.ai/preview?jwt=$eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyS2V5IjoiM2ZkM2RhZTI2MzE4NDMwYTljOGQ2MDQ5NTZiZTk1NzQifQ._-HomwncHFAKualS6geMi_OfIDUWAmRaDkRCRae8uFs&ric=AAPL.O"
//     class="h-full w-full"
//     style="height:600px; width:100%; border:none;"
// ></iframe>

// ### 4.1. 기관 투자자 동향

// - 주요 기관 투자자들은 애플 주식을 꾸준히 보유하고 있으며, 일부 기관은 최근 매수세를 강화하는 모습입니다.
// - 대형 펀드 및 연기금의 비중이 높아 주가의 안정성에 긍정적 영향을 미치고 있습니다.

// ### 4.2. 주식 보유 거래 내역

// <!-- Iframe 임베딩: 주식 보유 거래 내역 -->
// <iframe
//     id="36354473-8454-4b0d-b067-ed455834a31d"
//     src="https://beta-embed.waiker.ai/preview?jwt=$eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyS2V5IjoiM2ZkM2RhZTI2MzE4NDMwYTljOGQ2MDQ5NTZiZTk1NzQifQ._-HomwncHFAKualS6geMi_OfIDUWAmRaDkRCRae8uFs&ric=AAPL.O"
//     class="h-full w-full"
//     style="height:600px; width:100%; border:none;"
// ></iframe>

// - 최근 기관들의 매수 및 매도 거래 내역을 통해 시장의 관심도와 투자 심리를 파악할 수 있습니다.
// - 거래량과 거래 빈도는 주가 변동성에 직접적인 영향을 미치며, 현재는 매수세가 다소 우세한 상황입니다.

// ---

// ## 5. 내부자 거래 현황

// 내부자 거래는 경영진 및 주요 임원들의 주식 매매 활동을 의미하며, 기업 내부자의 신뢰도와 미래 전망에 대한 신호로 해석됩니다.

// <!-- Iframe 임베딩: 내부자 거래 현황 -->
// <iframe
//     id="cd8b6bf5-c8a9-412d-b9b6-8d42e43b64eb"
//     src="https://beta-embed.waiker.ai/preview?jwt=$eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyS2V5IjoiM2ZkM2RhZTI2MzE4NDMwYTljOGQ2MDQ5NTZiZTk1NzQifQ._-HomwncHFAKualS6geMi_OfIDUWAmRaDkRCRae8uFs&ric=AAPL.O"
//     class="h-full w-full"
//     style="height:600px; width:100%; border:none;"
// ></iframe>

// ### 5.1. 내부자 매매 동향

// - 최근 내부자들의 주식 매수 활동이 증가하고 있어, 경영진이 회사의 미래 성장에 대해 긍정적으로 보고 있음을 시사합니다.
// - 내부자 매도는 제한적이며, 이는 주가에 대한 신뢰를 반영하는 긍정적 신호로 해석됩니다.

// ---

// ## 6. 주요 일정 및 캘린더 정보

// 애플의 향후 주요 일정은 투자자들이 주가 변동에 대비하는 데 중요한 역할을 합니다.

// <!-- Iframe 임베딩: 주요 일정 캘린더 -->
// <iframe
//     id="8b443464-7b98-4890-95ad-a52d418304ef"
//     src="https://beta-embed.waiker.ai/preview?jwt=$eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyS2V5IjoiM2ZkM2RhZTI2MzE4NDMwYTljOGQ2MDQ5NTZiZTk1NzQifQ._-HomwncHFAKualS6geMi_OfIDUWAmRaDkRCRae8uFs&ric=AAPL.O"
//     class="h-full w-full"
//     style="height:600px; width:100%; border:none;"
// ></iframe>

// ### 6.1. 예정된 이벤트

// - 분기 실적 발표일
// - 주주총회 및 배당 결정일
// - 신제품 발표회 및 기술 컨퍼런스 일정

// 이러한 일정들은 주가에 단기적 변동성을 유발할 수 있으므로 투자자들의 주의가 필요합니다.

// ---

// ## 7. 배당 정보 및 실적 개요

// 애플은 안정적인 배당 정책과 견고한 실적을 바탕으로 투자자들에게 매력적인 수익 기회를 제공하고 있습니다.

// ### 7.1. 배당 정책

// - 애플은 분기별 배당금을 지급하며, 최근 배당금은 주당 약 0.24달러 수준입니다.
// - 배당 수익률은 약 0.6% 내외로, 기술주 중에서는 안정적인 편에 속합니다.
// - 자사주 매입 프로그램도 활발히 진행 중이며, 이는 주가 부양에 긍정적 영향을 미칩니다.

// ### 7.2. 최근 실적

// - 2025년 2분기 매출은 약 1,200억 달러, 순이익은 약 350억 달러로 전년 동기 대비 각각 8%, 10% 증가하였습니다.
// - 서비스 부문과 웨어러블 기기 매출이 크게 성장하며 전체 실적을 견인하고 있습니다.
// - 글로벌 공급망 안정화와 비용 효율화 노력도 수익성 개선에 기여하고 있습니다.

// ---

// ## 8. 종합 평가 및 전망

// 애플 주가는 현재 견고한 성장세와 안정적인 재무구조를 바탕으로 긍정적인 투자 매력을 유지하고 있습니다. 주요 기술 혁신과 신제품 출시, 강력한 브랜드 파워, 그리고 글로벌 시장에서의 확장 전략이 주가 상승을 견인하는 주요 요인입니다.

// 기관 투자자와 내부자의 매수세가 지속되고 있으며, 배당과 자사주 매입을 통한 주주 환원 정책도 투자자 신뢰를 높이고 있습니다. 다만, 글로벌 경제 불확실성과 규제 리스크는 주가 변동성의 변수로 작용할 수 있으므로 주의가 필요합니다.

// 향후 애플은 AR/VR, 인공지능, 헬스케어 등 신성장 동력 분야에서의 성과가 주가에 중요한 영향을 미칠 것으로 예상됩니다. 투자자들은 이러한 기술 트렌드와 기업의 전략적 대응을 면밀히 관찰할 필요가 있습니다.

// ---

// ## 9. 참고 문헌

// [1] Apple Inc. (2025, June). Advanced Chart - NASDAQ:AAPL. TradingView. [https://www.tradingview.com/symbols/NASDAQ-AAPL/](https://www.tradingview.com/symbols/NASDAQ-AAPL/)

// [2] Waiker News Widget. (2025). Apple Inc. Latest News. Waiker. [https://beta-embed.waiker.ai/preview?ric=AAPL.NQ](https://beta-embed.waiker.ai/preview?ric=AAPL.NQ)

// [3] Waiker Institutional Holdings. (2025). Apple Institutional Investor Positions. Waiker. [https://beta-embed.waiker.ai/preview?ric=AAPL.O](https://beta-embed.waiker.ai/preview?ric=AAPL.O)

// [4] Waiker Insider Transactions. (2025). Apple Insider Trading Activity. Waiker. [https://beta-embed.waiker.ai/preview?ric=AAPL.O](https://beta-embed.waiker.ai/preview?ric=AAPL.O)

// [5] Waiker Calendar Meta. (2025). Apple Key Events Calendar. Waiker. [https://beta-embed.waiker.ai/preview?ric=AAPL.O](https://beta-embed.waiker.ai/preview?ric=AAPL.O)

// ---

// 본 보고서는 2025년 6월 27일 기준 최신 데이터를 바탕으로 작성되었으며, 투자 판단 시 참고용으로 활용하시기 바랍니다."`;

// answer에서 ```html ... ```, ```iframe ... ``` 코드블록, <iframe ...>...</iframe> 태그, <div ...>...</div> 등 주요 HTML 태그를 추출하는 함수
function parseAnswer(answer: string) {
  const htmlBlocks: string[] = [];
  const iframeBlocks: string[] = [];
  const scriptBlocks: string[] = [];
  let text = answer;

  // HTML 주석 제거
  text = text.replace(/<!--([\s\S]*?)-->/g, "");

  // <script>...</script> 태그 추출
  text = text.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, (match) => {
    scriptBlocks.push(match);
    return "";
  });

  // ```iframe ... ``` 블록 추출
  text = text.replace(/```iframe\n([\s\S]*?)```/g, (_match, code) => {
    iframeBlocks.push(code.trim());
    return "";
  });

  // ```html ... ``` 블록 추출
  text = text.replace(/```html\n([\s\S]*?)```/g, (_match, code) => {
    htmlBlocks.push(code.trim());
    return "";
  });

  // <iframe ...>...</iframe> 태그 추출 (여러 개 가능)
  text = text.replace(/<iframe[\s\S]*?<\/iframe>/gi, (match) => {
    iframeBlocks.push(match.trim());
    return "";
  });

  // <div ...>...</div> 태그 추출 (여러 개 가능, 중첩은 단순 처리)
  text = text.replace(/<div[\s\S]*?<\/div>/gi, (match) => {
    htmlBlocks.push(match.trim());
    return "";
  });

  // <section ...>...</section> 태그 추출
  text = text.replace(/<section[\s\S]*?<\/section>/gi, (match) => {
    htmlBlocks.push(match.trim());
    return "";
  });

  // <article ...>...</article> 태그 추출
  text = text.replace(/<article[\s\S]*?<\/article>/gi, (match) => {
    htmlBlocks.push(match.trim());
    return "";
  });

  return {
    text: text.trim(),
    htmlBlocks,
    iframeBlocks,
    scriptBlocks,
  };
}

export const ChatMessage = ({
  question,
  answer,
  isWaiting,
}: ChatMessageProps) => {
  let parsed = {
    text: answer || "",
    htmlBlocks: [] as string[],
    iframeBlocks: [] as string[],
    scriptBlocks: [] as string[],
  };
  if (answer) {
    parsed = parseAnswer(answer);
  }

  // parsed = parseAnswer(answer);

  const scriptContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // scriptBlocks를 실제 DOM에 삽입 및 실행
    if (scriptContainerRef.current && parsed.scriptBlocks.length > 0) {
      parsed.scriptBlocks.forEach((scriptStr) => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = scriptStr;
        const scriptTag = tempDiv.querySelector("script");
        if (scriptTag) {
          const newScript = document.createElement("script");
          // src 속성 복사
          if (scriptTag.src) newScript.src = scriptTag.src;
          // inline script 복사
          if (scriptTag.innerHTML) newScript.innerHTML = scriptTag.innerHTML;
          // type, async 등 속성 복사
          Array.from(scriptTag.attributes).forEach((attr) => {
            if (attr.name !== "src")
              newScript.setAttribute(attr.name, attr.value);
          });
          scriptContainerRef.current?.appendChild(newScript);
        }
      });
    }
    // cleanup: script 제거
    return () => {
      if (scriptContainerRef.current) scriptContainerRef.current.innerHTML = "";
    };
  }, [answer]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* 질문 */}
      <div className="self-end bg-green700 text-white px-5 py-3 rounded-2xl rounded-br-sm shadow-lg max-w-[70%] text-base animate-fade-in">
        {question}
      </div>

      {/* 대기 중인 경우 로딩 표시 */}
      {isWaiting && <LoadingIndicator />}

      {/* 답변 텍스트 */}
      {parsed.text && (
        <div
          className="self-start bg-mono100 text-mono900 px-5 py-3 rounded-2xl rounded-bl-sm shadow max-w-[70%] text-base animate-fade-in"
          style={{ whiteSpace: "pre-line" }}
        >
          {parsed.text}
        </div>
      )}

      {/* HTML 코드블록 및 주요 태그 렌더링 */}
      {parsed.htmlBlocks.map((code, idx) => (
        <div
          key={"html-" + idx}
          className="self-start bg-mono100 text-mono900 px-5 py-3 rounded-2xl rounded-bl-sm shadow max-w-[70%] text-base animate-fade-in"
        >
          <span dangerouslySetInnerHTML={{ __html: code }} />
        </div>
      ))}

      {/* iframe 코드블록 및 태그 렌더링 */}
      {parsed.iframeBlocks.map((code, idx) => (
        <div
          key={"iframe-" + idx}
          className="self-start bg-mono100 text-mono900 px-5 py-3 rounded-2xl rounded-bl-sm shadow max-w-[70%] text-base animate-fade-in"
        >
          <span dangerouslySetInnerHTML={{ __html: code }} />
        </div>
      ))}

      <div ref={scriptContainerRef} />
    </div>
  );
};
