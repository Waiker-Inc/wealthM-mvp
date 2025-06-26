/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface ModalStackItem {
  component: React.ComponentType<any>;
  props?: Record<string, any>;
}

interface ModalState {
  open: boolean;
  stack: ModalStackItem[];
  openModal: (
    component: React.ComponentType<any>,
    props?: Record<string, any>
  ) => void;
  closeModal: () => void;
  back: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  open: false,
  stack: [],
  openModal: (component, props) =>
    set((state) => ({
      open: true,
      stack: [...state.stack, { component, props }],
    })),
  closeModal: () => set({ open: false, stack: [] }),
  back: () =>
    set((state) => {
      const newStack = state.stack.slice(0, -1);
      return {
        open: newStack.length > 0,
        stack: newStack,
      };
    }),
}));
