import mitt from "mitt";

export enum EventType {
  REQUEST = "REQUEST",
  RESPONSE = "RESPONSE",
  ERROR = "ERROR",
}

export interface Request {
  requestId: string;
  type: string;
  payload?: unknown;
}

export interface Response {
  requestId: string;
  type: string;
  data: unknown;
}

export interface ErrorEvent {
  requestId: string;
  type: string;
  error: Error;
}

type EventMap = Record<string | symbol, unknown> & {
  [EventType.REQUEST]: Request;
  [EventType.RESPONSE]: Response;
  [EventType.ERROR]: ErrorEvent;
};

export interface EventBusService {
  sendRequest<T, R>(type: string, payload?: T, timeoutMs?: number): Promise<R>;

  onRequest<T, R>(
    type: string,
    handler: (request: Request & { payload?: T }) => Promise<R>
  ): () => void;
}

export function createEventBusService(
  defaultTimeoutMs = 30000
): EventBusService {
  const emitter = mitt<EventMap>();

  return {
    async sendRequest<T, R>(
      type: string,
      payload?: T,
      timeoutMs = defaultTimeoutMs
    ): Promise<R> {
      const requestId = Math.random().toString(36).substring(2, 9);

      const promise = new Promise<R>((resolve, reject) => {
        // 타임아웃 설정
        const timeoutId = setTimeout(() => {
          cleanup();
          reject(new Error(`Request ${type} timed out after ${timeoutMs}ms`));
        }, timeoutMs);

        // 성공 핸들러
        const handleSuccess = (response: Response): void => {
          if (response.requestId === requestId && response.type === type) {
            clearTimeout(timeoutId);
            cleanup();
            resolve(response.data as R);
          }
        };

        // 에러 핸들러
        const handleError = (error: ErrorEvent): void => {
          if (error.requestId === requestId && error.type === type) {
            clearTimeout(timeoutId);
            cleanup();
            reject(error.error);
          }
        };

        // 핸들러 정리 함수
        const cleanup = (): void => {
          emitter.off(EventType.RESPONSE, handleSuccess);
          emitter.off(EventType.ERROR, handleError);
        };

        // 이벤트 리스너 등록
        emitter.on(EventType.RESPONSE, handleSuccess);
        emitter.on(EventType.ERROR, handleError);

        // 요청 이벤트 발행
        emitter.emit(EventType.REQUEST, {
          requestId,
          type,
          payload,
        });
      });

      return await promise;
    },

    onRequest<T, R>(
      type: string,
      handler: (request: Request & { payload?: T }) => Promise<R>
    ): () => void {
      const wrappedHandler = (request: Request): void => {
        if (request.type !== type) {
          return;
        }

        void (async (): Promise<void> => {
          try {
            const result = await handler(request as Request & { payload?: T });
            emitter.emit(EventType.RESPONSE, {
              requestId: request.requestId,
              type: request.type,
              data: result,
            });
          } catch (error) {
            emitter.emit(EventType.ERROR, {
              requestId: request.requestId,
              type: request.type,
              error: error instanceof Error ? error : new Error(String(error)),
            });
          }
        })();
      };

      emitter.on(EventType.REQUEST, wrappedHandler);
      return (): void => {
        emitter.off(EventType.REQUEST, wrappedHandler);
      };
    },
  };
}
