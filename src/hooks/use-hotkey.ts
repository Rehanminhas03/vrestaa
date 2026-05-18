"use client";

import { useEffect } from "react";

type Handler = (e: KeyboardEvent) => void;

interface Options {
  meta?: boolean;
  enabled?: boolean;
}

export function useHotkey(key: string, handler: Handler, opts: Options = {}) {
  const { meta = false, enabled = true } = opts;

  useEffect(() => {
    if (!enabled) return;
    const onKey = (e: KeyboardEvent) => {
      const matchesMeta = meta ? e.metaKey || e.ctrlKey : true;
      if (e.key.toLowerCase() === key.toLowerCase() && matchesMeta) {
        handler(e);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [key, handler, meta, enabled]);
}
