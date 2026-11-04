import type { Metadata } from "next";
import Link from "next/link";
import { href } from "@/lib/i18n";
import { getLang } from "@/lib/page";
import { pageMeta } from "@/lib/seo";
import { moreNav } from "@/content/ui";
import { Pic, SectionHead, TextLink } from "@/components/parts";
import { LeadershipBand } from "@/components/LeadershipBand";
import { chapterActivity, naredcoSite, officeBearers } from "@/content/naredco";

const title = { en: "Leadership and Responsibilities", hi: "नेतृत्व और दायित्व" };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await getLang(params);
  return pageMeta(lang, "leadership", title, {
    en: "The institutional, governmental, legal, corporate and social responsibilities of Dr. Aditya Shukla, President of NAREDCO Uttar Pradesh.",
    hi: "डॉ. आदित्य शुक्ला, अध्यक्ष, NAREDCO उत्तर प्रदेश के संस्थागत, सरकारी, विधिक, कॉर्पोरेट और सामाजिक दायित्व।",
  });
}

export default async function Leadership({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  const t = (en: string, hi: string) => (lang === "en" ? en : hi);

  return (
    <>
      <LeadershipBand lang={lang} as="h1" title={title[lang]} />

      {/* Institutional leadership: a statement and two columns of text */}
      <section className="wrap py-24 md:py-32">
        <SectionHead title={t("President, NAREDCO Uttar Pradesh", "अध्यक्ष, NAREDCO उत्तर प्रदेश")} />
        <div className="mt-10 gap-14 md:columns-2">
          <p>{t("Dr. Shukla has led the Uttar Pradesh chapter of NAREDCO, the National Real Estate Development Council, since 3 August 2025.", "डॉ. शुक्ला 3 अगस्त 2025 से नेशनल रियल एस्टेट डेवलपमेंट काउंसिल (NAREDCO) की उत्तर प्रदेश इकाई का नेतृत्व कर रहे हैं।")}</p>
          <p className="mt-5 md:mt-0">{t("The chapter's own website lists him as President among its State Office Bearers. Photographs in the archive show him at the UP Real Estate Summit 2026 in Lucknow, the Real Estate & Infrastructure Investors' Summit 2026 organised by NAREDCO Maharashtra, and presenting NAREDCO mementos during courtesy calls.", "चैप्टर की अपनी वेबसाइट पर उन्हें राज्य पदाधिकारियों में अध्यक्ष के रूप में सूचीबद्ध किया गया है। संग्रह के चित्रों में वे लखनऊ में यूपी रियल एस्टेट समिट 2026 में, NAREDCO महाराष्ट्र द्वारा आयोजित रियल एस्टेट एवं इन्फ्रास्ट्रक्चर इन्वेस्टर्स समिट 2026 में तथा शिष्टाचार भेंटों में NAREDCO स्मृति-चिह्न भेंट करते दिखाई देते हैं।")}</p>
        </div>
      </section>

      {/* Chapter activity: staggered posters on navy */}
      <section className="bg-navy text-ivory">
        <div className="wrap py-24 md:py-32">
          <SectionHead dark title={t("NAREDCO Uttar Pradesh in 2026", "NAREDCO उत्तर प्रदेश, 2026")} />
          <p className="mt-4 max-w-2xl text-ivory/75">
            {t("Events and meetings listed on the chapter's own website, with the photographs it publishes.", "चैप्टर की अपनी वेबसाइट पर सूचीबद्ध कार्यक्रम और बैठकें, उसी पर प्रकाशित चित्रों के साथ।")}
          </p>
          <ul className="mt-14 grid items-start gap-10 md:grid-cols-3">
            {chapterActivity.map((a, i) => (
              <li key={a.photo} className={i === 1 ? "md:mt-20" : i === 2 ? "md:mt-8" : ""}>
                <div className="relative aspect-[3/4] overflow-hidden bg-slate">
                  <Pic id={a.photo} lang={lang} sizes="(min-width:768px) 30vw, 92vw" className="size-full object-cover" />
                </div>
                <h3 className="mt-5 text-2xl !text-ivory">{a.title[lang]}</h3>
                {a.date && <p className="mt-1 text-sm text-gold">{a.date[lang]}</p>}
                <p className="mt-2 text-sm text-ivory/75">{a.note[lang]}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Government and legal: two ruled text columns, no photographs */}
      <section className="wrap py-24 md:py-32">
        <div className="grid gap-14 md:grid-cols-2 md:gap-0 md:divide-x md:divide-navy/20">
          <div className="md:pr-14">
            <p className="text-sm text-gold-deep">{t("Government", "सरकार")}</p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight">{t("Ministerial and parliamentary work", "मंत्रालयीन और संसदीय कार्य")}</h2>
            <p className="mt-5">{t("From July 2021 to June 2024 he served as Additional Private Secretary to the Minister of State for Housing and Urban Affairs, Government of India. Before that, from 2019 to 2021, he sat on a Divisional Railway Consultative Committee of the Ministry of Railways.", "जुलाई 2021 से जून 2024 तक वे भारत सरकार के आवासन और शहरी कार्य राज्य मंत्री के अपर निजी सचिव रहे। इससे पहले, 2019 से 2021 तक, वे रेल मंत्रालय की एक मंडल रेल उपयोगकर्ता परामर्शदात्री समिति के सदस्य थे।")}</p>
            <div className="mt-6"><TextLink lang={lang} to="government-experience">{t("Full details", "पूरा विवरण")}</TextLink></div>
          </div>
          <div className="md:pl-14">
            <p className="text-sm text-gold-deep">{t("Legal and corporate", "विधिक एवं कॉर्पोरेट")}</p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight">{t("Advocate, legal advisor, company director", "अधिवक्ता, विधिक सलाहकार, कंपनी निदेशक")}</h2>
            <p className="mt-5">{t("He is registered with the Bar Council of Uttar Pradesh and is a member of the Oudh Bar Association. He is Chief Legal Advisor to the Legal and Compliance Cell of Aarnaa Enterprises and a Director of GMA Infra Private Limited.", "वे उत्तर प्रदेश बार काउंसिल में पंजीकृत और अवध बार एसोसिएशन के सदस्य हैं। वे आर्ना एंटरप्राइज़ेज़ के विधिक एवं अनुपालन प्रकोष्ठ के मुख्य विधिक सलाहकार और जीएमए इंफ्रा प्राइवेट लिमिटेड के निदेशक हैं।")}</p>
            <div className="mt-6"><TextLink lang={lang} to="legal-academic">{t("Full details", "पूरा विवरण")}</TextLink></div>
          </div>
        </div>
      </section>

      <section className="bg-sand">
        <div className="wrap py-24 md:py-32">
          <SectionHead title={t("Office bearers", "पदाधिकारी")} />
          <div className="mt-10 grid gap-12 lg:grid-cols-2">
            {officeBearers.map((g) => (
              <div key={g.group.en}>
                <h3 className="text-2xl">{g.group[lang]}</h3>
                <dl className="mt-4 divide-y divide-navy/15 border-y border-navy/15">
                  {g.people.map((p) => (
                    <div key={p.name} className={`grid gap-1 py-3 sm:grid-cols-[14rem_1fr] sm:gap-6 ${p.name === "Dr. Aditya Shukla" ? "-mx-3 bg-ivory px-3" : ""}`}>
                      <dt className="font-serif text-lg text-navy">{p.name}</dt>
                      <dd className="text-[.95rem]">{p.role[lang]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm">
            {t("As listed on the Governance page of ", "जैसा कि ")}
            <a href={naredcoSite + "governance/"} target="_blank" rel="noopener noreferrer" className="underline decoration-gold underline-offset-4">naredcouttarpradesh.in</a>
            {lang === "hi" ? " के गवर्नेंस पृष्ठ पर सूचीबद्ध है।" : "."}
          </p>
        </div>
      </section>

      <section className="wrap py-24 text-center md:py-32">
        <SectionHead className="mx-auto" title="Ananya Foundation" />
        <p className="mx-auto mt-5 max-w-xl">{t("A non-profit working for women's empowerment, active across five regions of the country.", "महिला सशक्तिकरण के लिए कार्यरत एक गैर-लाभकारी संस्था, जो देश के पाँच क्षेत्रों में सक्रिय है।")}</p>
        <div className="mt-6"><TextLink lang={lang} to="ananya-foundation">{t("Full details", "पूरा विवरण")}</TextLink></div>
        <ul className="mx-auto mt-14 max-w-xl divide-y divide-navy/15 border-y border-navy/15 text-left">
          {moreNav.map((n) => (
            <li key={n.slug}><Link href={href(lang, n.slug)} className="flex min-h-14 items-center justify-between font-serif text-xl text-navy hover:text-gold-deep">{n.label[lang]}<span aria-hidden>→</span></Link></li>
          ))}
        </ul>
      </section>
    </>
  );
}
