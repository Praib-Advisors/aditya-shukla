import type { Metadata } from "next";
import { getLang } from "@/lib/page";
import { pageMeta } from "@/lib/seo";
import { bioLong } from "@/content/profile";
import { PageHeader, Pic, TextLink } from "@/components/parts";
import { PhotoSlider } from "@/components/PhotoSlider";

const title = { en: "About Dr. Aditya Shukla", hi: "डॉ. आदित्य शुक्ला के बारे में" };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await getLang(params);
  return pageMeta(lang, "about", title, {
    en: "Biography of Dr. Aditya Shukla, President of NAREDCO Uttar Pradesh: legal education, ministerial service, institutional responsibilities and social work.",
    hi: "डॉ. आदित्य शुक्ला, अध्यक्ष, NAREDCO उत्तर प्रदेश का जीवन-परिचय: विधिक शिक्षा, मंत्रालयीन सेवा, संस्थागत दायित्व और सामाजिक कार्य।",
  });
}

export default async function About({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  const paras = bioLong[lang];
  return (
    <>
      <PageHeader lang={lang} title={title[lang]} />
      <section className="wrap grid gap-y-16 pb-24 pt-14 md:pb-32 lg:grid-cols-12 lg:gap-x-12 lg:pt-16">
        {/* Two photographs in a left-and-right slider; sits below the header */}
        <div className="relative z-10 lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
          <PhotoSlider
            className="aspect-[4/5]"
            label={lang === "en" ? "Photographs" : "चित्र"}
            prev={lang === "en" ? "Previous photograph" : "पिछला चित्र"}
            next={lang === "en" ? "Next photograph" : "अगला चित्र"}
            slide={lang === "en" ? "Photograph" : "चित्र"}
          >
            <Pic id="portrait-conference" lang={lang} sizes="(min-width:1024px) 40vw, 92vw" priority className="size-full object-cover" position="50% 20%" />
            <Pic id="supreme-court-robes" lang={lang} sizes="(min-width:1024px) 40vw, 92vw" className="size-full object-cover" position="50% 30%" />
          </PhotoSlider>
        </div>

        {/* Biography, level with the top of the photographs */}
        <div className="prose-ed lg:col-span-6 lg:col-start-7">
          <p className="lead !max-w-none">{paras[0]}</p>
          <div className="mt-10">{paras.slice(1).map((p, i) => <p key={i}>{p}</p>)}</div>
          <p className="mt-2 text-sm">{lang === "en" ? "Languages: Hindi, English (fluent) and French." : "भाषाएँ: हिंदी, अंग्रेज़ी (धाराप्रवाह) और फ़्रेंच।"}</p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
            <TextLink lang={lang} to="professional-journey">{lang === "en" ? "Professional journey" : "व्यावसायिक यात्रा"}</TextLink>
            <TextLink lang={lang} to="legal-academic">{lang === "en" ? "Legal & academic profile" : "विधिक एवं शैक्षणिक परिचय"}</TextLink>
          </div>
        </div>
      </section>
    </>
  );
}
