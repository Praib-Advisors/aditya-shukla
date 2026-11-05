import Image from "next/image";
import type { Metadata } from "next";
import { getLang } from "@/lib/page";
import { pageMeta } from "@/lib/seo";
import { ideals, featuredIdeal } from "@/content/ideals";
import { IdealsGallery } from "@/components/IdealsGallery";
import { Reveal } from "@/components/Reveal";
import { QuoteIcon } from "@/components/icons";

const title = { en: "Our Ideals", hi: "हमारे आदर्श" };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await getLang(params);
  return pageMeta(lang, "ideals", title, {
    en: "The leaders and nation-builders whose lives and ideas shape the ideals Dr. Aditya Shukla follows.",
    hi: "वे नेता और राष्ट्र-निर्माता जिनके जीवन और विचार डॉ. आदित्य शुक्ला के आदर्शों को आकार देते हैं।",
  });
}

export default async function Ideals({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  const t = (en: string, hi: string) => (lang === "en" ? en : hi);
  const featured = ideals.find((i) => i.slug === featuredIdeal.by)!;

  return (
    <>
      <section className="bg-[#E8E0D2]">
        <div className="wrap grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h1 className="rise max-w-3xl text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.05]">{title[lang]}</h1>
            <p className="rise rise-3 mt-6 max-w-2xl text-lg text-[#4a5560]">
              {t("Nation first, Antyodaya and organisation. The ideas Dr. Shukla follows come from the Sangh, from the BJP and from nation-builders such as Swami Vivekananda and Dr. Kalam.",
                 "राष्ट्र प्रथम, अंत्योदय और संगठन। डॉ. शुक्ला जिन विचारों पर चलते हैं, वे संघ, भाजपा और स्वामी विवेकानंद व डॉ. कलाम जैसे राष्ट्र-निर्माताओं से आते हैं।")}
            </p>
            <Reveal delay={150} className="mt-10 max-w-2xl">
              <QuoteIcon className="size-9 text-gold" />
              <blockquote className="mt-4 font-serif text-[clamp(1.7rem,3vw,2.4rem)] leading-snug text-navy">“{featured.quote![lang]}”</blockquote>
              <p className="mt-6 border-t border-navy/20 pt-5 text-sm">
                <b className="font-semibold text-navy">{featured.name[lang]}</b>
                <br />{featured.role[lang]}
              </p>
            </Reveal>
          </div>

          <Reveal variant="left" delay={150} className="lg:col-span-5">
            <figure className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden bg-sand shadow-[0_40px_70px_-40px_rgba(23,43,64,.65)] lg:ml-auto">
              <Image
                src={`/ideals/${featured.slug}.jpg`}
                alt={featured.name[lang]}
                width={1280}
                height={1600}
                sizes="(min-width: 1024px) 40vw, 90vw"
                quality={85}
                priority
                className="size-full object-cover"
              />
              <figcaption className="absolute bottom-4 left-4 bg-navy/85 px-3 py-1.5 text-[.78rem] font-medium tracking-wide text-ivory">{featured.years[lang]}</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="wrap py-16 md:py-24">
        <h2 className="sr-only">{t("Our ideals: the list", "हमारे आदर्श: सूची")}</h2>
        <IdealsGallery lang={lang} exclude={featured.slug} />
      </section>
    </>
  );
}
