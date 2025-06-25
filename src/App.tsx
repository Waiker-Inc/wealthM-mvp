import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import LeftPanel from './components/layout/LeftPanel';
import Contents from './components/layout/Contents';
import RightPanel from './components/layout/RightPanel';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 기본 설정들
      staleTime: 5 * 60 * 1000, // 5분
      gcTime: 10 * 60 * 1000, // 10분 (이전 cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20}>
          <LeftPanel />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <Contents />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={20}>
          <RightPanel />
        </ResizablePanel>
      </ResizablePanelGroup>
    </QueryClientProvider>
  );
}

export default App;
