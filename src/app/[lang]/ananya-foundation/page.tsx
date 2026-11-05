import type { Metadata } from "next";
import { getLang } from "@/lib/page";
import { pageMeta } from "@/lib/seo";
import { PageHeader, TextLink } from "@/components/parts";
import { AnanyaFeature } from "@/components/AnanyaFeature";

const title = { en: "Ananya Foundation", hi: "अनन्या फाउंडेशन" };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await getLang(params);
  return pageMeta(lang, "ananya-foundation", title, {
    en: "Ananya Foundation, a non-profit organisation working for women's empowerment, founded by Dr. Aditya Shukla.",
    hi: "अनन्या फाउंडेशन, डॉ. आदित्य शुक्ला द्वारा स्थापित महिला सशक्तिकरण के लिए कार्यरत एक गैर-लाभकारी संगठन।",
  });
}

export default async function Foundation({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  const t = (en: string, hi: string) => (lang === "en" ? en : hi);
  const regions = lang === "en"
    ? ["Uttar Pradesh", "West Bengal", "Delhi", "Maharashtra", "Bengaluru"]
    : ["उत्तर प्रदेश", "पश्चिम बंगाल", "दिल्ली", "महाराष्ट्र", "बेंगलुरु"];
  const facts: [string, string][] = [
    [t("Founder", "संस्थापक"), t("Dr. Aditya Shukla", "डॉ. आदित्य शुक्ला")],
    [t("Legal form", "स्वरूप"), t("Non-profit organisation", "गैर-लाभकारी संगठन")],
    [t("Purpose", "उद्देश्य"), t("Women's empowerment", "महिला सशक्तिकरण")],
    [t("Funding", "वित्तपोषण"), t("Self-funded", "स्ववित्तपोषित")],
  ];
  return (
    <>
      <PageHeader
        lang={lang}
        backdrop="/ananya-hero-bg.jpg"
        accent={t("Foundation", "फाउंडेशन")}
        title={title[lang]}
        lead={t("A non-profit organisation working towards women's empowerment, founded by Dr. Aditya Shukla.", "महिला सशक्तिकरण की दिशा में कार्यरत एक गैर-लाभकारी संगठन, जिसकी स्थापना डॉ. आदित्य शुक्ला ने की।")}
      />
      <AnanyaFeature lang={lang} />

      <section className="bg-[#F7F3EC] pb-24 md:pb-32">
        <div className="wrap">
        <div className="grid gap-12 border-t border-navy/15 pt-16 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-4">
            <h2 className="text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.12]">{t("About the foundation", "फाउंडेशन के बारे में")}</h2>
          </div>

          <div className="space-y-12 lg:col-span-8">
            <div className="space-y-5 text-[1.05rem] leading-relaxed text-[#3f4a55]">
              <p>{t("Ananya Foundation is a non-profit organisation working for women's empowerment. Dr. Aditya Shukla is its founder.",
                    "अनन्या फाउंडेशन महिला सशक्तिकरण के लिए कार्यरत एक गैर-लाभकारी संगठन है। डॉ. आदित्य शुक्ला इसके संस्थापक हैं।")}</p>
              <p>{t("The foundation is financed from its own resources and carries out social service in several states and cities, as well as in other parts of the country.",
                    "फाउंडेशन अपने ही संसाधनों से संचालित है और कई राज्यों व शहरों के साथ-साथ देश के अन्य भागों में भी समाज सेवा करता है।")}</p>
            </div>

            <div>
              <h3 className="text-2xl">{t("Where it works", "कार्यक्षेत्र")}</h3>
              <ul className="mt-5 flex flex-wrap gap-3">
                {regions.map((r) => <li key={r} className="border border-[#8a6b3a]/50 px-4 py-2 font-serif text-lg text-navy">{r}</li>)}
              </ul>
            </div>

            <dl className="border-t border-navy/20">
              {facts.map(([k, v]) => (
                <div key={k} className="grid gap-1 border-b border-navy/20 py-5 sm:grid-cols-[12rem_1fr] sm:gap-8">
                  <dt className="text-[.72rem] font-medium uppercase tracking-[.2em] text-[#8a6b3a]">{k}</dt>
                  <dd className="font-serif text-xl text-navy">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <TextLink lang={lang} to="about">{t("About Dr. Shukla", "डॉ. शुक्ला के बारे में")}</TextLink>
              <TextLink lang={lang} to="contact">{t("Write to the office", "कार्यालय को लिखें")}</TextLink>
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
