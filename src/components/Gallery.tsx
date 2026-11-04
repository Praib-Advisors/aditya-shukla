"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import type { Category, Photo, Video } from "@/content/media";
import type { Lang, L } from "@/lib/i18n";

type Item =
  | ({ kind: "photo" } & Photo)
  | ({ kind: "video"; category: "video" } & Video);

const ratio = (it: Item) => (it.kind === "photo" ? it.w / it.h : 16 / 9);

/**
 * Photographs are grouped into labelled sections in a fixed order. Inside a section the rows are justified:
 * every row has the same height, each photograph keeps its own proportions and nothing is cropped.
 */
export function Gallery({
  lang, photos, videos, labels, allLabel, order,
}: {
  lang: Lang;
  photos: Photo[];
  videos: Video[];
  labels: Record<Category, L>;
  allLabel: L;
  order: Category[];
}) {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const swipeX = useRef<number | null>(null);

  const all: Item[] = [
    ...photos.map((p) => ({ kind: "photo" as const, ...p })),
    ...videos.map((v) => ({ kind: "video" as const, category: "video" as const, ...v })),
  ];
  const groups = order
    .map((c) => ({ c, items: all.filter((i) => i.category === c) }))
    .filter((g) => g.items.length > 0);
  const visible = filter === "all" ? groups : groups.filter((g) => g.c === filter);
  const shown = visible.flatMap((g) => g.items);

  const total = shown.length;
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + total) % total)),
    [total],
  );
  const close = useCallback(() => {
    setOpen(null);
    opener.current?.focus();
  }, []);

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", key);
    };
  }, [open, close, step]);

  const current = open === null ? null : shown[open];
  let index = -1; // running position across sections, so each tile opens the right slide

  return (
    <div>
      {/* Index: also the filter */}
      <div className="sticky top-14 z-30 -mx-5 border-b border-navy/15 bg-ivory px-5 md:-mx-10 md:px-10 lg:top-16">
        <div role="group" aria-label={lang === "en" ? "Sections" : "अनुभाग"} className="flex gap-x-1 overflow-x-auto">
          {([{ c: "all" as const, n: all.length }, ...groups.map((g) => ({ c: g.c, n: g.items.length }))]).map(({ c, n }) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={`flex min-h-12 shrink-0 items-center gap-2 border-b-2 px-3 text-sm transition ${
                filter === c ? "border-gold text-navy" : "border-transparent text-body hover:text-navy"
              }`}
            >
              {c === "all" ? allLabel[lang] : labels[c][lang]}
              <span className="text-xs text-gold-deep">{n}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-20">
        {visible.map((g) => (
          <section key={g.c} aria-labelledby={`sec-${g.c}`}>
            <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-navy/20 pb-3">
              <h2 id={`sec-${g.c}`} className="text-[clamp(1.5rem,3vw,2.2rem)]">{labels[g.c][lang]}</h2>
              <p className="shrink-0 text-sm text-gold-deep">
                {g.items.length} {g.c === "video" ? (g.items.length === 1 ? "video" : "videos") : g.items.length === 1 ? "photograph" : "photographs"}
              </p>
            </div>

            <ul className="jgrid">
              {g.items.map((it) => {
                const i = ++index;
                return (
                  <li key={`${it.kind}-${it.id}`} className="jtile" style={{ ["--r" as string]: ratio(it) }}>
                    <button
                      type="button"
                      onClick={(e) => {
                        opener.current = e.currentTarget;
                        setOpen(i);
                      }}
                      className="group relative block size-full overflow-hidden bg-sand text-left"
                      aria-label={it.caption[lang]}
                    >
                      {it.kind === "photo" ? (
                        <Image
                          src={it.src}
                          width={it.w}
                          height={it.h}
                          alt={it.caption[lang]}
                          sizes="(min-width:1024px) 30vw, (min-width:480px) 45vw, 92vw"
                          quality={75}
                          loading="lazy"
                          className="size-full object-cover transition duration-700 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <>
                          <Image src={it.poster} width={1280} height={720} alt={it.caption[lang]} sizes="40vw" className="size-full object-cover" loading="lazy" />
                          <span className="absolute inset-0 grid place-items-center bg-navy/40 text-ivory"><Play size={40} aria-hidden /></span>
                        </>
                      )}
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent px-3 pb-2.5 pt-10 text-ivory">
                        <span className="block text-[.78rem] leading-snug">{it.caption[lang]}</span>
                        {it.date && <span className="block text-[.7rem] text-gold">{it.date[lang]}</span>}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          data-lenis-prevent
          aria-label={current.caption[lang]}
          className="fixed inset-0 z-[100] flex flex-col bg-navy/97 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="flex justify-between p-3 text-ivory">
            <p className="px-2 py-2 text-sm text-ivory/70" aria-live="polite">{(open ?? 0) + 1} / {shown.length}</p>
            <button ref={closeBtn} type="button" onClick={close} aria-label={lang === "en" ? "Close" : "बंद करें"} className="grid size-11 place-items-center border border-white/30">
              <X size={20} />
            </button>
          </div>
          <div
            className="relative flex min-h-0 flex-1 touch-pan-y items-center justify-center px-3 md:px-16"
            onClick={(e) => e.target === e.currentTarget && close()}
            // Swipe left or right on a touch screen to move through the photographs.
            onTouchStart={(e) => { swipeX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (swipeX.current === null) return;
              const dx = e.changedTouches[0].clientX - swipeX.current;
              swipeX.current = null;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            }}
          >
            <button type="button" onClick={() => step(-1)} aria-label={lang === "en" ? "Previous" : "पिछला"} className="absolute left-1 z-10 grid size-11 place-items-center bg-navy/70 text-ivory md:left-4"><ChevronLeft /></button>
            {current.kind === "photo" ? (
              <Image
                key={current.id}
                src={current.src}
                width={current.w}
                height={current.h}
                alt={current.caption[lang]}
                sizes="100vw"
                quality={85}
                className="fade-in max-h-full w-auto max-w-full object-contain"
              />
            ) : (
              <video key={current.id} src={current.src} poster={current.poster} controls playsInline className="fade-in max-h-full max-w-full" />
            )}
            <button type="button" onClick={() => step(1)} aria-label={lang === "en" ? "Next" : "अगला"} className="absolute right-1 z-10 grid size-11 place-items-center bg-navy/70 text-ivory md:right-4"><ChevronRight /></button>
          </div>
          <p className="p-4 text-center text-sm text-ivory/85">
            {labels[current.category][lang]} · {current.caption[lang]}
            {current.date && <span className="text-ivory/60"> · {current.date[lang]}</span>}
          </p>
        </div>
      )}
    </div>
  );
}
