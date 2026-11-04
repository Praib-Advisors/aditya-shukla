import type { Metadata } from "next";
import { getLang } from "@/lib/page";
import { pageMeta } from "@/lib/seo";
import { timeline } from "@/content/profile";
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
        <JourneyTimeline lang={lang} items={timeline} />
      </section>
    </>
  );
}
