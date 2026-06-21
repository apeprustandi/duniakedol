"use client";
import { useEffect, useRef } from "react";

const DEFAULT_LINES = [
  'await automate("registration")',
  "bot.solve(captchaChallenge)",
  "scraper.extract(targetURL)",
  'bypass.ssl("com.app.target")',
];

interface UseTerminalTypingOptions {
  lines?: string[];
  /** ms per character while typing */
  typeSpeed?: number;
  /** ms per character while deleting */
  deleteSpeed?: number;
  /** ms to pause after fully typed */
  pauseMs?: number;
}

/**
 * Drives a typewriter / delete-and-retype animation.
 * Returns a ref to attach to the <span> that should display the text.
 */
export function useTerminalTyping({
  lines = DEFAULT_LINES,
  typeSpeed = 70,
  deleteSpeed = 40,
  pauseMs = 1800,
}: UseTerminalTypingOptions = {}) {
  const typedRef = useRef<HTMLSpanElement>(null);
  const lineIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    function tick() {
      const el = typedRef.current;
      if (!el) return;

      const line = lines[lineIdx.current];

      if (!deleting.current) {
        charIdx.current++;
        el.textContent = line.slice(0, charIdx.current);
        if (charIdx.current === line.length) {
          timeout = setTimeout(() => {
            deleting.current = true;
            tick();
          }, pauseMs);
          return;
        }
      } else {
        charIdx.current--;
        el.textContent = line.slice(0, charIdx.current);
        if (charIdx.current === 0) {
          deleting.current = false;
          lineIdx.current = (lineIdx.current + 1) % lines.length;
          timeout = setTimeout(tick, 400);
          return;
        }
      }

      timeout = setTimeout(tick, deleting.current ? deleteSpeed : typeSpeed);
    }

    timeout = setTimeout(tick, 600);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return typedRef;
}
