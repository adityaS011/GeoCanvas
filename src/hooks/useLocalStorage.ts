import { useState, useCallback } from 'react';

/**
 * Syncs a JSON-serialisable value with localStorage.
 *
 * Reads the stored value on first render and falls back to `fallback` if the
 * key is absent or the stored JSON is malformed.
 *
 * Returns a stable [value, persist, clear] tuple safe for use in dependency arrays.
 */
export function useLocalStorage<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : fallback;
    } catch {
      // Corrupted JSON or storage unavailable — start fresh
      return fallback;
    }
  });

  // Writes to both React state and localStorage atomically
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
