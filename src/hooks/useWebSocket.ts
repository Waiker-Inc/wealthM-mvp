/* eslint-disable @typescript-eslint/no-explicit-any */
import { useIdStore } from '@/stores/commonStores';
import { useState, useEffect, useCallback, useRef } from 'react';

interface WebSocketMessage {
  type: string;

  data: any;
  timestamp: number;
}

interface UseWebSocketOptions {
  url?: string;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
  onMessage?: (message: WebSocketMessage) => void;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

interface UseWebSocketReturn {
  isConnected: boolean;
  messages: WebSocketMessage[];

  sendMessage: (message: any, id?: string) => void;
  connect: () => void;
  disconnect: () => void;
  lastMessage: WebSocketMessage | null;
  error: string | null;
}

const generateUserId = (): string => {
  const randomId = Math.floor(Math.random() * 999) + 1;
  return `u${String(randomId).padStart(3, '0')}`;
};

const userIdInit = generateUserId();

const useWebSocket = ({
  onOpen,
  onClose,
  onError,
  onMessage,
  reconnectInterval = 3000,
  maxReconnectAttempts = 5,
}: UseWebSocketOptions): UseWebSocketReturn => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  const { setUserId, userId } = useIdStore();

  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const callbacksRef = useRef({
    onOpen,
    onClose,
    onError,
    onMessage,
  });

  useEffect(() => {
    if (!userId) {
      setUserId(userIdInit);
    }
  }, [userId]);

  useEffect(() => {
    callbacksRef.current = {
      onOpen,
      onClose,
      onError,
      onMessage,
    };
  }, [onOpen, onClose, onError, onMessage]);

  const constructWsUrl = useCallback(() => {
    // const path = window.location.pathname.split('/');
    // const sessionIdFromUrl = path.length > 1 && path[1] ? path[1] : null;

    return `${import.meta.env.VITE_SOCKET_URL}/${userId || userIdInit}`;
    // if (sessionIdFromUrl) {
    //   url += `/${sessionIdFromUrl}`;
    // }
  }, []);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      const wsUrl = constructWsUrl();
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket Connected');
        setIsConnected(true);
        setError(null);
        reconnectAttemptsRef.current = 0;
        callbacksRef.current.onOpen?.();
      };

      ws.onclose = () => {
        setIsConnected(false);
        callbacksRef.current.onClose?.();

        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current += 1;
            connect();
          }, reconnectInterval);
        }
      };

      ws.onerror = (event) => {
        setError('웹소켓 연결 오류가 발생했습니다.');
        callbacksRef.current.onError?.(event);
      };

      ws.onmessage = (event) => {
        try {
          const parsedMessage: WebSocketMessage = {
            type: 'message',
            data: JSON.parse(event.data),
            timestamp: Date.now(),
          };

          setMessages((prev) => [...prev, parsedMessage]);
          setLastMessage(parsedMessage);
          callbacksRef.current.onMessage?.(parsedMessage);
        } catch (err) {
          console.error('메시지 파싱 오류:', err);
        }
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('웹소켓 연결을 초기화할 수 없습니다.');
    }
  }, [constructWsUrl, reconnectInterval, maxReconnectAttempts]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }

    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    setIsConnected(false);
  }, []);

  const sendMessage = useCallback((sendObject: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(sendObject));
    } else {
      setError('웹소켓이 연결되지 않았습니다.');
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []);

  return {
    isConnected,
    messages,
    sendMessage,
    connect,
    disconnect,
    lastMessage,
    error,
  };
};

export default useWebSocket;
