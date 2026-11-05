import { ArrowUpRight } from "lucide-react";
import type { Lang } from "@/lib/i18n";
import { site } from "@/lib/site";
import { EmbedWidget } from "./EmbedWidget";
import { FacebookFeed } from "./FacebookFeed";
import { FacebookIcon, InstagramIcon, LinkedinIcon, socialIcons } from "./icons";
import { chapterOffice, chapterSocials } from "@/content/naredco";

const HEIGHT = 560;

const copy = {
  title: { en: "Social media updates", hi: "सोशल मीडिया अपडेट" },
  lead: {
    en: "Recent posts from Dr. Shukla's Facebook page and Instagram, with LinkedIn alongside.",
    hi: "डॉ. शुक्ला के फ़ेसबुक पेज और इंस्टाग्राम की हाल की पोस्ट, साथ में लिंक्डइन।",
  },
  latest: { en: "Latest posts", hi: "ताज़ा पोस्ट" },
  openFb: { en: "Open the Facebook page", hi: "फ़ेसबुक पेज खोलें" },
  openIg: { en: "Open Instagram", hi: "इंस्टाग्राम खोलें" },
  openLi: { en: "Open LinkedIn", hi: "लिंक्डइन खोलें" },
  fallback: {
    en: "Posts load from the platform. If they do not appear, open the profile directly.",
    hi: "पोस्ट संबंधित प्लेटफ़ॉर्म से लोड होती हैं। न दिखें तो प्रोफ़ाइल सीधे खोलें।",
  },
  chapterLi: { en: "NAREDCO Uttar Pradesh on LinkedIn", hi: "लिंक्डइन पर NAREDCO उत्तर प्रदेश" },
  followX: { en: "Follow on X", hi: "X पर जुड़ें" },
  newTab: { en: "(opens in a new tab)", hi: "(नए टैब में खुलता है)" },
};

function Card({ icon, name, lang, openLabel, href, children }: {
  icon: React.ReactNode; name: string; lang: Lang; openLabel: string; href: string; children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col">
      <div className="mb-3 flex min-h-10 items-center justify-between gap-3">
        <h3 className="flex items-center gap-3 text-2xl">
          <span className="grid size-9 place-items-center bg-navy text-ivory">{icon}</span>
          {name}
        </h3>
        <a href={href} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm font-semibold text-navy underline decoration-gold underline-offset-4">
          {openLabel}
          <ArrowUpRight aria-hidden size={15} />
          <span className="sr-only">{copy.newTab[lang]}</span>
        </a>
      </div>
      <div className="relative w-full overflow-hidden border border-navy/15 bg-white" style={{ height: HEIGHT }}>
        {children}
      </div>
    </div>
  );
}

/** Sits behind an embed, so it stays visible if the platform does not load. */
function Placeholder({ icon, name, lang }: { icon: React.ReactNode; name: string; lang: Lang }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
      <span className="grid size-14 place-items-center bg-navy text-ivory">{icon}</span>
      <p className="font-serif text-xl text-navy">{name}</p>
      <p className="max-w-xs text-sm">{copy.fallback[lang]}</p>
    </div>
  );
}

/** Closing band of the home page: the latest Facebook, Instagram and LinkedIn posts side by side, then the profiles. */
export function StayConnected({ lang }: { lang: Lang }) {
  const own = site.linkedinProfile;
  const liHref = own || chapterSocials.find((s) => s.id === "linkedin")!.href;
  const x = site.socials.find((s) => s.id === "x")!;
  return (
    <section aria-labelledby="connect-title" className="bg-ivory">
      <div className="wrap py-20 md:py-28">
        <h2 id="connect-title" className="text-[clamp(1.9rem,4vw,3rem)] leading-[1.12]">{copy.title[lang]}</h2>
        <p className="mt-4 max-w-2xl text-lg">{copy.lead[lang]}</p>

        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-x-6 gap-y-12 lg:grid-cols-3">
          <Card icon={<FacebookIcon className="size-5" />} name="Facebook" lang={lang} openLabel={copy.openFb[lang]} href={site.facebookPage}>
            <Placeholder icon={<FacebookIcon className="size-7" />} name={site.name[lang]} lang={lang} />
            {site.widgets.facebook ? (
              <div className="relative size-full overflow-y-auto bg-white" data-lenis-prevent><EmbedWidget {...site.widgets.facebook} /></div>
            ) : site.facebookPosts.length > 0 ? (
              <div className="relative size-full space-y-4 overflow-y-auto bg-white p-3" data-lenis-prevent>
                {site.facebookPosts.map((post) => (
                  <iframe
                    key={post}
                    src={`https://www.facebook.com/plugins/post.php?${new URLSearchParams({ href: post, width: "500", show_text: "true" }).toString()}`}
                    title={`Facebook: ${site.name[lang]}`}
                    loading="lazy"
                    allow="encrypted-media"
                    className="mx-auto block h-[520px] w-full max-w-[500px] border-0"
                  />
                ))}
              </div>
            ) : (
              <FacebookFeed page={site.facebookPage} height={HEIGHT} locale={lang === "hi" ? "hi_IN" : "en_GB"} title={`Facebook: ${site.name[lang]}`} />
            )}
          </Card>

          <Card icon={<InstagramIcon className="size-5" />} name="Instagram" lang={lang} openLabel={copy.openIg[lang]} href={site.instagramProfile}>
            <Placeholder icon={<InstagramIcon className="size-7" />} name="@dr_aditya_shukla" lang={lang} />
            {site.widgets.instagram ? (
              <div className="relative size-full overflow-y-auto bg-white" data-lenis-prevent><EmbedWidget {...site.widgets.instagram} /></div>
            ) : (
              <iframe
                src={`${site.instagramProfile}embed`}
                title={`Instagram: ${site.name[lang]}`}
                loading="lazy"
                scrolling="yes"
                className="relative block size-full border-0"
              />
            )}
          </Card>

          <Card icon={<LinkedinIcon className="size-5" />} name="LinkedIn" lang={lang} openLabel={copy.openLi[lang]} href={liHref}>
            {site.widgets.linkedin ? (
              <div className="relative size-full overflow-y-auto bg-white" data-lenis-prevent><EmbedWidget {...site.widgets.linkedin} /></div>
            ) : site.linkedinPosts.length > 0 ? (
              <div className="size-full space-y-4 overflow-y-auto p-3" data-lenis-prevent>
                {site.linkedinPosts.map((src) => (
                  <iframe key={src} src={src} title={`LinkedIn: ${site.name[lang]}`} loading="lazy" className="block h-[480px] w-full border-0" />
                ))}
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
                <span className="grid size-14 place-items-center bg-navy text-ivory"><LinkedinIcon className="size-7" /></span>
                <p className="font-serif text-xl text-navy">{own ? site.name[lang] : copy.chapterLi[lang]}</p>
                <a href={liHref} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
                  {copy.openLi[lang]}<span className="sr-only">{copy.newTab[lang]}</span>
                </a>
              </div>
            )}
          </Card>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-navy/15 pt-8">
          <a href={x.href} target="_blank" rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy underline decoration-gold underline-offset-4">
            <socialIcons.x className="size-4" />{copy.followX[lang]} ({x.handle})<span className="sr-only">{copy.newTab[lang]}</span>
          </a>
          <span className="text-sm text-navy/60">{chapterOffice.name[lang]}:</span>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {chapterSocials.map((s) => {
              const Icon = socialIcons[s.id];
              return (
                <li key={s.id}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-navy hover:text-gold-deep">
                    <Icon className="size-4" />{s.label}<span className="sr-only">{copy.newTab[lang]}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
