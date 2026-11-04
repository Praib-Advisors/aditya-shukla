import Image from "next/image";
import type { Lang } from "@/lib/i18n";
import { TextLink } from "@/components/parts";
import { Reveal } from "@/components/Reveal";
import { Parallax } from "@/components/Parallax";

/**
 * The Ananya Foundation feature: a photograph on one side, the foundation's details on a navy panel on the
 * other. Everything stated here comes from Dr. Shukla's CV and biodata: the foundation's name, that he founded
 * it, that it is a non-profit organisation and that its stated purpose is women's empowerment.
 */
export function AnanyaFeature({ lang, link = false, as: Tag = "h2" }: { lang: Lang; link?: boolean; as?: "h1" | "h2" }) {
  const t = (en: string, hi: string) => (lang === "en" ? en : hi);
  const facts = [
    { k: t("Foundation", "संस्था"), v: t("Ananya Foundation", "अनन्या फाउंडेशन") },
    { k: t("Founder", "संस्थापक"), v: t("Dr. Aditya Shukla", "डॉ. आदित्य शुक्ला") },
    { k: t("Purpose", "उद्देश्य"), v: t("Women's empowerment", "महिला सशक्तिकरण") },
    { k: t("Type", "स्वरूप"), v: t("Non-profit organisation", "गैर-लाभकारी संगठन") },
  ];

  return (
    <section className="bg-[#F7F3EC]">
      <div className="wrap py-20 md:py-28">
        <div className="grid items-center lg:grid-cols-12">
          <Reveal variant="mask" className="relative lg:col-span-6 lg:col-start-1 lg:row-start-1">
            <Parallax className="aspect-[4/3] bg-[#E8E0D2] shadow-[0_40px_70px_-40px_rgba(23,43,64,.6)] lg:aspect-auto lg:h-[36rem]">
              <Image
                src="/photos/women-empowerment.jpg"
                alt={t("A group of women seated together outdoors, smiling with their fists raised", "बाहर एक साथ बैठी महिलाओं का समूह, मुस्कुराते हुए मुट्ठियाँ उठाए")}
                fill
                sizes="(min-width:1024px) 48vw, 92vw"
                quality={85}
                className="object-cover object-[50%_40%]"
              />
            </Parallax>
          </Reveal>

          <Reveal variant="left" delay={200} className="relative z-10 -mt-8 mx-4 sm:mx-10 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:mx-0 lg:mt-0">
            <div className="border border-[#B58A43]/30 bg-[#E8E0D2] p-8 text-navy shadow-[0_40px_80px_-44px_rgba(23,43,64,.5)] sm:p-12 lg:py-14 lg:pl-20 lg:pr-14">
              <p className="font-serif text-lg italic text-[#8a6b3a]">{t("Social initiatives", "सामाजिक पहल")}</p>
              <Tag className="mt-3 text-[clamp(2.1rem,4.2vw,3.5rem)] leading-[1.08]">
                {t("Empowering Women.", "महिलाओं को सशक्त बनाना।")}<br />
                <span className="text-[#8a6b3a]">{t("Creating Opportunities.", "अवसरों का सृजन।")}</span>
              </Tag>
              <p className="mt-6 max-w-lg text-[1.02rem] leading-relaxed text-[#3f4a55]">
                {t("Ananya Foundation is a non-profit organisation founded by Dr. Aditya Shukla. Its stated purpose is the empowerment of women, and it is listed among the ventures in his CV.",
                   "अनन्या फाउंडेशन एक गैर-लाभकारी संगठन है, जिसकी स्थापना डॉ. आदित्य शुक्ला ने की। इसका घोषित उद्देश्य महिलाओं का सशक्तिकरण है और उनके सी.वी. में यह उनके उपक्रमों में सूचीबद्ध है।")}
              </p>

              <dl className="mt-9 grid border-t border-[#8a6b3a]/50 sm:grid-cols-2">
                {facts.map((f, i) => (
                  <div key={f.k} className={`border-b border-navy/15 py-5 ${i % 2 ? "sm:border-l sm:border-navy/15 sm:pl-6" : "sm:pr-6"}`}>
                    <dt className="text-[.68rem] font-medium uppercase tracking-[.22em] text-[#8a6b3a]">{f.k}</dt>
                    <dd className="mt-1.5 font-serif text-xl text-navy">{f.v}</dd>
                  </div>
                ))}
              </dl>

              {link && (
                <div className="mt-8">
                  <TextLink lang={lang} to="ananya-foundation">{t("About the foundation", "फाउंडेशन के बारे में")}</TextLink>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
