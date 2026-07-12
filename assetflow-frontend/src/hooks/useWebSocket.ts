import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface WebSocketOptions {
  url: string;
  autoConnect?: boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

export const useWebSocket = <T = any>(
  events: string[],
  options: WebSocketOptions
) => {
  const { url, autoConnect = true, onConnect, onDisconnect, onError } = options;
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<T | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;

  const connect = useCallback(() => {
    if (socketRef.current?.connected) return;

    const socket = io(url, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: maxReconnectAttempts,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      reconnectAttempts.current = 0;
      onConnect?.();
      console.log('WebSocket connected');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      onDisconnect?.();
      console.log('WebSocket disconnected');
    });

    socket.on('connect_error', (error) => {
      reconnectAttempts.current += 1;
      console.error('WebSocket connection error:', error);
      if (reconnectAttempts.current >= maxReconnectAttempts) {
        onError?.(new Error('Max reconnection attempts reached'));
      }
    });

    // Register event listeners
    events.forEach((event) => {
      socket.on(event, (data: T) => {
        setLastMessage(data);
        // Dispatch custom event for app-wide notifications
        window.dispatchEvent(new CustomEvent(`ws:${event}`, { detail: data }));
      });
    });

    return socket;
  }, [url, events, onConnect, onDisconnect, onError]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    }
  }, []);

  const sendMessage = useCallback(
    (event: string, data: any) => {
      if (socketRef.current?.connected) {
        socketRef.current.emit(event, data);
      } else {
        console.warn('WebSocket not connected, message not sent');
      }
    },
    []
  );

  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  return {
    isConnected,
    lastMessage,
    connect,
    disconnect,
    sendMessage,
    socket: socketRef.current,
  };
};