import { useState, useCallback } from 'react';

export function useLocalStorage<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : fallback;
    } catch {
      return fallback;
    }
  });

  const persist = useCallback(
    (next: T) => {
      setValue(next);
      localStorage.setItem(key, JSON.stringify(next));
    },
    [key]
  );

  const clear = useCallback(() => {
    setValue(fallback);
    localStorage.removeItem(key);
  }, [key, fallback]);

  return [value, persist, clear] as const;
}
