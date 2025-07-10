import { create } from 'zustand';

interface QuestionState {
  selectedUserId: string;
  selectedTaskId: string;
  setSelectedUserId: (userId: string) => void;
  setSelectedTaskId: (taskId: string) => void;
  clearSelection: () => void;
  isSearch: boolean;
  setIsSearch: (isSearch: boolean) => void;
}

const useQuestionStore = create<QuestionState>((set) => ({
  selectedUserId: '',
  selectedTaskId: '',
  isSearch: false,

  setIsSearch: (isSearch: boolean) => {
    set({ isSearch });
  },

  setSelectedUserId: (userId: string) => {
    set({ selectedUserId: userId });
  },

  setSelectedTaskId: (taskId: string) => {
    set({ selectedTaskId: taskId });
    localStorage.setItem('wealthm_task_id', taskId);
  },

  clearSelection: () => {
    set({
      selectedUserId: '',
      selectedTaskId: '',
      isSearch: false,
    });
  },
}));

export default useQuestionStore;
