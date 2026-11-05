import type { Lang, L } from "@/lib/i18n";
import { kindLabel, type TimelineItem } from "@/content/profile";
import { Reveal } from "@/components/Reveal";

export interface Chapter { span: string; title: L; lead: L; items: TimelineItem[] }

/**
 * The full career record, set as a ledger: each chapter has its years, title and a line of context in a column
 * that stays in view on desktop, and its milestones beside it as ruled rows (year, kind, title, detail).
 * The snaking timeline on the home page is a different, lighter treatment of the same data.
 */
export function JourneyLedger({ lang, chapters }: { lang: Lang; chapters: Chapter[] }) {
  return (
    <div className="divide-y divide-navy/15 border-y border-navy/15">
      {chapters.map((c) => (
        <section key={c.span} className="grid gap-8 py-14 md:py-20 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <Reveal variant="fade" className="lg:sticky lg:top-28">
              <p className="font-serif text-[clamp(2.4rem,4.4vw,3.6rem)] leading-none text-gold-deep">{c.span}</p>
              <h2 className="mt-4 text-[clamp(1.6rem,2.6vw,2.1rem)] leading-tight">{c.title[lang]}</h2>
              <p className="mt-3 max-w-sm text-[.95rem] leading-relaxed">{c.lead[lang]}</p>
            </Reveal>
          </div>
          <ol className="lg:col-span-8">
            {c.items.map((it, i) => (
              <li key={i} className="border-t border-navy/10 first:border-t-0">
                <Reveal className="grid gap-x-8 gap-y-1 py-7 first:pt-0 sm:grid-cols-[8.5rem_1fr]">
                  <p className="font-serif text-2xl leading-tight text-navy">{it.year}</p>
                  <div>
                    <p className="text-[.68rem] font-semibold uppercase tracking-[.22em] text-gold-deep">{kindLabel[it.kind][lang]}</p>
                    <h3 className="mt-1.5 text-[clamp(1.25rem,1.9vw,1.5rem)] leading-snug">{it.title[lang]}</h3>
                    {(!it.more || it.detail[lang].length < 80) && <p className="mt-2 max-w-xl text-[.95rem] leading-relaxed">{it.detail[lang]}</p>}
                    {it.more && (
                      <ul className="mt-3 max-w-xl space-y-1.5 text-[.93rem] leading-relaxed">
                        {it.more[lang].map((pt) => (
                          <li key={pt} className="relative pl-5 before:absolute before:left-0 before:top-[.7em] before:h-px before:w-3 before:bg-gold">{pt}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
