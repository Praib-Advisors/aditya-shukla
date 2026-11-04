import type { Metadata } from "next";
import { getLang } from "@/lib/page";
import { pageMeta } from "@/lib/seo";
import { governmentDuties } from "@/content/profile";
import { PageHeader, Pic, SectionHead } from "@/components/parts";

const title = { en: "Government Experience", hi: "सरकारी अनुभव" };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await getLang(params);
  return pageMeta(lang, "government-experience", title, {
    en: "Dr. Aditya Shukla's service as Additional Private Secretary to the Minister of State for Housing and Urban Affairs, Government of India, 2021 to 2024.",
    hi: "डॉ. आदित्य शुक्ला की आवासन और शहरी कार्य राज्य मंत्री, भारत सरकार के अपर निजी सचिव के रूप में सेवा, 2021 से 2024।",
  });
}

export default async function Government({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  const t = (en: string, hi: string) => (lang === "en" ? en : hi);
  return (
    <>
      <PageHeader lang={lang} title={t("Ministry of Housing and Urban Affairs", "आवासन और शहरी कार्य मंत्रालय")} />

      <section className="wrap grid gap-12 py-16 md:py-24 lg:grid-cols-12">
        <div className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
          <SectionHead title={t("Working alongside a Minister of State", "राज्य मंत्री के साथ कार्य")} />
          <div className="mt-6 space-y-4">
            <p>{t("An Additional Private Secretary supports a Minister's office with the written and logistical work that keeps ministerial business moving. In this post Dr. Shukla handled correspondence, notes and speeches, planned the Minister's visits, and tracked questions raised in Parliament.",
                  "अपर निजी सचिव मंत्री कार्यालय के उस लिखित और व्यवस्थागत कार्य में सहयोग करता है जिससे मंत्रालयीन कामकाज चलता रहता है। इस पद पर डॉ. शुक्ला ने पत्राचार, टिप्पणियों और भाषणों का कार्य देखा, मंत्री के दौरों की योजना बनाई और संसद में उठे प्रश्नों पर नज़र रखी।")}</p>
            <p>{t("His CV also records work as a political analyst and investigator, and coordination with the BJP headquarters in New Delhi, among the responsibilities discharged during this employment.",
                  "उनके सी.वी. में इस कार्यकाल के दौरान निभाए गए दायित्वों में राजनीतिक विश्लेषक एवं अन्वेषक के रूप में कार्य तथा नई दिल्ली स्थित भाजपा मुख्यालय से समन्वय भी दर्ज है।")}</p>
          </div>
          <div className="relative mt-10 aspect-[4/3] overflow-hidden bg-sand">
            <Pic id="meeting-office-flag" lang={lang} sizes="(min-width:1024px) 40vw, 92vw" className="size-full object-cover" />
          </div>
        </div>
        <div className="lg:col-span-7">
          <ol className="mt-6 border-t border-navy/20">
            {governmentDuties.map((d, i) => (
              <li key={i} className="border-b border-navy/20 py-6">
                <div><h3 className="text-xl">{d.title[lang]}</h3><p className="mt-1">{d.body[lang]}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-sand">
        <div className="wrap py-16 md:py-24">
          <SectionHead title={t("Divisional Railway Consultative Committee", "मंडल रेल उपयोगकर्ता परामर्शदात्री समिति")} />
          <p className="mt-6 max-w-2xl">{t("From 2019 to 2021 Dr. Shukla was a member of a Divisional Railway Consultative Committee of the Ministry of Railways, Government of India. These committees are advisory forums through which railway users raise concerns with the administration.",
            "2019 से 2021 तक डॉ. शुक्ला भारत सरकार के रेल मंत्रालय की एक मंडल रेल उपयोगकर्ता परामर्शदात्री समिति के सदस्य रहे। ये समितियाँ ऐसे परामर्शदात्री मंच हैं जिनके माध्यम से रेल उपयोगकर्ता अपनी बातें प्रशासन तक पहुँचाते हैं।")}</p>
        </div>
      </section>
    </>
  );
}
