import { useState, useEffect, type Key, Fragment } from 'react';
import { cn } from '@/lib/utils';
import FAQList from '../contents/FAQList';
import QuestionCreator from '../contents/QuestionCreator';
import { ChatInput } from '../contents/ChatInput';
import useWebSocket from '@/hooks/useWebSocket';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  postChatHistoryMessage,
  getChatHistoryMessageList,
  getChatHistoryTask,
} from '@/api/chart';
import ChatResponseRender from '../contents/ChatResponseRender';
import dayjs from 'dayjs';
import Typography from '../ui/typography';
import { Loader2 } from 'lucide-react';
import { useIdStore, useQuestionStore } from '@/stores/commonStores';

export default function Contents() {
  const queryClient = useQueryClient();
  const [sessionQuestion, setSessionQuestion] = useState<string | null>(null);
  const [processMessage, setProcessMessage] = useState('');

  const { userId, taskId, setTaskId, setVersion, version } = useIdStore();
  const { isSearch, setIsSearch, isHideContent, setIsHideContent } =
    useQuestionStore();

  const { mutate: getChatHistoryTaskMutate } = useMutation({
    mutationFn: getChatHistoryTask,
  });

  const { mutate: postChatHistoryMessageMutate } = useMutation({
    mutationFn: postChatHistoryMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['chat-history-message', taskId, userId],
      });
      queryClient.invalidateQueries({
        queryKey: ['left-task-list', userId],
      });
    },
  });

  const { sendMessage } = useWebSocket({
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
      const { topic, message: msg, version: msgVersion } = message.data;
      const { message: answer, task_id } = msg;
      if (task_id) {
        setTaskId(task_id);
      }
      if (msgVersion) {
        setVersion(msgVersion);
      }
      if (topic !== 'final') {
        setProcessMessage(answer);
      }
      if (topic === 'final') {
        console.log(answer);
        setProcessMessage('');
        postChatHistoryMessageMutate({
          userId,
          taskId: taskId || '',
          senderId: 'ai',
          messageType: 'string',
          contents: answer,
          version: msgVersion,
        });
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
        taskId: taskId || '',
        userId,
        page: 0,
        size: 100,
      }),
    enabled: !!taskId && !!userId,
  });

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
        taskId: taskId || '',
      });
    },
    onError: (error) => {
      console.error('questionExtend error:', error);
    },
    onMutate: () => {
      setProcessMessage('Generating extended question...');
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
    if (isSearch) setIsHideContent(true);
  };

  const handleSubmit = (question: string) => {
    setIsSearch(true);
    // 임시 ID로 바로 등록
    // const tempId = Date.now().toString();
    if (!sessionQuestion) {
      setSessionQuestion(question);
    }
    // addQuestion(question, tempId);

    questionExtendMutate(question);
  };

  useEffect(() => {
    if (taskId && sessionQuestion) {
      postChatHistoryMessageMutate({
        userId,
        taskId: taskId || '',
        senderId: 'user',
        messageType: 'string',
        contents: sessionQuestion,
        version: version || '',
      });
    }
  }, [taskId, sessionQuestion]);

  chatHistoryMessageList?.sort(
    (
      a: { createdDt: string | number | Date | dayjs.Dayjs | null | undefined },
      b: { createdDt: string | number | Date | dayjs.Dayjs | null | undefined }
    ) => dayjs(b.createdDt).valueOf() - dayjs(a.createdDt).valueOf()
  );

  return (
    <div className="relative min-h-screen overflow-y-scroll pb-[120px]">
      <ChatInput onSubmit={handleSubmit} isSearch={isSearch || !!taskId} />
      {!isHideContent && (
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

      {(isSearch || !!taskId) && ( // isSearch
        <div
          className="w-[776px] mx-auto flex flex-col gap-4 items-start pt-[40px] pb-[120px] min-h-screen absolute top-0 left-[calc(50%-388px)] overflow-y-auto bg-space1"
          style={{ minHeight: 'calc(100vh - 120px)' }}
        >
          {chatHistoryMessageList
            ?.reverse()
            .map(
              (item: {
                messageId: Key | null | undefined;
                contents: string;
                senderId: string;
              }) => {
                if (item.senderId === 'user') {
                  return (
                    <Fragment key={item.messageId}>
                      <div className="flex items-center justify-end w-full">
                        <Typography className="bg-mono300 rounded-[8px] px-[20px] py-[8px]">
                          {item.contents}
                        </Typography>
                      </div>
                      {processMessage && (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin">
                            <Loader2 className="w-4 h-4" />
                          </div>
                          {/* <Typography className="text-mono300 px-[20px] py-[8px] w-[776px]">
                            {processMessage}
                          </Typography>
                           */}
                          <div className="opacity-50">
                            <ChatResponseRender
                              message={processMessage}
                              // processMessage={processMessage}
                            />
                          </div>
                        </div>
                      )}
                    </Fragment>
                  );
                }
                return (
                  <div key={item.messageId}>
                    <ChatResponseRender
                      message={item.contents}
                      processMessage={processMessage}
                    />
                  </div>
                );
              }
            )}
        </div>
      )}
    </div>
  );
}
