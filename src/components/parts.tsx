import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { href, type Lang, type L } from "@/lib/i18n";
import { photoById } from "@/content/media";
import { MaskText } from "@/components/MaskText";
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
  title, lead, dark = false, className = "", label, align = "left", size = "md",
}: {
  title: string; lead?: string; dark?: boolean; className?: string;
  /** A small plain-text label, only where it adds context. No numbering, no uppercase, no rule. */
  label?: string;
  align?: "left" | "center"; size?: "md" | "lg";
}) {
  const centre = align === "center";
  return (
    <Reveal variant="fade" className={`${centre ? "text-center" : ""} ${className}`}>
      {label && <p className={`mb-2 font-serif text-lg italic ${dark ? "text-gold" : "text-gold-deep"}`}>{label}</p>}
      <h2 className={`${centre ? "mx-auto" : ""} max-w-3xl leading-[1.12] ${size === "lg" ? "text-[clamp(2.2rem,5vw,3.8rem)]" : "text-[clamp(1.9rem,4vw,3rem)]"} ${dark ? "!text-ivory" : ""}`}>
        <MaskText>{title}</MaskText>
      </h2>
      {lead && <p className={`mt-5 max-w-2xl text-lg ${centre ? "mx-auto" : ""} ${dark ? "text-ivory/75" : ""}`}>{lead}</p>}
    </Reveal>
  );
}

/**
 * The band at the top of every inner page. The dark one sits on a soft, out-of-focus navy backdrop with warm gold
 * light at the edges, with the title leading and one phrase of it picked out in gold. `accent` must be a phrase that appears in `title`. `backdrop` swaps the default backdrop for a photograph
 * that has already been blurred (a path under /public); it is darkened more so the text stays clear.
 */
export function PageHeader({ lang, title, lead, light = false, accent, backdrop }: {
  lang: Lang; title: string; lead?: string; light?: boolean; accent?: string; backdrop?: string;
}) {
  void lang;
  const at = accent ? title.indexOf(accent) : -1;
  return (
    <section
      className={light ? "bg-[#E8E0D2]" : `relative isolate overflow-hidden bg-navy text-ivory ${backdrop ? "bg-cover bg-[position:50%_42%]" : "bg-[url(/page-hero-bg.jpg)] bg-[length:100%_100%]"}`}
      style={!light && backdrop ? { backgroundImage: `url(${backdrop})` } : undefined}
    >
      {!light && (
        <>
          <div aria-hidden className={`absolute inset-0 -z-10 bg-gradient-to-b ${backdrop ? "from-navy/70 via-navy/55 to-navy/75 md:from-navy/45 md:via-navy/25 md:to-navy/60" : "from-navy/45 via-navy/10 to-navy/50"}`} />
          <div aria-hidden className={`absolute inset-0 -z-10 bg-gradient-to-r ${backdrop ? "from-navy/85 via-navy/45 to-transparent" : "from-navy/70 via-navy/15 to-transparent"}`} />
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        </>
      )}
      <div className="wrap relative py-20 md:py-32">
        <h1 className={`rise max-w-4xl text-[clamp(2.3rem,6vw,4.5rem)] leading-[1.05] ${light ? "" : "!text-ivory"}`}>
          {at >= 0 ? (
            <>{title.slice(0, at)}<span className="text-gold">{accent}</span>{title.slice(at + accent!.length)}</>
          ) : title}
        </h1>
        {lead && <p className={`rise rise-3 mt-6 max-w-2xl text-lg ${light ? "text-[#4a5560]" : "text-ivory/75"}`}>{lead}</p>}
      </div>
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
