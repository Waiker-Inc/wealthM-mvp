import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import FAQList from '../contents/FAQList';
import QuestionCreator from '../contents/QuestionCreator';
import { ChatInput } from '../contents/ChatInput';
// import { ChatMessage } from '../contents/ChatMessage';
// import { useChat } from '@/hooks/useChat';
import useWebSocket from '@/hooks/useWebSocket';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  postChatHistoryMessage,
  getChatHistoryMessageList,
  getChatHistoryTask,
} from '@/api/chart';
import ChatResponseRender from '../contents/ChatResponseRender';

export default function Contents() {
  const [isSearch, setIsSearch] = useState(false);
  const [hideContent, setHideContent] = useState(false);
  // const { addQuestion, updateAnswer } = useChat();
  const [taskId, setTaskId] = useState<string>('');
  const [sessionQuestion, setSessionQuestion] = useState<string | null>(null);
  // const pendingQuestionId = useRef<string | null>(null);
  // const [isProcessing, setIsProcessing] = useState(false);
  const [processMessage, setProcessMessage] = useState('');
  const [message, setMessage] = useState('');

  const { mutate: getChatHistoryTaskMutate } = useMutation({
    mutationFn: getChatHistoryTask,
  });

  const { mutate: postChatHistoryMessageMutate } = useMutation({
    mutationFn: postChatHistoryMessage,
  });

  console.log(import.meta.env.VITE_IAPI_URL, 666);

  const { sendMessage, userId } = useWebSocket({
    onOpen: () => {
      console.log('웹소켓 연결됨');
    },
    onClose: () => {
      console.log('웹소켓 연결 해제됨');
    },
    onError: (error) => {
      console.error('웹소켓 오류:', error);
    },
    onMessage: (message) => {
      console.log(message.data, 333);
      const {
        topic,
        // session_id,
        // user_id,
        message: msg,
        // status,
        task_id,
      } = message.data;
      const { message: answer } = msg;

      if (task_id) {
        setTaskId(task_id);
      }

      setProcessMessage('결과 응답 생성중..');

      if (topic === 'final') {
        console.log(answer, 444);
        setMessage(answer);
        setProcessMessage('');
      }

      // if (topic === 'final') {
      //   updateAnswer(task_id, answer, false);
      // } else if (status === 'Task submitted') {
      //   // 서버가 task_id를 내려주는 경우, 질문 등록
      //   if (pendingQuestionId.current) {
      //     addQuestion(pendingQuestionId.current, task_id);
      //     pendingQuestionId.current = null;
      //   }
      // }
    },
  });

  const { data: chatHistoryMessageList } = useQuery({
    queryKey: ['chat-history-message', taskId, userId],
    queryFn: () =>
      getChatHistoryMessageList({
        taskId: '123',
        userId,
        page: 0,
        size: 100,
      }),
    enabled: !!taskId && !!userId,
  });

  console.log(chatHistoryMessageList, 777);

  const isDev = import.meta.env.DEV;

  const { mutate: questionExtendMutate } = useMutation({
    mutationFn: (question: string) => {
      return fetch(
        isDev
          ? '/p1/ai/query/extend'
          : import.meta.env.VITE_AI_API_URL + '/p1/ai/query/extend',
        {
          method: 'POST',
          body: JSON.stringify({ question }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    },
    onSuccess: async (data) => {
      const res = await data.json();
      sendMessage({
        question: sessionQuestion,
        desired_tools: res,
        id: userId,
      });
    },
    onError: (error) => {
      console.error('questionExtend error:', error);
    },
    onMutate: () => {
      setProcessMessage('확장 질문 생성중..');
    },
  });

  useEffect(() => {
    if (taskId && userId && sessionQuestion) {
      getChatHistoryTaskMutate({
        taskId,
        taskTitle: sessionQuestion,
        userId,
      });
    }
  }, [taskId, userId, sessionQuestion]);

  const handleContentTransitionEnd = () => {
    if (isSearch) setHideContent(true);
  };

  const handleSubmit = (question: string) => {
    setIsSearch(true);
    // 임시 ID로 바로 등록
    // const tempId = Date.now().toString();
    if (!sessionQuestion) {
      setSessionQuestion(question);
    }
    // addQuestion(question, tempId);
    postChatHistoryMessageMutate({
      userId,
      taskId: '123',
      senderId: 'user',
      messageType: 'string',
      contents: question,
    });

    questionExtendMutate(question);
  };

  return (
    <div className="relative min-h-screen overflow-y-scroll pb-[120px]">
      <ChatInput onSubmit={handleSubmit} isSearch={isSearch} />

      {!hideContent && (
        <div
          className={cn(
            'mt-[56px] w-[776px] mx-auto pt-[120px] transition-all duration-700 ease-in-out',
            isSearch ? 'opacity-0 pointer-events-none scale-95' : 'opacity-100'
          )}
          onTransitionEnd={handleContentTransitionEnd}
        >
          <FAQList handleSubmit={handleSubmit} />
          <QuestionCreator handleSubmit={handleSubmit} />
        </div>
      )}
      {isSearch && ( // isSearch
        <div
          className="w-[776px] mx-auto flex flex-col gap-4 items-start pt-[40px] pb-[120px] min-h-screen absolute top-0 left-[calc(50%-388px)] overflow-y-auto bg-space1"
          style={{ minHeight: 'calc(100vh - 120px)' }}
        >
          <ChatResponseRender
            message={message}
            processMessage={processMessage}
          />
        </div>
      )}
    </div>
  );
}
