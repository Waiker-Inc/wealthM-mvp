import { create } from 'zustand';

interface PanelSizeState {
  leftPanelWidth: number;
  updatePanelInfo: (leftPanelWidth: number) => void;
}

export const usePanelSizeStore = create<PanelSizeState>((set) => ({
  leftPanelWidth: 0,
  updatePanelInfo: (leftPanelWidth: number) => set({ leftPanelWidth }),
}));
