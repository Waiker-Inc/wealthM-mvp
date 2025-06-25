import type { QAMessage } from '@/types/chat';
import { useState, useCallback } from 'react';

export const useChat = () => {
  const [qaHistory, setQaHistory] = useState<QAMessage[]>([]);
  const [currentWaitingId, setCurrentWaitingId] = useState<string | null>(null);

  const addQuestion = useCallback((question: string) => {
    const newQuestionId = Date.now().toString();

    const newQuestion: QAMessage = {
      id: newQuestionId,
      question,
      isWaiting: true,
    };

    setQaHistory((prev) => [...prev, newQuestion]);
    setCurrentWaitingId(newQuestionId);

    return newQuestionId;
  }, []);

  const updateAnswer = useCallback((questionId: string, answer: string) => {
    setQaHistory((prev) =>
      prev.map((item) =>
        item.id === questionId ? { ...item, answer, isWaiting: false } : item
      )
    );
    setCurrentWaitingId(null);
  }, []);

  const simulateAnswer = useCallback(
    (questionId: string, delay: number = 5000) => {
      setTimeout(() => {
        updateAnswer(questionId, '이곳에 실제 답변이 표시됩니다.');
      }, delay);
    },
    [updateAnswer]
  );

  return {
    qaHistory,
    currentWaitingId,
    addQuestion,
    updateAnswer,
    simulateAnswer,
  };
};
