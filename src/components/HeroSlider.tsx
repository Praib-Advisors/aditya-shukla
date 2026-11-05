"use client";

import { Children, isValidElement, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Cross-fading hero slider. Autoplays every 7s, pauses on hover or keyboard focus, and does not autoplay at
 * all when the visitor prefers reduced motion. Slides that are not showing are inert, so keyboard users and
 * screen readers only meet the current one. A slide marked data-desktop-only is left out below the md breakpoint
 * (it has no phone version), and with one slide left the arrows and dots disappear. From md up the slider fills the
 * screen under the header (never wider than 2.2:1), slides sideways instead of cross-fading, and the banners are
 * cropped with object-cover; below md nothing changes.
 */
const wideQuery = "(min-width: 768px)";
const onWide = (cb: () => void) => {
  const q = window.matchMedia(wideQuery);
  q.addEventListener("change", cb);
  return () => q.removeEventListener("change", cb);
};
export function HeroSlider({ children, labels }: { children: React.ReactNode; labels: { prev: string; next: string; slide: string; region: string } }) {
  const wide = useSyncExternalStore(onWide, () => window.matchMedia(wideQuery).matches, () => false);
  const slides = Children.toArray(children).filter(
    (c) => wide || !(isValidElement(c) && (c.props as { "data-desktop-only"?: boolean })["data-desktop-only"]),
  );
  const [i0, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(true);
  const n = slides.length;
  const i = Math.min(i0, n - 1);
  const swipeX = useRef<number | null>(null);

  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduce(q.matches);
    on();
    q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (paused || reduce || n < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), 7000);
    return () => clearInterval(t);
  }, [paused, reduce, n]);

  const go = (d: number) => setI((v) => (v + d + n) % n);
  const arrow = "absolute top-1/2 z-20 hidden size-11 -translate-y-1/2 place-items-center border border-gold/60 bg-navy/70 text-ivory transition duration-300 hover:bg-gold hover:text-navy active:scale-95 sm:grid md:rounded-full md:border-navy/15 md:bg-white/90 md:text-navy md:hover:border-gold md:hover:bg-white";

  return (
    <section
      aria-roledescription="carousel"
      aria-label={labels.region}
      className="relative aspect-[9/16] overflow-hidden bg-navy landscape:aspect-video md:aspect-video md:w-full md:h-[clamp(440px,calc(100svh-3.5rem),max(760px,calc(100vw/2.2)))] lg:h-[clamp(440px,calc(100svh-4rem),max(760px,calc(100vw/2.2)))]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      // Swipe left or right on a touch screen to change slide.
      onTouchStart={(e) => { swipeX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (swipeX.current === null || n < 2) return;
        const dx = e.changedTouches[0].clientX - swipeX.current;
        swipeX.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      {slides.map((s, k) => (
        <div
          key={k}
          role="group"
          aria-roledescription="slide"
          aria-label={`${labels.slide} ${k + 1} / ${n}`}
          aria-hidden={k !== i}
          inert={k !== i}
          style={{ "--o": k - i } as React.CSSProperties}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-[cubic-bezier(.4,0,.2,1)] md:translate-x-[calc(var(--o)*100%)] md:opacity-100 md:transition-transform md:duration-[800ms] ${k === i ? "z-10 opacity-100" : "z-0 opacity-0"}`}
        >
          {s}
        </div>
      ))}

      {n > 1 && (
        <>
          <button type="button" onClick={() => go(-1)} aria-label={labels.prev} className={`${arrow} left-3 lg:left-6`}><ChevronLeft size={20} /></button>
          <button type="button" onClick={() => go(1)} aria-label={labels.next} className={`${arrow} right-3 lg:right-6`}><ChevronRight size={20} /></button>
          <div className="absolute bottom-4 left-5 z-20 flex gap-2.5 md:left-1/2 md:-translate-x-1/2">
            {slides.map((_, k) => (
              <button
                key={k}
                type="button"
                onClick={() => setI(k)}
                aria-label={`${labels.slide} ${k + 1}`}
                aria-current={k === i}
                className="grid h-6 w-8 place-items-center"
              >
                <span className={`h-[3px] w-full transition-all duration-300 ${k === i ? "bg-gold" : "bg-navy/40 hover:bg-gold/70"}`} />
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
