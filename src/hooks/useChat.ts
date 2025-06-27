import type { QAMessage } from "@/types/chat";
import { useState, useCallback } from "react";

export const useChat = () => {
  const [qaHistory, setQaHistory] = useState<QAMessage[]>([]);
  const [currentWaitingId, setCurrentWaitingId] = useState<string | null>(null);

  const addQuestion = useCallback((question: string, id?: string) => {
    const newQuestionId = id || Date.now().toString();

    const newQuestion: QAMessage = {
      id: newQuestionId,
      question,
      isWaiting: true,
    };
    console.log("add", newQuestion);

    setQaHistory((prev) => [...prev, newQuestion]);
    setCurrentWaitingId(newQuestionId);

    return newQuestionId;
  }, []);

  const updateAnswer = useCallback(
    (taskId: string, answer: string, isWaiting = false) => {
      if (!taskId) {
        setQaHistory([
          {
            id: taskId,
            question: "",
            answer,
            isWaiting,
          },
        ]);
        return;
      }
      setQaHistory((prev) =>
        prev.map((item) =>
          item.id === taskId ? { ...item, answer, isWaiting } : item
        )
      );
      if (!isWaiting) setCurrentWaitingId(null);
    },
    []
  );

  const getAnswer = useCallback(
    (taskId: string) => {
      const item = qaHistory.find((q) => q.id === taskId);
      if (!item) return "";
      return item.answer || "증시 데이터를 분석하는 중입니다..";
    },
    [qaHistory]
  );

  return {
    qaHistory,
    currentWaitingId,
    addQuestion,
    updateAnswer,
    getAnswer,
  };
};
