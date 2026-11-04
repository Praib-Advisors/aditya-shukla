import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { href, type Lang, type L } from "@/lib/i18n";
import { photoById } from "@/content/media";
import type { TimelineItem } from "@/content/profile";
import { kindLabel } from "@/content/profile";
import { Reveal } from "@/components/Reveal";

/** A catalogue photograph, sized from its real dimensions so nothing shifts while loading. */
export function Pic({
  id, lang, sizes, className = "", priority = false, position = "center", alt,
}: {
  id: string; lang: Lang; sizes: string; className?: string; priority?: boolean; position?: string; alt?: string;
}) {
  const ph = photoById(id);
  return (
    <Image
      src={ph.src}
      width={ph.w}
      height={ph.h}
      alt={alt ?? ph.caption[lang]}
      sizes={sizes}
      quality={85}
      priority={priority}
      className={className}
      style={{ objectPosition: position }}
    />
  );
}

export function SectionHead({
  title, lead, dark = false, className = "", eyebrow,
}: { title: string; lead?: string; dark?: boolean; className?: string; eyebrow?: string }) {
  return (
    <Reveal className={className}>
      {eyebrow && <p className={`eyebrow ${dark ? "eyebrow-dark" : ""}`}>{eyebrow}</p>}
      <h2 className={`max-w-3xl text-[clamp(1.9rem,4vw,3rem)] leading-[1.12] ${dark ? "!text-ivory" : ""}`}>{title}</h2>
      <span aria-hidden className="mt-6 block h-px w-16 bg-gold" />
      {lead && <p className={`mt-5 max-w-2xl text-lg ${dark ? "text-ivory/75" : ""}`}>{lead}</p>}
    </Reveal>
  );
}

export function PageHeader({ lang, title, lead, light = false }: { lang: Lang; title: string; lead?: string; light?: boolean }) {
  void lang;
  return (
    <section className={light ? "bg-[#E8E0D2]" : "pilasters bg-navy text-ivory"}>
      <div className="wrap py-16 md:py-24">
        <h1 className={`rise max-w-4xl text-[clamp(2.3rem,6vw,4.5rem)] leading-[1.05] ${light ? "" : "!text-ivory"}`}>{title}</h1>
        {lead && <p className={`rise rise-3 mt-6 max-w-2xl text-lg ${light ? "text-[#4a5560]" : "text-ivory/75"}`}>{lead}</p>}
      </div>
      <hr className="rule-gold" />
    </section>
  );
}

export function TextLink({ lang, to, children }: { lang: Lang; to: string; children: React.ReactNode }) {
  return (
    <Link href={href(lang, to)} className="group inline-flex min-h-11 items-center gap-2 border-b border-gold pb-0.5 text-sm font-semibold text-navy">
      {children}
      <ArrowRight size={15} className="transition group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

export function Pending({ lang, title, children }: { lang: Lang; title?: L; children: React.ReactNode }) {
  return (
    <div className="ph-label">
      <strong>{title ? title[lang] : lang === "en" ? "Awaiting approval" : "अनुमोदन की प्रतीक्षा"}</strong>
      {children}
    </div>
  );
}

export function Timeline({ lang, items }: { lang: Lang; items: TimelineItem[] }) {
  const tone = { education: "bg-ivory border-navy/40", appointment: "bg-navy border-navy", organisation: "bg-gold border-gold" } as const;
  return (
    <ol className="relative ml-2 border-l border-navy/20 md:ml-0 md:border-l-0">
      <span aria-hidden className="absolute bottom-0 left-[8.25rem] top-0 hidden w-px bg-navy/20 md:block" />
      {items.map((it, i) => (
        <li key={i} className="relative grid gap-1 pb-10 pl-7 md:grid-cols-[8rem_1fr] md:gap-10 md:pl-0">
          <span aria-hidden className={`absolute -left-[5px] top-2 size-[9px] rounded-full border ${tone[it.kind]} md:left-[7.8rem]`} />
          <p className="font-serif text-2xl text-navy md:text-right md:pr-6">{it.year}</p>
          <div className="md:pl-6">
            <p className="text-[.7rem] font-semibold uppercase tracking-[.18em] text-gold-deep">{kindLabel[it.kind][lang]}</p>
            <h3 className="mt-1 text-xl">{it.title[lang]}</h3>
            <p className="mt-1 max-w-xl">{it.detail[lang]}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
