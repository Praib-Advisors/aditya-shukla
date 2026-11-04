"use client";

import { useEffect, useRef } from "react";

/**
 * Lets a picture drift a little slower than the page. The frame (className) keeps its size and hides the overflow;
 * the picture inside is taller than the frame and is shifted by at most `amount` of the frame's height as it
 * crosses the screen. Children should fill their parent (an <Image fill>, or size-full). Does nothing for
 * visitors who prefer reduced motion.
 */
export function Parallax({ children, amount = 0.08, className = "" }: { children: React.ReactNode; amount?: number; className?: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const f = frame.current;
    const el = inner.current;
    if (!f || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = f.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return; // off screen: leave it
      const p = (r.top + r.height / 2 - window.innerHeight / 2) / (window.innerHeight / 2 + r.height / 2); // -1 ... 1
      el.style.transform = `translate3d(0, ${(-p * amount * r.height).toFixed(1)}px, 0)`;
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, [amount]);

  return (
    <div ref={frame} className={`relative overflow-hidden ${className}`}>
      <div ref={inner} className="absolute inset-x-0 -top-[10%] h-[120%] will-change-transform">{children}</div>
    </div>
  );
}
