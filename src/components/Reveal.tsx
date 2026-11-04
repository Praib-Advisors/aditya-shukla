"use client";

import { useEffect, useRef, useState } from "react";

/** Fades and lifts its children into place once, as they scroll into view. Visitors who prefer reduced motion see them at once. */
export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"visible" | "hidden" | "shown">("visible");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setState("hidden");
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      setState("shown");
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: state === "shown" ? `${delay}ms` : "0ms" }}
      className={`transition duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] ${state === "hidden" ? "translate-y-6 opacity-0" : "translate-y-0 opacity-100"} ${className}`}
    >
      {children}
    </div>
  );
}
