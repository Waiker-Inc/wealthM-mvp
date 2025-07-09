import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import LeftPanel from './components/layout/LeftPanel';
import Contents from './components/layout/Contents';
// import RightPanel from "./components/layout/RightPanel";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Modal from './components/modal/Modal';
import { usePanelSizeStore } from './stores/panelSizeStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const updatePanelInfo = usePanelSizeStore((state) => state.updatePanelInfo);

  const handlePanelResize = (sizes: number[]) => {
    const windowWidth = window.innerWidth;
    const leftPanelPercent = sizes[0]; // 왼쪽 사이드바 퍼센트

    // 왼쪽 사이드바의 실제 픽셀 너비
    const leftPanelWidth = (windowWidth * leftPanelPercent) / 100;

    updatePanelInfo(leftPanelWidth);
  };

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={handlePanelResize}
        >
          <ResizablePanel defaultSize={20}>
            <LeftPanel />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel>
            <Contents />
          </ResizablePanel>
          <ResizableHandle />
          {/* <ResizablePanel defaultSize={20}>
          <RightPanel />
        </ResizablePanel> */}
        </ResizablePanelGroup>
        <Modal />
      </QueryClientProvider>
    </div>
  );
}

export default App;
