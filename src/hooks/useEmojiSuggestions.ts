import { useState, useEffect, useRef } from "react";

const FALLBACK_EMOJIS = ["💸", "🧾", "💳", "💰", "🤝"];

export function useEmojiSuggestions(query: string, debounceMs = 400) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const abortController = useRef<AbortController | undefined>(undefined);
  const requestIdRef = useRef(0);

  useEffect(() => {
    clearTimeout(timer.current);
    abortController.current?.abort();

    if (!query.trim() || query.trim().length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    timer.current = setTimeout(async () => {
      const requestId = ++requestIdRef.current;
      const controller = new AbortController();
      abortController.current = controller;

      setLoading(true);
      try {
        const res = await fetch("/api/emoji-suggest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: query }),
          signal: controller.signal,
        });
        const data = await res.json();
        if (requestId === requestIdRef.current) {
          setSuggestions(data.emojis?.length ? data.emojis : FALLBACK_EMOJIS);
        }
      } catch (error) {
        if (controller.signal.aborted) return;
        if (requestId === requestIdRef.current) {
          setSuggestions(FALLBACK_EMOJIS);
        }
      } finally {
        if (requestId === requestIdRef.current && !controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, debounceMs);

    return () => {
      clearTimeout(timer.current);
      abortController.current?.abort();
    };
  }, [query, debounceMs]);

  return { suggestions, loading };
}
