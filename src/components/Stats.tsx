import { CalendarCheck, Landmark, MapPin, Scale } from "lucide-react";
import type { Lang, L } from "@/lib/i18n";
import { CountUp } from "@/components/CountUp";
import { Reveal } from "@/components/Reveal";

/**
 * Every figure here is counted from the supplied CV and biodata, nothing else. Add a figure only when a
 * document supports it.
 */
const stats: { value: number; icon: typeof Landmark; title: L; detail: L }[] = [
  {
    value: 3, icon: Landmark,
    title: { en: "Years in a Minister's office", hi: "मंत्री कार्यालय में वर्ष" },
    detail: { en: "Additional Private Secretary to the Minister of State for Housing and Urban Affairs, July 2021 to June 2024", hi: "आवासन और शहरी कार्य राज्य मंत्री के अपर निजी सचिव, जुलाई 2021 से जून 2024" },
  },
  {
    value: 4, icon: Scale,
    title: { en: "Moot court competitions", hi: "मूट कोर्ट प्रतियोगिताएँ" },
    detail: { en: "Amity National Moot Court Competitions organised, 2016 to 2019", hi: "एमिटी राष्ट्रीय मूट कोर्ट प्रतियोगिताओं का आयोजन, 2016 से 2019" },
  },
  {
    value: 9, icon: CalendarCheck,
    title: { en: "Events and programmes", hi: "आयोजन और कार्यक्रम" },
    detail: { en: "Conferences, competitions and programmes organised, 2016 to 2019", hi: "सम्मेलन, प्रतियोगिताएँ और कार्यक्रम आयोजित, 2016 से 2019" },
  },
  {
    value: 5, icon: MapPin,
    title: { en: "Regions of activity", hi: "सक्रिय क्षेत्र" },
    detail: { en: "Regions where Ananya Foundation is active", hi: "क्षेत्र जहाँ अनन्या फाउंडेशन सक्रिय है" },
  },
];

export function Stats({ lang }: { lang: Lang }) {
  return (
    <section aria-label={lang === "en" ? "In figures" : "आँकड़ों में"} className="surface-dark bg-navy text-ivory">
      <div className="wrap py-20 md:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-3 border-b border-gold/40 pb-6">
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] leading-tight !text-ivory">{lang === "en" ? "A record in figures" : "आँकड़ों में"}</h2>
        </div>

        <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title.en} delay={i * 120} className="h-full">
              <div className="group relative flex h-full flex-col border border-white/15 bg-white/[.03] p-8 transition duration-500 hover:-translate-y-1.5 hover:border-gold/70 hover:bg-white/[.06]">
                <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
                <span aria-hidden className="grid size-11 place-items-center border border-gold/60 text-gold transition group-hover:bg-gold group-hover:text-navy"><Icon size={20} strokeWidth={1.5} /></span>
                <dt className="mt-8 font-serif text-[clamp(4.5rem,8vw,6.5rem)] leading-none text-gold">
                  <CountUp to={s.value} />
                </dt>
                <dd className="mt-6 border-t border-white/15 pt-5 text-left">
                  <span className="block font-serif text-2xl leading-snug text-ivory">{s.title[lang]}</span>
                  <span className="mt-2 block text-[.9rem] leading-relaxed text-ivory/65">{s.detail[lang]}</span>
                </dd>
              </div>
              </Reveal>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
