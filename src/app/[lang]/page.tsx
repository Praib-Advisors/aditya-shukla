import Link from "next/link";
import type { Metadata } from "next";
import { href } from "@/lib/i18n";
import { getLang } from "@/lib/page";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import { ui } from "@/content/ui";
import { bioShort, governmentDuties, timeline } from "@/content/profile";
import { chapterActivity } from "@/content/naredco";
import { Pic, SectionHead, TextLink } from "@/components/parts";
import { Reveal } from "@/components/Reveal";
import { HeroSlider } from "@/components/HeroSlider";
import { StayConnected } from "@/components/StayConnected";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { LeadershipBand } from "@/components/LeadershipBand";
import { AnanyaFeature } from "@/components/AnanyaFeature";
import { Stats } from "@/components/Stats";
import { ShapeDivider } from "@/components/ShapeDivider";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await getLang(params);
  return pageMeta(lang, "", { en: "", hi: "" }, {
    en: "Official website of Dr. Aditya Shukla, President of NAREDCO Uttar Pradesh: biography, institutional responsibilities, government experience, legal profile and social initiatives.",
    hi: "डॉ. आदित्य शुक्ला, अध्यक्ष, NAREDCO उत्तर प्रदेश की आधिकारिक वेबसाइट: जीवन-परिचय, संस्थागत दायित्व, सरकारी अनुभव, विधिक परिचय और सामाजिक पहल।",
  });
}

