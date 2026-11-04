import type { Lang } from "@/lib/i18n";
import { kindLabel, type TimelineItem } from "@/content/profile";
import { Timeline } from "./parts";
import { JourneyScroller } from "./JourneyScroller";

const dot = {
  education: "border-navy/40 bg-ivory",
  appointment: "border-navy bg-navy",
  organisation: "border-gold bg-gold",
} as const;

/** Horizontal slider from the md breakpoint up; the vertical timeline on phones. */
export function JourneyTimeline({ lang, items }: { lang: Lang; items: TimelineItem[] }) {
  return (
    <>
      <div className="md:hidden"><Timeline lang={lang} items={items} /></div>

      <div className="hidden md:block">
        <JourneyScroller lang={lang}>
          <ol className="flex w-max pt-1.5">
            {items.map((it, i) => (
              <li key={i} className="relative w-[17.5rem] shrink-0 snap-start border-t border-navy/30 pr-10 pt-8">
                <span aria-hidden className={`absolute -top-[5px] left-0 size-[9px] rounded-full border ${dot[it.kind]}`} />
                <p className="font-serif text-4xl text-navy">{it.year}</p>
                <p className="mt-2 text-[.7rem] font-semibold uppercase tracking-[.18em] text-gold-deep">{kindLabel[it.kind][lang]}</p>
                <h3 className="mt-2 text-xl leading-snug">{it.title[lang]}</h3>
                <p className="mt-2 text-sm">{it.detail[lang]}</p>
              </li>
            ))}
          </ol>
        </JourneyScroller>
      </div>
    </>
  );
}
