export const LoadingIndicator = () => (
  <div className="flex items-center gap-2 mt-2 animate-fade-in">
    <div className="w-2 h-2 bg-mono400 rounded-full animate-bounce [animation-delay:0ms]" />
    <div className="w-2 h-2 bg-mono400 rounded-full animate-bounce [animation-delay:150ms]" />
    <div className="w-2 h-2 bg-mono400 rounded-full animate-bounce [animation-delay:300ms]" />
    <span className="ml-2 text-mono400 text-sm">답변 생성 중...</span>
  </div>
);
