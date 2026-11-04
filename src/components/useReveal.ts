"use client";

import { useEffect, useRef, useState } from "react";

export type RevealState = "visible" | "hidden" | "shown";

/**
 * The one scroll-reveal rule used across the site. The element starts visible (so nothing is lost without
 * JavaScript), is hidden as soon as the page is running, and is shown once it has risen into view. Visitors who
 * prefer reduced motion never get the hidden step.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [state, setState] = useState<RevealState>("visible");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setState("hidden");
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setState("shown");
      },
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, state] as const;
}
