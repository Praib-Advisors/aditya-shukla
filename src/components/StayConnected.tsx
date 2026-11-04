import { ArrowUpRight } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { site } from "@/lib/site";
import { FacebookFeed } from "./FacebookFeed";
import { FacebookIcon, socialIcons } from "./icons";
import { chapterOffice, chapterSocials } from "@/content/naredco";

const HEIGHT = 500;

const copy = {
  title: { en: "Stay Connected", hi: "जुड़े रहें" },
  lead: {
    en: "Recent posts from Dr. Shukla's Facebook page, and his profiles on X and Instagram.",
    hi: "डॉ. शुक्ला के फ़ेसबुक पेज की हाल की पोस्ट, और X तथा इंस्टाग्राम पर उनके प्रोफ़ाइल।",
  },
  latest: { en: "Latest posts", hi: "ताज़ा पोस्ट" },
  openFb: { en: "Open the Facebook page", hi: "फ़ेसबुक पेज खोलें" },
  fbFallback: {
    en: "Posts load from Facebook. If they do not appear, open the page directly.",
    hi: "पोस्ट फ़ेसबुक से लोड होती हैं। न दिखें तो पेज सीधे खोलें।",
  },
  follow: { en: "Follow on social media", hi: "सोशल मीडिया पर जुड़ें" },
  newTab: { en: "(opens in a new tab)", hi: "(नए टैब में खुलता है)" },
};

/** Closing band of the home page: live Facebook posts on the left, the official profiles on the right. */
export function StayConnected({ lang }: { lang: Lang }) {
  return (
    <section aria-labelledby="connect-title" className="bg-ivory">
      <div className="wrap py-20 md:py-28">
        <h2 id="connect-title" className="text-[clamp(1.9rem,4vw,3rem)] leading-[1.12]">{copy.title[lang]}</h2>
        <p className="mt-4 max-w-2xl text-lg">{copy.lead[lang]}</p>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-2">
          <div>
            <div className="mb-3 flex min-h-8 flex-wrap items-center justify-between gap-3">
              <h3 className="text-2xl">{copy.latest[lang]}</h3>
              <a href={site.facebookPage} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-navy underline decoration-gold underline-offset-4">
                {copy.openFb[lang]}
                <ArrowUpRight aria-hidden size={15} />
                <span className="sr-only">{copy.newTab[lang]}</span>
              </a>
            </div>
            <div className="relative h-[500px] w-full overflow-hidden border border-navy/15 bg-white">
              {/* Sits behind the plugin, so it stays visible if Facebook does not load the timeline. */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                <span className="grid size-14 place-items-center bg-navy text-ivory"><FacebookIcon className="size-7" /></span>
                <p className="font-serif text-xl text-navy">{site.name[lang]}</p>
                <p className="max-w-xs text-sm">{copy.fbFallback[lang]}</p>
              </div>
              <FacebookFeed page={site.facebookPage} height={HEIGHT} locale={lang === "hi" ? "hi_IN" : "en_GB"} title={`Facebook: ${site.name[lang]}`} />
            </div>
          </div>

          <div>
            <div className="mb-3 flex min-h-8 items-center"><h3 className="text-2xl">{copy.follow[lang]}</h3></div>
            <ul className="border-t border-navy/20">
              {site.socials.map((s) => {
                const Icon = socialIcons[s.id];
                return (
                  <li key={s.id}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer"
                      className="group flex min-h-24 items-center gap-5 border-b border-navy/20 py-5 transition hover:bg-sand md:px-4">
                      <span className="grid size-12 shrink-0 place-items-center bg-navy text-ivory"><Icon className="size-6" /></span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-serif text-2xl text-navy">{s.label}</span>
                        <span className="block truncate text-sm">{s.handle}</span>
                      </span>
                      <ArrowUpRight aria-hidden className="shrink-0 text-gold-deep transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      <span className="sr-only">{copy.newTab[lang]}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <h3 className="mb-3 mt-10 text-2xl">{chapterOffice.name[lang]}</h3>
            <ul className="grid grid-cols-2 gap-px bg-navy/15 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {chapterSocials.map((s) => {
                const Icon = socialIcons[s.id];
                return (
                  <li key={s.id} className="bg-ivory">
                    <a href={s.href} target="_blank" rel="noopener noreferrer"
                      className="flex min-h-14 items-center justify-center gap-2 px-3 text-sm text-navy transition hover:bg-sand">
                      <Icon className="size-4" />{s.label}<span className="sr-only">{copy.newTab[lang]}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
