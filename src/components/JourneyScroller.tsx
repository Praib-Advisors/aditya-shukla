"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Lang } from "@/lib/i18n";

/**
 * Horizontal slider for the timeline: arrow buttons, scroll-snap, mouse drag, a progress bar and the
 * browser's own keyboard scrolling (the track is focusable). Touch uses native momentum scrolling.
 */
export function JourneyScroller({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [m, setM] = useState({ left: 0, client: 1, total: 1 });

  const measure = useCallback(() => {
    const el = track.current;
    if (el) setM({ left: el.scrollLeft, client: el.clientWidth, total: el.scrollWidth });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    // ResizeObserver reports once when it starts observing, which also sets the first measurement.
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    el.addEventListener("scroll", measure, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", measure);
    };
  }, [measure]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = track.current;
    if (!el || e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { x: e.clientX, left: el.scrollLeft };
    el.style.scrollSnapType = "none";
    el.style.userSelect = "none";
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = track.current;
    if (el && drag.current) el.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = track.current;
    if (!el || !drag.current) return;
    drag.current = null;
    el.style.scrollSnapType = "";
    el.style.userSelect = "";
    el.releasePointerCapture(e.pointerId);
  };

  const max = m.total - m.client;
  const atStart = m.left <= 2;
  const atEnd = m.left >= max - 2;
  const thumb = Math.min(100, (m.client / m.total) * 100);
  const offset = max > 0 ? (m.left / max) * (100 - thumb) : 0;

  const btn = "grid size-11 place-items-center border border-navy/30 text-navy transition hover:border-navy hover:bg-navy hover:text-ivory disabled:pointer-events-none disabled:opacity-30";

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <p aria-hidden className="text-sm text-gold-deep">{lang === "en" ? "Drag, scroll or use the arrows" : "खींचें, स्क्रॉल करें या तीरों का उपयोग करें"}</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} disabled={atStart} aria-label={lang === "en" ? "Earlier" : "पहले"} className={btn}><ChevronLeft size={20} /></button>
          <button type="button" onClick={() => go(1)} disabled={atEnd} aria-label={lang === "en" ? "Later" : "बाद में"} className={btn}><ChevronRight size={20} /></button>
        </div>
      </div>

      <div
        ref={track}
        role="region"
        tabIndex={0}
        aria-label={lang === "en" ? "Timeline. Scroll horizontally." : "कालक्रम। क्षैतिज रूप से स्क्रॉल करें।"}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="journey-scroll cursor-grab snap-x snap-mandatory overflow-x-auto pb-6 active:cursor-grabbing"
      >
        {children}
      </div>

      <div aria-hidden className="relative mt-2 h-px bg-navy/20">
        <span className="absolute -top-px h-0.5 bg-gold transition-[left] duration-150" style={{ width: `${thumb}%`, left: `${offset}%` }} />
      </div>
    </div>
  );
}