/** Home-page gallery: five tiles that fill a four-column, three-row block with no gaps (desktop). */
const mosaic = [
  { id: "up-real-estate-summit-2026", cls: "md:row-span-3", pos: "50% 55%" },
  { id: "memento-minister-2", cls: "md:col-span-2 md:row-span-2", pos: "50% 40%" },
  { id: "supreme-court-steps", cls: "md:row-span-3", pos: "65% 70%" },
  { id: "portrait-summit", cls: "", pos: "50% 30%" },
  { id: "meeting-office-flag", cls: "", pos: "50% 40%" },
];

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  const t = (en: string, hi: string) => (lang === "en" ? en : hi);

  return (
    <>
      <h1 className="sr-only">{site.name[lang]}, {site.role[lang]}</h1>
      <HeroSlider labels={{ prev: "Previous slide", next: "Next slide", slide: "Slide", region: "Featured" }}>
        {/* Slide 1: the supplied banners. The tall one is used on phones, the wide one from tablet width up. */}
        <picture>
          <source media="(min-width: 768px)" srcSet="/hero/slide1-desktop.jpg" />
          <img
            src="/hero/slide1-mobile.jpg"
            alt={`${site.name[lang]}, ${site.role[lang]}`}
            width={1080}
            height={1920}
            fetchPriority="high"
            className="hero-in size-full object-cover object-[50%_30%] md:object-[70%_50%]"
          />
        </picture>

        {/* Slide 2: desktop only. The banner has its own line of text at the bottom, so it is anchored to the bottom edge. */}
        <div data-desktop-only className="size-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero/slide2-desktop.jpg"
            alt={t("Dr. Aditya Shukla with leaders, under the line “BJP by Birth, Dedicated to Public Service”", "नेताओं के साथ डॉ. आदित्य शुक्ला, पंक्ति “BJP by Birth, Dedicated to Public Service” के साथ")}
            width={2400}
            height={1350}
            className="size-full object-cover object-[50%_100%]"
          />
        </div>
      </HeroSlider>

      {/* About: tall portrait rising into the hero, biography set lower and to the right */}
      <section className="bg-ivory">
        <div className="wrap grid gap-y-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-x-10">
          <div className="relative lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
            <Reveal variant="mask" className="relative">
              <div className="relative aspect-[3/4] overflow-hidden bg-sand shadow-[0_30px_60px_-30px_rgba(23,43,64,.55)]">
                {/* The source frame is a wide courthouse shot with him small at the lower right; zoom onto him. */}
                <Pic id="supreme-court-steps" lang={lang} sizes="(min-width:1024px) 38vw, 92vw" className="size-full origin-[67%_78%] scale-[1.7] object-cover" position="50% 50%" />
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
            <SectionHead title={t("Law, public administration and industry", "विधि, लोक प्रशासन और उद्योग")} />
            <Reveal delay={150}><p className="lead mt-8">{bioShort[lang]}</p></Reveal>
            <dl className="mt-10 divide-y divide-navy/15 border-y border-navy/15 text-[.95rem]">
              {[
                [t("Education", "शिक्षा"), t("B.A. LL.B. (Hons.), Amity University, Gurugram; LL.M., Jagannath University, Jaipur", "बी.ए. एल.एल.बी. (ऑनर्स), एमिटी विश्वविद्यालय, गुरुग्राम; एल.एल.एम., जगन्नाथ विश्वविद्यालय, जयपुर")],
                [t("Government", "सरकार"), t("Minister of State for Housing and Urban Affairs, 2021–2024", "आवासन और शहरी कार्य राज्य मंत्री, 2021–2024")],
                [t("Industry", "उद्योग"), t("President, NAREDCO Uttar Pradesh, since 3 August 2025", "अध्यक्ष, NAREDCO उत्तर प्रदेश, 3 अगस्त 2025 से")],
              ].map(([k, v], i) => (
                <Reveal key={k} variant="right" delay={i * 110} className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-6">
                  <dt className="font-serif text-lg text-navy">{k}</dt><dd>{v}</dd>
                </Reveal>
              ))}
            </dl>
            <div className="mt-8"><TextLink lang={lang} to="about">{ui.readMore[lang]}</TextLink></div>
          </div>
        </div>
      </section>

      <ShapeDivider fill="sand" />

      {/* NAREDCO Uttar Pradesh in 2026: three posters of different widths, set at different heights */}
      <section className="bg-sand">
        <div className="wrap py-24 md:py-32">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <SectionHead title={t("NAREDCO Uttar Pradesh in 2026", "NAREDCO उत्तर प्रदेश, 2026")} />
            <TextLink lang={lang} to="leadership">{t("All chapter activity", "चैप्टर की सभी गतिविधियाँ")}</TextLink>
          </div>
          <ul className="grid items-start gap-10 md:grid-cols-12">
            {chapterActivity.map((x, i) => (
              <li key={x.photo} className={["md:col-span-5", "md:col-span-4 md:mt-20", "md:col-span-3 md:mt-8"][i]}>
                <Reveal variant="mask" delay={i * 160}>
                <div className="group relative aspect-[3/4] overflow-hidden bg-slate shadow-[0_30px_60px_-34px_rgba(23,43,64,.6)]">
                  <Pic id={x.photo} lang={lang} sizes="(min-width:768px) 40vw, 92vw" className="size-full object-cover transition duration-700 group-hover:scale-[1.05]" />
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-navy/95 via-navy/65 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-ivory">
                    {x.date && <p className="text-xs font-medium tracking-wide text-ivory/85">{x.date.en}</p>}
                    <h3 className="mt-1 text-2xl leading-tight !text-ivory">{x.title[lang]}</h3>
                  </div>
                </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ShapeDivider fill="sand" mode="hang" flip />

      {/* Leadership: full-width photograph */}
      <LeadershipBand lang={lang} title={t("Leadership and responsibilities", "नेतृत्व और दायित्व")} />

      <ShapeDivider fill="ivory" />

      {/* Professional journey: horizontal timeline */}
      <section className="bg-ivory">
        <div className="wrap py-24 md:py-32">
          <SectionHead align="center" title={t("Appointments and milestones", "नियुक्तियाँ और पड़ाव")} />
          <div className="mt-14"><JourneyTimeline lang={lang} items={timeline} /></div>
          <div className="mt-6"><TextLink lang={lang} to="professional-journey">{ui.viewAll[lang]}</TextLink></div>
        </div>
      </section>

      <ShapeDivider fill="navy" flip />

      {/* Government experience: statement above a ruled grid, no photograph */}
      <section className="pilasters bg-navy text-ivory">
        <div className="wrap py-24 md:py-32">
          <SectionHead dark size="lg" label={t("Government service", "सरकारी सेवा")} title={t("Ministry of Housing and Urban Affairs", "आवासन और शहरी कार्य मंत्रालय")} />
          <p className="mt-6 max-w-2xl text-lg text-ivory/80">
            {t("From July 2021 to June 2024 he was Additional Private Secretary to the Minister of State.", "जुलाई 2021 से जून 2024 तक वे राज्य मंत्री के अपर निजी सचिव रहे।")}
          </p>
          <ul className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {governmentDuties.slice(0, 6).map((d, i) => (
              <li key={d.title.en}>
                <Reveal delay={(i % 3) * 110} className="border-t border-gold/50 py-6">
                  <h3 className="text-xl !text-ivory">{d.title[lang]}</h3>
                  <p className="mt-2 text-sm text-ivory/70">{d.body[lang]}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          <Link href={href(lang, "government-experience")} className="btn btn-line mt-8">{ui.readMore[lang]}</Link>
        </div>
      </section>

      <ShapeDivider fill="ivory" />

      {/* Legal and academic: heading beside a ruled 2x2 */}
      <section className="wrap grid gap-12 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead title={t("Legal and academic profile", "विधिक और शैक्षणिक परिचय")} />
          <div className="mt-8"><TextLink lang={lang} to="legal-academic">{ui.readMore[lang]}</TextLink></div>
        </div>
        <ul className="grid gap-px bg-navy/15 sm:grid-cols-2 lg:col-span-7">
          {[
            [t("Education", "शिक्षा"), t("B.A. LL.B. (Hons.), Amity University, Gurugram; LL.M., Jagannath University, Jaipur", "बी.ए. एल.एल.बी. (ऑनर्स), एमिटी विश्वविद्यालय, गुरुग्राम; एल.एल.एम., जगन्नाथ विश्वविद्यालय, जयपुर")],
            [t("Bar registration", "बार पंजीकरण"), t("Bar Council of Uttar Pradesh; Oudh Bar Association, Lucknow Bench", "उत्तर प्रदेश बार काउंसिल; अवध बार एसोसिएशन, लखनऊ पीठ")],
            [t("Editorial", "संपादकीय"), t("Advisory Editorial Board, LEX REVOLUTION", "परामर्शदात्री संपादकीय मंडल, LEX REVOLUTION")],
            [t("Academic events", "शैक्षणिक आयोजन"), t("Nine conferences, competitions and programmes organised, 2016–2019", "2016–2019 के बीच नौ सम्मेलन, प्रतियोगिताएँ और कार्यक्रम आयोजित")],
          ].map(([h, b], i) => (
            <li key={h} className="bg-ivory p-6 transition duration-300 hover:bg-white hover:shadow-[0_18px_30px_-20px_rgba(23,43,64,.5)]">
              <Reveal delay={i * 110}>
                <h3 className="text-xl">{h}</h3>
                <p className="mt-2 text-[.95rem]">{b}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Social initiatives: the Ananya Foundation feature */}
      <AnanyaFeature lang={lang} link />

      {/* Corporate and international: two text columns split by a rule */}
      <section className="wrap py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-navy/20">
          <div className="md:pr-12 lg:pr-20">
            <SectionHead title={t("Corporate engagements", "कॉर्पोरेट दायित्व")} />
            <dl className="mt-8 divide-y divide-navy/15 border-y border-navy/15">
              <div className="py-4"><dt className="font-serif text-xl text-navy">{t("Director", "निदेशक")}</dt><dd>GMA Infra Private Limited</dd></div>
              <div className="py-4"><dt className="font-serif text-xl text-navy">{t("Chief Legal Advisor", "मुख्य विधिक सलाहकार")}</dt><dd>{t("Legal and Compliance Cell, Aarnaa Enterprises", "विधिक एवं अनुपालन प्रकोष्ठ, आर्ना एंटरप्राइज़ेज़")}</dd></div>
            </dl>
          </div>
          <div className="md:pl-12 lg:pl-20">
            <SectionHead title={t("International exposure", "अंतरराष्ट्रीय संपर्क")} />
            <p className="mt-8">
              {t("He has visited the UAE and a few other countries to explore institutional and economic opportunities, including the possibility of future memoranda of understanding.",
                 "उन्होंने संयुक्त अरब अमीरात और कुछ अन्य देशों की यात्राएँ संस्थागत और आर्थिक अवसरों की खोज के लिए की हैं, जिनमें भविष्य के समझौता-ज्ञापनों की संभावना भी शामिल है।")}
            </p>
            <div className="mt-6"><TextLink lang={lang} to="corporate-international">{ui.readMore[lang]}</TextLink></div>
          </div>
        </div>
      </section>

      <ShapeDivider fill="sand" flip />

      {/* Media: magazine-style gallery in each photograph's own proportions */}
      <section className="bg-sand">
        <div className="wrap py-24 md:py-32">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHead title={t("Photographic archive", "छायाचित्र संग्रह")} />
            <TextLink lang={lang} to="media">{ui.viewAll[lang]}</TextLink>
          </div>
          <div className="grid grid-cols-2 gap-3 md:auto-rows-[12rem] md:grid-cols-4">
            {mosaic.map((m, i) => (
              <Reveal key={m.id} variant="mask" delay={i * 110} className={m.cls}>
              <Link href={href(lang, "media")} aria-label={t("Open the media archive", "मीडिया संग्रह खोलें")}
                className="group relative block size-full aspect-square overflow-hidden bg-ivory md:aspect-auto">
                <Pic id={m.id} lang={lang} sizes="(min-width:768px) 30vw, 46vw" className="size-full object-cover transition duration-700 group-hover:scale-[1.06]" position={m.pos} />
                <span aria-hidden className="absolute inset-0 bg-navy/0 transition duration-500 group-hover:bg-navy/25" />
              </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ShapeDivider fill="navy" />

      <Stats lang={lang} />

      <ShapeDivider fill="ivory" flip />

      <StayConnected lang={lang} />
    </>
  );
}
