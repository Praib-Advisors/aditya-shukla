"use client";

import { Children, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Two or more photographs side by side in a strip that slides left and right. The strip follows a finger or a
 * mouse drag and settles on the nearest photograph when released; arrows, dots and the left and right arrow keys
 * also move it. Slides that are off screen are inert.
 */
export function PhotoSlider({ children, label, prev, next, slide, className = "" }: {
  children: React.ReactNode; label: string; prev: string; next: string; slide: string; className?: string;
}) {
  const slides = Children.toArray(children);
  const n = slides.length;
  const [i, setI] = useState(0);
  const [dx, setDx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const box = useRef<HTMLElement>(null);
  const start = useRef<{ x: number; y: number; locked: boolean | null } | null>(null);
  const go = (d: number) => setI((v) => Math.min(n - 1, Math.max(0, v + d)));
  const arrow = "absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center border border-gold/60 bg-ivory/90 text-navy shadow-sm transition duration-300 hover:bg-gold hover:text-navy active:scale-95 disabled:pointer-events-none disabled:opacity-0";

  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    start.current = { x: e.clientX, y: e.clientY, locked: null };
  };
  const onMove = (e: React.PointerEvent) => {
    const s = start.current;
    if (!s) return;
    const mx = e.clientX - s.x;
    const my = e.clientY - s.y;
    // Decide once whether this gesture is a sideways drag or the visitor scrolling the page.
    if (s.locked === null && (Math.abs(mx) > 6 || Math.abs(my) > 6)) {
      s.locked = Math.abs(mx) > Math.abs(my);
      if (s.locked) {
        box.current?.setPointerCapture(e.pointerId);
        setDragging(true);
      }
    }
    if (s.locked) {
      // Pull against the ends instead of sliding past them.
      const atEdge = (i === 0 && mx > 0) || (i === n - 1 && mx < 0);
      setDx(atEdge ? mx * 0.3 : mx);
    }
  };
  const onUp = (e: React.PointerEvent) => {
    const s = start.current;
    start.current = null;
    if (!s?.locked) return;
    box.current?.releasePointerCapture(e.pointerId);
    const w = box.current?.clientWidth ?? 1;
    if (Math.abs(dx) > w * 0.15) go(dx < 0 ? 1 : -1);
    setDx(0);
    setDragging(false);
  };

  return (
    <section
      ref={box}
      aria-roledescription="carousel"
      aria-label={label}
      className={`relative touch-pan-y select-none overflow-hidden bg-sand shadow-[0_30px_60px_-30px_rgba(23,43,64,.55)] ${dragging ? "cursor-grabbing" : "cursor-grab"} ${className}`}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onDragStart={(e) => e.preventDefault()}
    >
      <div
        className={`flex size-full will-change-transform motion-reduce:transition-none ${dragging ? "" : "transition-transform duration-[800ms] ease-[cubic-bezier(.22,1,.36,1)]"}`}
        style={{ transform: `translate3d(calc(${-i * 100}% + ${dx}px), 0, 0)` }}
      >
        {slides.map((s, k) => (
          <div key={k} role="group" aria-roledescription="slide" aria-label={`${slide} ${k + 1} / ${n}`} aria-hidden={k !== i} inert={k !== i} className="relative size-full shrink-0">
            {s}
          </div>
        ))}
      </div>

      <button type="button" onClick={() => go(-1)} disabled={i === 0} aria-label={prev} className={`${arrow} left-3`}><ChevronLeft size={20} /></button>
      <button type="button" onClick={() => go(1)} disabled={i === n - 1} aria-label={next} className={`${arrow} right-3`}><ChevronRight size={20} /></button>

      <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-2">
        {slides.map((_, k) => (
          <button key={k} type="button" onClick={() => setI(k)} aria-label={`${slide} ${k + 1}`} aria-current={k === i} className="grid h-6 w-8 place-items-center">
            <span className={`h-[3px] w-full transition-all duration-500 ${k === i ? "bg-gold" : "bg-ivory/70 hover:bg-gold/80"}`} />
          </button>
        ))}
      </div>
    </section>
  );
}
