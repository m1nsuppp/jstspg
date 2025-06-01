import { useEffect, useRef, useState } from "react";

export function useCustomQuery<T>(key: string, fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const hasFetchedRef = useRef(false);
  const promiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (hasFetchedRef.current) return;

    if (!promiseRef.current) {
      promiseRef.current = (async () => {
        try {
          const result = await fetcher();
          if (isMounted) {
            setData(result);
          }
        } catch (err) {
          if (isMounted) {
            setError(err instanceof Error ? err : new Error("Unknown error"));
          }
        } finally {
          if (isMounted) {
            setIsLoading(false);
          }
        }
      })();
    }

    hasFetchedRef.current = true;

    return () => {
      isMounted = false;
    };
  }, [fetcher]);

  return { data, isLoading, error };
}
