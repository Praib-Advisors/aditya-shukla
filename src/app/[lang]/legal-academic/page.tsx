import type { Metadata } from "next";
import { getLang } from "@/lib/page";
import { pageMeta } from "@/lib/seo";
import { events, memberships } from "@/content/profile";
import { PageHeader, SectionHead } from "@/components/parts";

const title = { en: "Legal and Academic Profile", hi: "विधिक एवं शैक्षणिक परिचय" };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await getLang(params);
  return pageMeta(lang, "legal-academic", title, {
    en: "Bar registrations, editorial role, honours and academic events organised by Dr. Aditya Shukla.",
    hi: "डॉ. आदित्य शुक्ला के बार पंजीकरण, संपादकीय दायित्व, सम्मान और उनके द्वारा आयोजित शैक्षणिक कार्यक्रम।",
  });
}

export default async function Legal({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  const t = (en: string, hi: string) => (lang === "en" ? en : hi);
  return (
    <>
      <PageHeader lang={lang} title={title[lang]} accent={lang === "en" ? "Academic Profile" : "शैक्षणिक परिचय"} />

      <section className="bg-sand">
        <div className="wrap py-16 md:py-24">
          <SectionHead title={t("Professional memberships, editorial role and honours", "व्यावसायिक सदस्यताएँ, संपादकीय दायित्व और सम्मान")} />
          <dl className="mt-10 grid gap-px bg-navy/15 md:grid-cols-2 md:[&>div:last-child:nth-child(odd)]:col-span-2">
            {memberships.map((m) => (
              <div key={m.title.en} className="bg-ivory p-7"><dt className="font-serif text-2xl text-navy">{m.title[lang]}</dt><dd className="mt-2">{m.detail[lang]}</dd></div>
            ))}
          </dl>
          <p className="para mt-8">{t("His legal advisory responsibilities include the post of Chief Legal Advisor to the Legal and Compliance Cell of Aarnaa Enterprises.", "उनके विधिक सलाहकार संबंधी दायित्वों में आर्ना एंटरप्राइज़ेज़ के विधिक एवं अनुपालन प्रकोष्ठ के मुख्य विधिक सलाहकार का पद शामिल है।")}</p>
        </div>
      </section>

      <section className="wrap py-16 md:py-24">
        <SectionHead title={t("Conferences, competitions and programmes", "सम्मेलन, प्रतियोगिताएँ और कार्यक्रम")} />
        <ol className="mt-10 border-t border-navy/20">
          {events.map((e, i) => (
            <li key={i} className="grid gap-1 border-b border-navy/20 py-5 md:grid-cols-[14rem_1fr] md:gap-8">
              <p className="font-serif text-lg text-gold-deep">{e.date[lang]}</p>
              <p className="text-navy">{e.title[lang]}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
