import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Flag, Landmark, Scale } from "lucide-react";
import { href } from "@/lib/i18n";
import { getLang } from "@/lib/page";
import { pageMeta } from "@/lib/seo";
import { bioLong, heroIntro, timeline } from "@/content/profile";
import { aboutBlocks, aboutFacts } from "@/content/about";
import { Pic, SectionHead } from "@/components/parts";
import { PhotoSlider } from "@/components/PhotoSlider";
import { Reveal } from "@/components/Reveal";
import { JourneyLedger, type Chapter } from "@/components/JourneyLedger";

const title = { en: "About Dr. Aditya Shukla", hi: "डॉ. आदित्य शुक्ला के बारे में" };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await getLang(params);
  return pageMeta(lang, "about", title, {
    en: "Biography and professional journey of Dr. Aditya Shukla, President of NAREDCO Uttar Pradesh: legal education, ministerial service, institutional responsibilities and social work, from 2011 to the presidency.",
    hi: "डॉ. आदित्य शुक्ला, अध्यक्ष, NAREDCO उत्तर प्रदेश का जीवन-परिचय और व्यावसायिक यात्रा: विधिक शिक्षा, मंत्रालयीन सेवा, संस्थागत दायित्व और सामाजिक कार्य, 2011 से अध्यक्ष पद तक।",
  });
}

const blockIcon = { law: Scale, "public-life": Flag, government: Landmark, industry: Building2 } as const;

/** The milestones in profile.ts are in date order; the chapters cut that list into three runs. */
const chapters: Chapter[] = [
  {
    span: "2011–2014",
    title: { en: "Early years", hi: "शुरुआती वर्ष" },
    lead: { en: "Schooling in Lucknow, and the first steps into organisational life.", hi: "लखनऊ में स्कूली शिक्षा और संगठनात्मक जीवन के पहले कदम।" },
    items: timeline.slice(0, 4),
  },
  {
    span: "2014–2020",
    title: { en: "Law and the party", hi: "विधि और पार्टी" },
    lead: { en: "Legal education at Amity and Jagannath University, alongside work as a legal specialist with the party.", hi: "एमिटी और जगन्नाथ विश्वविद्यालय में विधिक शिक्षा, और साथ में पार्टी के साथ विधि विशेषज्ञ के रूप में कार्य।" },
    items: timeline.slice(4, 8),
  },
  {
    span: "2019–2025",
    title: { en: "Public office and the presidency", hi: "सार्वजनिक दायित्व और अध्यक्ष पद" },
    lead: { en: "From the Railways consultative committee to the Ministry of Housing and Urban Affairs, and then NAREDCO Uttar Pradesh.", hi: "रेल परामर्शदात्री समिति से आवासन और शहरी कार्य मंत्रालय तक, और फिर NAREDCO उत्तर प्रदेश।" },
    items: timeline.slice(8),
  },
];

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  const t = (en: string, hi: string) => (lang === "en" ? en : hi);
  return (
    <>
      <h1 className="sr-only">{title[lang]}</h1>

      {/* Opening: the photographs, the first paragraph of the biography and four facts */}
      <section className="wrap grid gap-y-14 py-16 md:py-24 lg:grid-cols-12 lg:gap-x-14">
        <div className="relative z-10 lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
          <PhotoSlider
            className="aspect-[5/7]"
            autoplay={3000}
            label={t("Photographs", "चित्र")}
            prev={t("Previous photograph", "पिछला चित्र")}
            next={t("Next photograph", "अगला चित्र")}
            slide={t("Photograph", "चित्र")}
          >
            <Pic id="portrait-conference" lang={lang} sizes="(min-width:1024px) 40vw, 92vw" priority className="size-full object-cover" position="50% 20%" />
            <Pic id="supreme-court-robes" lang={lang} sizes="(min-width:1024px) 40vw, 92vw" className="size-full object-cover" position="50% 30%" />
          </PhotoSlider>
        </div>

        <div className="lg:col-span-7 lg:pt-4">
          <Reveal>
            <p className="font-serif text-[clamp(1.45rem,2.6vw,2rem)] leading-[1.4] text-navy">{bioLong[lang][0]}</p>
          </Reveal>
          <dl className="mt-10 border-t border-gold/60">
            {aboutFacts.map((f, i) => (
              <Reveal key={f.k.en} delay={i * 70} className="grid gap-1 border-b border-navy/15 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
                <dt className="text-[.7rem] font-semibold uppercase tracking-[.2em] text-gold-deep sm:pt-1">{f.k[lang]}</dt>
                <dd className="text-[1rem] leading-relaxed text-navy">{f.v[lang]}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* The biography, topic by topic */}
      <section className="bg-sand">
        <div className="wrap py-20 md:py-28">
          <SectionHead title={t("In brief", "संक्षेप में")} lead={t("Four strands run through his work: law, public life, government and industry.", "उनके कार्य के चार सूत्र हैं: विधि, सार्वजनिक जीवन, सरकार और उद्योग।")} />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {aboutBlocks.map((b, i) => {
              const Icon = blockIcon[b.id as keyof typeof blockIcon];
              return (
                <Reveal key={b.id} delay={(i % 2) * 90} className="h-full">
                  <article className="flex h-full flex-col bg-ivory p-8 shadow-[0_30px_50px_-38px_rgba(23,43,64,.5)] md:p-10">
                    <span className="grid size-12 place-items-center bg-navy text-gold"><Icon className="size-6" aria-hidden /></span>
                    <h3 className="mt-6 text-[clamp(1.4rem,2.2vw,1.8rem)] leading-snug">{b.title[lang]}</h3>
                    <ul className="mt-5 space-y-3 text-[.97rem] leading-relaxed">
                      {b.points[lang].map((p) => (
                        <li key={p} className="relative pl-6 before:absolute before:left-0 before:top-[.78em] before:h-px before:w-3.5 before:bg-gold">{p}</li>
                      ))}
                    </ul>
                    {b.more && (
                      <Link href={href(lang, b.more.slug)} className="group mt-auto inline-flex items-center gap-2 self-start border-b border-gold pb-0.5 pt-8 text-sm font-semibold text-navy">
                        {b.more.label[lang]}
                        <ArrowRight size={15} className="transition group-hover:translate-x-1" aria-hidden />
                      </Link>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* The journey, year by year */}
      <section id="journey" className="bg-ivory">
        <div className="wrap py-20 md:py-28">
          <SectionHead title={t("Professional journey", "व्यावसायिक यात्रा")} lead={heroIntro[lang]} />
          <div className="mt-12">
            <JourneyLedger lang={lang} chapters={chapters} />
          </div>
        </div>
      </section>
    </>
  );
}
