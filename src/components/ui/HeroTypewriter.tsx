"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type HeroTypewriterProps = {
  text: string;
  className?: string;
  as?: "h1" | "p";
  prefix?: string;
  speedMs?: number;
  startDelayMs?: number;
};

export default function HeroTypewriter({
  text,
  className,
  as: Tag = "h1",
  prefix = "#",
  speedMs = 24,
  startDelayMs = 320,
}: HeroTypewriterProps) {
  const shouldReduceMotion = useReducedMotion();
  const [visibleChars, setVisibleChars] = useState(0);

  const fullText = useMemo(() => (prefix ? `${prefix} ${text}` : text), [prefix, text]);
  const displayedChars = shouldReduceMotion ? text.length : visibleChars;
  const isComplete = displayedChars >= text.length;

  const getTypingDelay = useCallback(
    (character: string) => {
      if (character === " ") {
        return Math.max(12, Math.round(speedMs * 0.55));
      }

      if (character === "," || character === ";" || character === ":") {
        return Math.round(speedMs * 4.2);
      }

      if (character === "." || character === "!" || character === "?") {
        return Math.round(speedMs * 6.2);
      }

      return speedMs;
    },
    [speedMs],
  );

  useEffect(() => {
    if (shouldReduceMotion || visibleChars >= text.length) {
      return;
    }

    const nextCharacter = text[visibleChars] ?? "";
    const delay = visibleChars === 0 ? startDelayMs : getTypingDelay(nextCharacter);
    const timer = window.setTimeout(() => {
      setVisibleChars((current) => Math.min(current + 1, text.length));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [getTypingDelay, shouldReduceMotion, startDelayMs, text, text.length, visibleChars]);

  return (
    <Tag className={cn("hero-typewriter", className)}>
      <span className="sr-only">{fullText}</span>
      <span aria-hidden="true" className="hero-type-line">
        {prefix ? <span className="hero-type-prefix">{prefix}</span> : null}
        {prefix ? <span className="hero-type-gap"> </span> : null}
        <span className="hero-type-text">{text.slice(0, displayedChars)}</span>
        <span className={cn("hero-type-caret", isComplete && "is-done")}>|</span>
      </span>
    </Tag>
  );
}
