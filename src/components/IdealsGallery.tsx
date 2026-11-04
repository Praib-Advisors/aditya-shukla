"use client";

import Image from "next/image";
import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import { idealCategories, ideals, type IdealCategory } from "@/content/ideals";
import { Reveal } from "@/components/Reveal";

/**
 * The ideals as portrait cards (two across on a phone, three on a tablet, four on a desktop) under a row of
 * category chips that filter them and show how many are in each.
 */
export function IdealsGallery({ lang }: { lang: Lang }) {
  const [filter, setFilter] = useState<IdealCategory | "all">("all");
  const shown = filter === "all" ? ideals : ideals.filter((i) => i.category === filter);
  const chips: { id: IdealCategory | "all"; label: string; n: number }[] = [
    { id: "all", label: lang === "en" ? "All" : "सभी", n: ideals.length },
    ...idealCategories.map((c) => ({ id: c.id, label: c.label[lang], n: ideals.filter((i) => i.category === c.id).length })),
  ];

  return (
    <div>
      <div role="group" aria-label={lang === "en" ? "Category" : "श्रेणी"} className="flex flex-wrap gap-2.5">
        {chips.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={filter === c.id}
            onClick={() => setFilter(c.id)}
            className={`inline-flex min-h-11 items-center gap-2 border px-4 text-[.92rem] transition duration-300 ${
              filter === c.id ? "border-navy bg-navy text-ivory" : "border-navy/25 text-navy hover:border-gold hover:bg-white"
            }`}
          >
            {c.label}
            <small className={filter === c.id ? "text-gold" : "text-gold-deep"}>{c.n}</small>
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
        {shown.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 4) * 90} className="h-full">
            <figure className="group flex h-full flex-col">
              <div className="relative aspect-[4/5] overflow-hidden bg-sand shadow-[0_26px_50px_-34px_rgba(23,43,64,.6)]">
                <Image
                  src={`/ideals/${p.slug}.jpg`}
                  alt={p.name[lang]}
                  width={640}
                  height={800}
                  sizes="(max-width: 620px) 50vw, (max-width: 1000px) 33vw, 280px"
                  quality={85}
                  className="size-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                />
                <span className="absolute bottom-3 left-3 bg-navy/85 px-2.5 py-1 text-[.72rem] font-medium tracking-wide text-ivory">{p.years[lang]}</span>
              </div>
              <figcaption className="mt-4 flex flex-1 flex-col">
                <h3 className="text-[1.2rem] leading-snug">{p.name[lang]}</h3>
                <span className="mt-1.5 text-[.74rem] font-semibold uppercase tracking-[.1em] text-gold-deep">{p.role[lang]}</span>
                {p.text && <p className="mt-2.5 text-[.92rem] leading-relaxed">{p.text[lang]}</p>}
                {p.quote && (
                  <blockquote className="mt-2.5 border-l-2 border-gold pl-3 font-serif text-[1.05rem] italic leading-snug text-navy">“{p.quote[lang]}”</blockquote>
                )}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
