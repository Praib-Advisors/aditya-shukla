"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { kindLabel, type TimelineItem } from "@/content/profile";

/**
 * A vertical zig-zag timeline. On tablet and desktop the milestones alternate either side of a central line;
 * on a phone the line sits at the left and every milestone is to its right. As the visitor scrolls, the gold line
 * fills in, each milestone slides in from its own side and its marker lights up. Visitors who prefer reduced
 * motion get the finished timeline at once.
 */
export function JourneyTimeline({ lang, items }: { lang: Lang; items: TimelineItem[] }) {
  const list = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const [armed, setArmed] = useState(false); // true once JavaScript is running and motion is allowed
  const [seen, setSeen] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const ol = list.current;
    if (!ol || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);

    // Reveal each milestone, and light its marker, as it comes up the screen.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setSeen((s) => ({ ...s, [Number((e.target as HTMLElement).dataset.i)]: true }));
        });
      },
      { rootMargin: "0px 0px -34% 0px", threshold: 0.05 },
    );
    ol.querySelectorAll("li").forEach((li) => io.observe(li));

    // The gold line fills down to a point about two thirds of the way down the screen.
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = ol.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.66 - r.top) / r.height));
      if (fill.current) fill.current.style.transform = `scaleY(${p})`;
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);

  return (
    <ol ref={list} className="relative">
      {/* The line: a faint track, and the gold fill that follows the scroll */}
      <span aria-hidden className="absolute bottom-0 left-[.45rem] top-3 w-px bg-[#B58A43]/25 md:left-1/2 md:-translate-x-1/2" />
      <span
        ref={fill}
        aria-hidden
        className="absolute bottom-0 left-[.45rem] top-3 w-px origin-top bg-[#B58A43] md:left-1/2 md:-translate-x-1/2"
        style={{ transform: armed ? "scaleY(0)" : "scaleY(1)" }}
      />

      {items.map((it, i) => {
        const left = i % 2 === 0; // first milestone on the left, second on the right, and so on
        const shown = !armed || seen[i];
        return (
          <li key={i} data-i={i} className="relative grid pb-12 last:pb-0 md:grid-cols-2 md:pb-14">
            {/* marker */}
            <span
              aria-hidden
              className={`absolute left-[.45rem] top-[.7rem] z-10 size-3 -translate-x-1/2 rounded-full border border-[#B58A43] transition duration-500 md:left-1/2 ${
                shown ? "scale-110 bg-[#B58A43] shadow-[0_0_0_5px_rgba(181,138,67,.18)]" : "bg-ivory"
              }`}
            />
            {/* short gold connector from the marker to the milestone */}
            <span
              aria-hidden
              className={`absolute top-[1.2rem] h-px bg-[#B58A43]/70 transition-[transform,opacity] duration-700 left-[.9rem] w-6 origin-left md:w-12 ${
                left ? "md:left-auto md:right-1/2 md:mr-2 md:origin-right" : "md:left-1/2 md:ml-2"
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
              <h3 className={`mt-2 text-[clamp(1.3rem,2vw,1.6rem)] leading-snug ${left ? "md:ml-auto" : ""} max-w-md`}>{it.title[lang]}</h3>
              <p className={`mt-2 max-w-md text-[.95rem] leading-relaxed ${left ? "md:ml-auto" : ""}`}>{it.detail[lang]}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
