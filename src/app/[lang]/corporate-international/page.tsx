import type { Metadata } from "next";
import { getLang } from "@/lib/page";
import { pageMeta } from "@/lib/seo";
import { PageHeader, Pic, SectionHead } from "@/components/parts";

const title = { en: "Corporate and International Engagements", hi: "कॉर्पोरेट एवं अंतरराष्ट्रीय दायित्व" };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await getLang(params);
  return pageMeta(lang, "corporate-international", title, {
    en: "The corporate roles and international engagements of Dr. Aditya Shukla, President of NAREDCO Uttar Pradesh.",
    hi: "डॉ. आदित्य शुक्ला, अध्यक्ष, NAREDCO उत्तर प्रदेश के कॉर्पोरेट दायित्व और अंतरराष्ट्रीय संपर्क।",
  });
}

export default async function Corporate({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  const t = (en: string, hi: string) => (lang === "en" ? en : hi);
  return (
    <>
      <PageHeader lang={lang} title={title[lang]} accent={lang === "en" ? "International Engagements" : "अंतरराष्ट्रीय दायित्व"} />

      <section className="wrap grid gap-12 py-16 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-5"><SectionHead title={t("Corporate engagements", "कॉर्पोरेट दायित्व")} /></div>
        <div className="lg:col-span-7">
          <dl className="divide-y divide-navy/15 border-y border-navy/15">
            <div className="py-7">
              <dt className="font-serif text-3xl text-navy">GMA Infra Private Limited</dt>
              <dd className="mt-1 text-sm font-semibold uppercase tracking-[.14em] text-gold-deep">{t("Director", "निदेशक")}</dd>
            </div>
            <div className="py-7">
              <dt className="font-serif text-3xl text-navy">{t("Aarnaa Enterprises", "आर्ना एंटरप्राइज़ेज़")}</dt>
              <dd className="mt-1 text-sm font-semibold uppercase tracking-[.14em] text-gold-deep">{t("Chief Legal Advisor, Legal and Compliance Cell", "मुख्य विधिक सलाहकार, विधिक एवं अनुपालन प्रकोष्ठ")}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="bg-sand">
        <div className="wrap grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionHead title={t("International engagements", "अंतरराष्ट्रीय संपर्क")} />
            <div className="mt-6 space-y-4">
              <p className="para">{t("Dr. Shukla has visited the United Arab Emirates and a few other countries. The purpose was to look for opportunities to build connections and develop resources towards memoranda of understanding intended to support India's economy.",
                    "डॉ. शुक्ला ने संयुक्त अरब अमीरात और कुछ अन्य देशों की यात्राएँ की हैं। इनका उद्देश्य संपर्क बनाने और ऐसे समझौता-ज्ञापनों की दिशा में संसाधन विकसित करने के अवसर तलाशना था, जो भारत की अर्थव्यवस्था को गति दे सकें।")}</p>
              <p>{t("These are exploratory efforts.", "ये अन्वेषणात्मक प्रयास हैं।")}</p>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate">
              <Pic id="summit-banner-wide" lang={lang} sizes="(min-width:1024px) 45vw, 92vw" className="size-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
