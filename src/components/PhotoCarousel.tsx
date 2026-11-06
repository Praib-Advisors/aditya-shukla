"use client";

import { Children, useRef, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * A single row of photographs, in the order they are given: two at a time from tablet width up, one at a time (a wide,
 * landscape-shaped photograph) on a phone. It does not move by itself: the visitor changes the photographs with the
 * arrows, the dots or a swipe, so no photograph shows twice in a row (1 and 2, then 3 and 4, and so on; with an odd
 * count the last photograph is shown alone, in the middle). After the last set the next step glides on into the first
 * one again: the first set is repeated at the end only so the loop has no rewind, then the track jumps back unseen.
 * Sets that are not showing are inert, so keyboard users and screen readers only meet the photographs that are.
 * Each child is one photograph's cell content; the cell's size is set here, how the photograph fills it by the caller.
 */
const GAP = ".75rem";
const wideQuery = "(min-width: 768px)";
const onWide = (cb: () => void) => {
  const q = window.matchMedia(wideQuery);
  q.addEventListener("change", cb);
  return () => q.removeEventListener("change", cb);
};

type Props = {
  children: React.ReactNode;
  labels: { prev: string; next: string; region: string; page: string };
};


/**
 * Two photographs per set from tablet width up, one on a phone. The row is keyed by that number, so going between the
 * two (turning a tablet, say) starts it again from the first set instead of leaving it part way through a regrouped
 * list. Before the page is hydrated it assumes two; on a phone the first photograph is then already full width and the
 * second is clipped, so nothing visibly jumps.
 */
export function PhotoCarousel(props: Props) {
  const wide = useSyncExternalStore(onWide, () => window.matchMedia(wideQuery).matches, () => true);
  const per = wide ? 2 : 1;
  return <Row key={per} per={per} {...props} />;
}

function Row({ per, children, labels }: Props & { per: number }) {
  const items = Children.toArray(children);
  const sets: React.ReactNode[][] = [];
  for (let i = 0; i < items.length; i += per) sets.push(items.slice(i, i + per));
  const count = sets.length;
  const pages = [...sets, sets[0]]; // the first set again at the end, for the seamless loop
  const [page, setPage] = useState(0); // 0 .. count; "count" is the repeated first pair
  const [anim, setAnim] = useState(true);
  const swipeX = useRef<number | null>(null);

  // Next frame after a silent jump, switch the slide animation back on.
  const resume = () => requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));

  const next = () => setPage((p) => (p < count ? p + 1 : p));
  const prev = () => {
    if (page === 0) {
      setAnim(false);
      setPage(count); // the repeated first pair looks the same as the real one
      requestAnimationFrame(() => requestAnimationFrame(() => { setAnim(true); setPage(count - 1); }));
    } else setPage((p) => p - 1);
  };

  const onEnd = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget || page !== count) return;
    setAnim(false);
    setPage(0);
    resume();
  };

  const arrow = "absolute top-1/2 z-20 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-navy/15 bg-white/90 text-navy shadow-sm transition duration-300 hover:border-gold hover:bg-white active:scale-95 md:grid";
  const current = page % count;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      className="relative"
      onTouchStart={(e) => { swipeX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (swipeX.current === null) return;
        const dx = e.changedTouches[0].clientX - swipeX.current;
        swipeX.current = null;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
      }}
    >
      <div className="overflow-hidden">
        <div
          onTransitionEnd={onEnd}
          style={{ transform: `translateX(calc(${-page} * (100% + ${GAP})))`, gap: GAP }}
          className={`flex will-change-transform ${anim ? "transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none" : ""}`}
        >
          {pages.map((pair, k) => (
            <div key={k} inert={k !== page} style={{ gap: GAP }} className="flex w-full flex-none justify-center">
              {pair.map((c, j) => (
                <div key={j} className="aspect-[4/3] flex-none basis-full overflow-hidden md:aspect-[5/4] md:basis-[calc((100%_-_.75rem)/2)]">
                  {c}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <>
          <button type="button" onClick={prev} aria-label={labels.prev} className={`${arrow} left-3 lg:left-5`}><ChevronLeft size={20} /></button>
          <button type="button" onClick={next} aria-label={labels.next} className={`${arrow} right-3 lg:right-5`}><ChevronRight size={20} /></button>
          <div className={`mt-6 flex justify-center ${count > 9 ? "gap-1" : "gap-2"}`}>
            {Array.from({ length: count }, (_, k) => (
              <button
                key={k}
                type="button"
                onClick={() => { setAnim(true); setPage(k); }}
                aria-label={`${labels.page} ${k + 1}`}
                aria-current={k === current}
                className={`grid h-6 place-items-center ${count > 9 ? "w-4" : "w-7"}`}
              >
                <span className={`h-[3px] w-full transition-all duration-300 ${k === current ? "bg-gold" : "bg-navy/30 hover:bg-gold/70"}`} />
              </button>
            ))}
          </div>
        </>
      )}

    </div>
  );
}
