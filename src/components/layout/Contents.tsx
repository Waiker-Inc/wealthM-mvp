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
  postChatHistoryTask,
} from '@/api/chart';
import ChatResponseRender from '../contents/ChatResponseRender';
import dayjs from 'dayjs';
import Typography from '../ui/typography';
import { Loader2 } from 'lucide-react';
import { useIdStore, useQuestionStore } from '@/stores/commonStores';

export default function Contents() {
  const queryClient = useQueryClient();
  const [sessionQuestion, setSessionQuestion] = useState<string | null>(null);
  // 개별 메시지별 로딩 상태를 관리하는 Map
  const [processingMessages, setProcessingMessages] = useState<
    Map<string, string>
  >(new Map());
  const [promptExtend, setPromptExtend] = useState('');

  const { userId, taskId, setTaskId, setVersion, version } = useIdStore();
  const { isSearch, setIsSearch, isHideContent, setIsHideContent } =
    useQuestionStore();

  const { mutate: postChatHistoryTaskMutate } = useMutation({
    mutationFn: postChatHistoryTask,
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

      if (task_id !== taskId) {
        setTaskId(task_id);
        postChatHistoryTaskMutate({
          taskId: task_id,
          taskTitle: sessionQuestion || '',
          userId,
        });
      }

      if (msgVersion) {
        setVersion(msgVersion);
      }

      // 현재 처리 중인 메시지 업데이트
      if (topic !== 'final') {
        setProcessingMessages((prev) => new Map(prev).set(task_id, answer));
      }

      if (topic === 'final') {
        console.log(answer);
        // 최종 응답이 완료되면 해당 task_id의 로딩 상태 제거
        setProcessingMessages((prev) => {
          const newMap = new Map(prev);
          newMap.delete(task_id);
          return newMap;
        });

        postChatHistoryMessageMutate({
          userId,
          taskId: taskId || '',
          senderId: 'ai',
          messageType: 'string',
          contents: answer,
          version: msgVersion,
        });
      }
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
      setPromptExtend(JSON.stringify(res));
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
      // 새로운 질문이 시작될 때 로딩 상태 추가
      if (taskId) {
        setProcessingMessages((prev) =>
          new Map(prev).set(taskId, 'Generating extended question...')
        );
      }
    },
  });

  const handleContentTransitionEnd = () => {
    if (isSearch) setIsHideContent(true);
  };

  const handleSubmit = (question: string) => {
    setIsSearch(true);
    // 임시 ID로 바로 등록
    // const tempId = Date.now().toString();
    setSessionQuestion(question);
    // addQuestion(question, tempId);

    questionExtendMutate(question);
  };

  useEffect(() => {
    if (promptExtend && taskId) {
      postChatHistoryMessageMutate({
        userId,
        taskId: taskId || '',
        senderId: 'user',
        messageType: 'string',
        contents: sessionQuestion || '',
        version: version || '',
        promptContents: promptExtend,
      });
    }
  }, [promptExtend && taskId]);

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

      {(isSearch || !!taskId) && (
        <div
          className="w-[776px] mx-auto flex flex-col gap-4 items-start pt-[40px] pb-[120px] min-h-screen absolute top-0 left-[calc(50%-388px)] overflow-y-auto bg-space1"
          style={{ minHeight: 'calc(100vh - 120px)' }}
        >
          {chatHistoryMessageList?.reverse().map(
            (item: {
              messageId: Key | null | undefined;
              contents: string;
              senderId: string;
              taskId?: string; // taskId가 있다고 가정
            }) => {
              if (item.senderId === 'user') {
                return (
                  <Fragment key={item.messageId}>
                    <div className="flex items-center justify-end w-full">
                      <Typography className="bg-mono300 rounded-[8px] px-[20px] py-[8px]">
                        {item.contents}
                      </Typography>
                    </div>
                    {/* 해당 taskId의 로딩 상태만 표시 */}
                    {item.taskId && processingMessages.has(item.taskId) && (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin">
                          <Loader2 className="w-4 h-4" />
                        </div>
                        <div className="opacity-50">
                          <ChatResponseRender
                            message={processingMessages.get(item.taskId) || ''}
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
                    // processMessage prop 제거 - 개별 로딩 상태로 대체
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
