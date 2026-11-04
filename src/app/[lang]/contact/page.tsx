import type { Metadata } from "next";
import { getLang } from "@/lib/page";
import { pageMeta } from "@/lib/seo";
import { ContactForm } from "@/components/ContactForm";
import { chapterOffice, chapterSocials } from "@/content/naredco";
import { site } from "@/lib/site";
import { socialIcons } from "@/components/icons";

const title = { en: "Contact", hi: "संपर्क" };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await getLang(params);
  return pageMeta(lang, "contact", title, {
    en: "Send an institutional, media or professional enquiry to the office of Dr. Aditya Shukla, President, NAREDCO Uttar Pradesh.",
    hi: "डॉ. आदित्य शुक्ला, अध्यक्ष, NAREDCO उत्तर प्रदेश के कार्यालय को संस्थागत, मीडिया या व्यावसायिक पूछताछ भेजें।",
  });
}

export default async function Contact({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  const t = (en: string, hi: string) => (lang === "en" ? en : hi);
  const link = "text-navy underline decoration-gold underline-offset-4";
  return (
    <section className="pilasters bg-ivory">
      <div className="wrap py-20 md:py-28">
        {/* One centred column: heading, form, then the contact details in a ruled row */}
        <div className="text-center">
          <h1 className="mx-auto max-w-3xl text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[1.06]">{t("Institutional and media enquiries", "संस्थागत एवं मीडिया संबंधी पूछताछ")}</h1>
          <p className="mt-5"><a href={`mailto:${site.email}`} className={`break-all ${link}`}>{site.email}</a></p>
        </div>

        <div className="mx-auto mt-14 max-w-2xl"><ContactForm lang={lang} /></div>

        <div className="mx-auto mt-24 grid max-w-5xl gap-10 border-t border-navy/20 pt-12 text-center md:grid-cols-3">
          <div>
            <h2 className="text-xl">{t("Office of the President", "अध्यक्ष कार्यालय")}</h2>
            <p className="mt-2">{t("President, NAREDCO Uttar Pradesh", "अध्यक्ष, NAREDCO उत्तर प्रदेश")}</p>
          </div>
          <div>
            <h2 className="text-xl">{chapterOffice.name[lang]}</h2>
            <address className="mt-2 not-italic">{chapterOffice.address}</address>
            <p className="mt-2"><a href={chapterOffice.phoneHref} className={link}>{chapterOffice.phone}</a></p>
            <ul className="mt-1">
              {chapterOffice.emails.map((e) => <li key={e}><a href={`mailto:${e}`} className={`break-all ${link}`}>{e}</a></li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-xl">{t("Social media", "सोशल मीडिया")}</h2>
            <ul className="mt-2 space-y-1">
              {site.socials.map((s) => {
                const Icon = socialIcons[s.id];
                return (
                  <li key={s.id}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 text-navy hover:text-gold-deep">
                      <Icon className="size-4" />{s.label} <span className="text-sm text-body">{s.handle}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="mt-3 text-sm">{chapterOffice.name[lang]}:</p>
            <ul className="flex flex-wrap justify-center gap-x-4 text-sm">
              {chapterSocials.map((s) => (
                <li key={s.id}><a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center text-navy hover:text-gold-deep">{s.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
