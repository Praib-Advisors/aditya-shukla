import type { Metadata } from "next";
import { getLang } from "@/lib/page";
import { pageMeta } from "@/lib/seo";
import { kindLabel, timeline } from "@/content/profile";
import { PageHeader } from "@/components/parts";
import { JourneyTimeline } from "@/components/JourneyTimeline";

const title = { en: "Professional Journey", hi: "व्यावसायिक यात्रा" };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await getLang(params);
  return pageMeta(lang, "professional-journey", title, {
    en: "A chronology of the education, organisational involvement and appointments of Dr. Aditya Shukla, from 2011 to the NAREDCO Uttar Pradesh presidency.",
    hi: "डॉ. आदित्य शुक्ला की शिक्षा, संगठनात्मक सहभागिता और नियुक्तियों का 2011 से NAREDCO उत्तर प्रदेश के अध्यक्ष पद तक का कालक्रम।",
  });
}

export default async function Journey({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  return (
    <>
      <PageHeader lang={lang} title={lang === "en" ? "From 2011 to the presidency" : "2011 से अध्यक्ष पद तक"} />
      <section className="wrap py-16 md:py-24">
        <ul className="mb-12 flex flex-wrap gap-x-8 gap-y-2 text-sm" aria-label={lang === "en" ? "Key" : "संकेत"}>
          {(["education", "appointment", "organisation"] as const).map((k) => (
            <li key={k} className="flex items-center gap-2">
              <span aria-hidden className={`size-2.5 rounded-full border ${k === "education" ? "border-navy/40 bg-ivory" : k === "appointment" ? "border-navy bg-navy" : "border-gold bg-gold"}`} />
              {kindLabel[k][lang]}
            </li>
          ))}
        </ul>
        <JourneyTimeline lang={lang} items={timeline} />
      </section>
    </>
  );
}
