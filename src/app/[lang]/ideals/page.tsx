import Image from "next/image";
import type { Metadata } from "next";
import { getLang } from "@/lib/page";
import { pageMeta } from "@/lib/seo";
import { ideals, thoughtOfTheDay } from "@/content/ideals";
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
  const featured = ideals.find((i) => i.slug === thoughtOfTheDay.by)!;

  return (
    <>
      <section className="bg-[#E8E0D2]">
        <div className="wrap grid items-center gap-10 py-16 md:py-24 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h1 className="rise max-w-3xl text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.05]">{title[lang]}</h1>
            <p className="rise rise-3 mt-6 max-w-2xl text-lg text-[#4a5560]">
              {t("Nation first, Antyodaya and organisation. The ideas Dr. Shukla follows come from the Sangh, from the BJP and from nation-builders such as Swami Vivekananda and Dr. Kalam.",
                 "राष्ट्र प्रथम, अंत्योदय और संगठन। डॉ. शुक्ला जिन विचारों पर चलते हैं, वे संघ, भाजपा और स्वामी विवेकानंद व डॉ. कलाम जैसे राष्ट्र-निर्माताओं से आते हैं।")}
            </p>
          </div>

          <Reveal variant="left" delay={150} className="lg:col-span-5">
            <div className="relative bg-ivory p-7 shadow-[0_34px_60px_-38px_rgba(23,43,64,.55)] md:p-9">
              <QuoteIcon className="size-8 text-gold" />
              <p className="mt-4 text-[.78rem] font-medium tracking-wide text-gold-deep">{t("Thought of the day", "आज का विचार")}</p>
              <blockquote className="mt-2 font-serif text-[1.55rem] leading-snug text-navy">“{featured.quote![lang]}”</blockquote>
              <div className="mt-6 flex items-center gap-4 border-t border-navy/15 pt-5">
                <Image src={`/ideals/${featured.slug}.jpg`} alt="" width={52} height={65} className="h-[65px] w-[52px] object-cover" />
                <p className="text-sm"><b className="font-semibold text-navy">{featured.name[lang]}</b><br />{featured.role[lang]}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="wrap py-16 md:py-24">
        <h2 className="sr-only">{t("Our ideals: the list", "हमारे आदर्श: सूची")}</h2>
        <IdealsGallery lang={lang} />

        <div className="mt-20 border-t border-navy/15 pt-8">
          <h2 className="text-lg">{t("Photograph credits", "छायाचित्र श्रेय")}</h2>
          <ul className="mt-4 grid gap-x-10 gap-y-2 text-[.82rem] sm:grid-cols-2">
            {ideals.map((p) => (
              <li key={p.slug}>
                <a href={p.credit.url} target="_blank" rel="noopener noreferrer" className="text-navy underline decoration-gold underline-offset-4">{p.name[lang]}</a>
                {": "}{p.credit.author}, {p.credit.license}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
