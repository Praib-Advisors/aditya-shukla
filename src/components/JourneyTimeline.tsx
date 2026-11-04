"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { kindLabel, type TimelineItem } from "@/content/profile";

const AMP = 22; // how far the path swings from the centre line, towards each milestone's side (px)

/**
 * A vertical timeline whose gold path snakes from side to side, one bend per milestone. On tablet and desktop
 * the milestones alternate either side of it; on a phone the line sits at the left with every milestone to its
 * right. The path is drawn as the visitor scrolls: each milestone's marker lights and its text slides in at the
 * moment the path reaches it. Visitors who prefer reduced motion get the finished timeline at once.
 */
export function JourneyTimeline({ lang, items }: { lang: Lang; items: TimelineItem[] }) {
  const list = useRef<HTMLOListElement>(null);
  const drawn = useRef<SVGPathElement>(null);
  const straight = useRef<HTMLSpanElement>(null);
  const [armed, setArmed] = useState(false); // true once JavaScript is running and motion is allowed
  const [lit, setLit] = useState(0); // how many milestones the path has reached
  const [path, setPath] = useState<{ d: string; w: number; h: number } | null>(null);
  const ys = useRef<number[]>([]);

  useEffect(() => {
    const ol = list.current;
    if (!ol) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Measure where each marker sits, and build the snaking path through them.
    const measure = () => {
      const lis = Array.from(ol.children).filter((c) => c.tagName === "LI") as HTMLElement[];
      ys.current = lis.map((li) => li.offsetTop + 17);
      if (!window.matchMedia("(min-width: 768px)").matches || ys.current.length < 2) { setPath(null); return; }
      const cx = ol.clientWidth / 2;
      const pts = ys.current.map((y, i) => ({ x: cx + (i % 2 === 0 ? -AMP : AMP), y }));
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const m = (pts[i - 1].y + pts[i].y) / 2;
        d += ` C ${pts[i - 1].x} ${m}, ${pts[i].x} ${m}, ${pts[i].x} ${pts[i].y}`;
      }
      setPath({ d, w: ol.clientWidth, h: ol.clientHeight });
    };

    if (reduce) {
      measure();
      return;
    }
    const arm = requestAnimationFrame(() => setArmed(true));

    let raf = 0;
    const update = () => {
      raf = 0;
      const y = ys.current;
      if (!y.length) return;
      // The path is drawn down to a point about two thirds of the way down the screen.
      const reach = window.innerHeight * 0.66 - ol.getBoundingClientRect().top;
      const first = y[0];
      const last = y[y.length - 1];
      const p = Math.min(1, Math.max(0, (reach - first) / (last - first)));
      if (drawn.current) drawn.current.style.strokeDashoffset = String(1 - p);
      if (straight.current) straight.current.style.transform = `scaleY(${Math.min(1, Math.max(0, (reach - 12) / (ol.clientHeight - 12)))})`;
      const n = y.filter((v) => v <= reach).length;
      setLit((cur) => (cur === n ? cur : n));
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(update); };
    const remeasure = () => { measure(); queue(); };

    measure();
    update();
    const ro = new ResizeObserver(remeasure);
    ro.observe(ol);
    window.addEventListener("scroll", queue, { passive: true });
    return () => {
      ro.disconnect();
      cancelAnimationFrame(arm);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", queue);
    };
  }, []);

  return (
    <ol ref={list} className="relative">
      {/* Phone: a straight line at the left that fills as you read */}
      <span aria-hidden className="absolute bottom-0 left-[.45rem] top-3 w-px bg-[#B58A43]/25 md:hidden" />
      <span
        ref={straight}
        aria-hidden
        className="absolute bottom-0 left-[.45rem] top-3 w-px origin-top bg-[#B58A43] md:hidden"
        style={{ transform: armed ? "scaleY(0)" : "scaleY(1)" }}
      />

      {/* Tablet and desktop: the snaking path, faint underneath and gold on top where it has been drawn */}
      {path && (
        <svg aria-hidden width={path.w} height={path.h} viewBox={`0 0 ${path.w} ${path.h}`} className="pointer-events-none absolute left-0 top-0 hidden overflow-visible md:block">
          <path d={path.d} fill="none" stroke="#B58A43" strokeOpacity=".25" strokeWidth="1" />
          <path ref={drawn} d={path.d} fill="none" stroke="#B58A43" strokeWidth="1.25" pathLength={1} strokeDasharray="1" strokeDashoffset={armed ? 1 : 0} />
        </svg>
      )}

      {items.map((it, i) => {
        const left = i % 2 === 0; // first milestone on the left, second on the right, and so on
        const shown = !armed || i < lit;
        return (
          <li key={i} className="relative grid pb-12 last:pb-0 md:-mt-12 md:grid-cols-2 md:pb-10 md:first:mt-0">
            {/* marker */}
            <span
              aria-hidden
              className={`absolute left-[.45rem] top-[.7rem] z-10 size-3 -translate-x-1/2 rounded-full border border-[#B58A43] transition duration-500 ${
                left ? "md:left-[calc(50%-22px)]" : "md:left-[calc(50%+22px)]"
              } ${shown ? "scale-110 bg-[#B58A43] shadow-[0_0_0_5px_rgba(181,138,67,.18)]" : "bg-ivory"}`}
            />
            {/* short gold connector from the marker to the milestone */}
            <span
              aria-hidden
              className={`absolute top-[1.2rem] h-px w-6 origin-left bg-[#B58A43]/70 transition-[transform,opacity] duration-700 left-[.9rem] md:w-8 ${
                left ? "md:left-auto md:right-[calc(50%+30px)] md:origin-right" : "md:left-[calc(50%+30px)]"
              } ${shown ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}`}
            />

            <div
              className={`pl-9 transition duration-[800ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none ${
                left ? "md:col-start-1 md:pl-0 md:pr-[4.25rem] md:text-right" : "md:col-start-2 md:pl-[4.25rem]"
              } ${
                shown
                  ? "translate-x-0 translate-y-0 opacity-100"
                  : `translate-y-4 opacity-0 ${left ? "md:-translate-x-6" : "md:translate-x-6"} md:translate-y-0`
              }`}
            >
              <p className="font-serif text-[clamp(2.6rem,4vw,3.4rem)] leading-none text-navy">{it.year}</p>
              <p className="mt-3 text-[.7rem] font-semibold uppercase tracking-[.22em] text-gold-deep">{kindLabel[it.kind][lang]}</p>
              <h3 className={`mt-2 max-w-md text-[clamp(1.3rem,2vw,1.6rem)] leading-snug ${left ? "md:ml-auto" : ""}`}>{it.title[lang]}</h3>
              <p className={`mt-2 max-w-md text-[.95rem] leading-relaxed ${left ? "md:ml-auto" : ""}`}>{it.detail[lang]}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
