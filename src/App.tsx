import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import LeftPanel from './components/layout/LeftPanel';
import Contents from './components/layout/Contents';
import RightPanel from './components/layout/RightPanel';

function App() {
  return (
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
  );
}

export default App;
