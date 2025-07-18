import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IdStore {
  userId: string;
  taskId: string;
  version: string;
  setUserId: (userId: string) => void;
  setTaskId: (taskId: string) => void;
  setVersion: (version: string) => void;
}

interface QuestionStore {
  isSearch: boolean;
  setIsSearch: (isSearch: boolean) => void;
  isHideContent: boolean;
  setIsHideContent: (isHideContent: boolean) => void;
}

export const useIdStore = create(
  persist<IdStore>(
    (set) => ({
      userId: '',
      taskId: '',
      version: '',
      setUserId: (userId) => set({ userId }),
      setTaskId: (taskId) => set({ taskId }),
      setVersion: (version) => set({ version }),
    }),
    {
      name: 'ID_STORE',
    }
  )
);

export const useQuestionStore = create<QuestionStore>((set) => ({
  isSearch: false,
  isHideContent: false,
  setIsSearch: (isSearch) => set({ isSearch }),
  setIsHideContent: (isHideContent) => set({ isHideContent }),
}));
