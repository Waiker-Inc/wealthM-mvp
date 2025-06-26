import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import LeftPanel from "./components/layout/LeftPanel";
import Contents from "./components/layout/Contents";
import RightPanel from "./components/layout/RightPanel";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Modal from "./components/modal/Modal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
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
      <Modal />
    </QueryClientProvider>
  );
}

export default App;
