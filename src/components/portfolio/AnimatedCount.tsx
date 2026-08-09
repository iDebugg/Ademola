"use client";

import { useEffect, useMemo, useState } from "react";

type AnimatedCountProps = {
  value: number;
  suffix?: string;
  durationMs?: number;
};

export default function AnimatedCount({
  value,
  suffix = "",
  durationMs = 900,
}: AnimatedCountProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) {
      return;
    }

    if (typeof window === "undefined") {
      return;
    }

    const prefersReducedMotion =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

    const supportsMotion = !prefersReducedMotion;

    let rafId = 0;

    if (!supportsMotion) {
      rafId = window.requestAnimationFrame(() => {
        setCount(value);
        setHasAnimated(true);
      });
      return () => window.cancelAnimationFrame(rafId);
    }

    let startTs = 0;

    const tick = (ts: number) => {
      if (startTs === 0) {
        startTs = ts;
      }

      const elapsed = ts - startTs;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(value * eased));

      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        setHasAnimated(true);
      }
    };

    rafId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(rafId);
  }, [durationMs, hasAnimated, value]);

  const text = useMemo(() => `${count}${suffix}`, [count, suffix]);

  return <>{text}</>;
}
