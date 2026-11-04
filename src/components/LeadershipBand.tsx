import Image from "next/image";
import Link from "next/link";
import { href, type Lang } from "@/lib/i18n";
import { leadershipAreas } from "@/content/areas";
import { photoById } from "@/content/media";
import { Parallax } from "@/components/Parallax";
import { Reveal } from "@/components/Reveal";

/** Full-width photographic band: a dark overlay on a wide photograph, the four areas set along the bottom. */
export function LeadershipBand({ lang, title, as: Tag = "h2" }: { lang: Lang; title: string; as?: "h1" | "h2" }) {
  const ph = photoById("expo-inauguration");
  return (
    <section className="relative isolate overflow-hidden bg-navy text-ivory">
      {/* Phones: the photograph sits in its own block above the text so nobody is covered. From md up it is the full-bleed background. */}
      <Parallax amount={0.07} className="h-[20rem] md:absolute md:inset-0 md:-z-20 md:h-auto">
        <Image src={ph.src} alt="" fill sizes="100vw" quality={85} className="object-cover" style={{ objectPosition: "50% 45%" }} />
      </Parallax>
      <div aria-hidden className="relative -mt-16 h-16 bg-gradient-to-t from-navy to-transparent md:hidden" />
      {/* Light touch: darken only behind the heading (top left) and behind the four areas (bottom), so the faces stay clear. */}
      <div aria-hidden className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-[#081828]/70 via-[#081828]/10 to-transparent md:block" />
      <div aria-hidden className="absolute inset-0 -z-10 hidden bg-[linear-gradient(to_bottom,rgba(8,24,40,.45)_0%,rgba(8,24,40,0)_28%,rgba(8,24,40,0)_42%,rgba(8,24,40,.9)_78%,rgba(8,24,40,.96)_100%)] md:block" />
      <div className="wrap flex flex-col justify-between gap-8 pb-10 pt-4 md:min-h-[48rem] md:gap-16 md:py-24">
        <Tag className="max-w-3xl text-[clamp(2.3rem,5.5vw,4.4rem)] leading-[1.05] !text-ivory">{title}</Tag>
        <ul className="grid border-t border-gold/60 sm:grid-cols-2 lg:grid-cols-4">
          {leadershipAreas.map((a, i) => (
            <li key={a.slug} className={`border-b border-white/15 lg:border-b-0 ${i % 2 ? "sm:border-l sm:border-white/15 sm:pl-6" : ""} ${i ? "lg:border-l lg:border-white/15 lg:pl-6" : ""}`}>
              <Reveal delay={i * 120}>
                <Link href={href(lang, a.slug)} className="group block py-6 lg:py-8 lg:pr-4">
                  <h3 className="text-2xl !text-ivory transition group-hover:text-gold">{a.title[lang]}</h3>
                  <p className="mt-2 text-sm text-ivory/75">{a.body[lang]}</p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
