import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { href, type Lang } from "@/lib/i18n";
import { moreNav, nav, ui } from "@/content/ui";
import { site } from "@/lib/site";
import { socialIcons } from "./icons";

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="relative isolate overflow-hidden bg-navy bg-[url(/page-hero-bg.jpg)] bg-[length:100%_100%] text-ivory/75">
      {/* The same out-of-focus backdrop as the page headers, a little darker so the small text stays easy to read. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-navy/70 via-navy/45 to-navy/75" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/70 via-navy/20 to-transparent" />
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      <div className="wrap grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-serif text-3xl text-ivory">{site.name[lang]}</p>
          <p className="mt-2 text-[.8rem] uppercase tracking-[.2em] text-gold">{site.role[lang]}</p>
          <p className="mt-6 max-w-sm text-sm">{ui.footerNote[lang]}</p>
          <a href={`mailto:${site.email}`} className="mt-4 inline-block break-all text-sm text-gold hover:underline">{site.email}</a>
          <ul className="mt-5 flex gap-2">
            {site.socials.map((s) => {
              const Icon = socialIcons[s.id];
              return (
                <li key={s.id}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label}: ${s.handle}`}
                    className="grid size-11 place-items-center border border-white/25 text-ivory transition hover:border-gold hover:text-gold">
                    <Icon className="size-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:col-span-7">
          <div>
            <ul className="space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.slug}>
                  <Link className="hover:text-gold" href={href(lang, n.slug)}>{n.label[lang]}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <ul className="space-y-2 text-sm">
              {moreNav.map((n) => (
                <li key={n.slug}>
                  <Link className="hover:text-gold" href={href(lang, n.slug)}>{n.label[lang]}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ivory/55">
            © {new Date().getFullYear()} {site.name[lang]}. {ui.rights[lang]}
          </p>
          <a
            href="https://praibadvisors.com/"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group inline-flex flex-col gap-0.5 self-start border border-white/25 px-3.5 py-2 transition hover:border-gold hover:bg-white/5 sm:self-auto"
          >
            <span className="text-[.7rem] text-gold">{lang === "en" ? "Website designed and managed by" : "वेबसाइट निर्माण एवं प्रबंधन"}</span>
            <span className="inline-flex items-center gap-1.5 font-serif text-base leading-tight text-ivory">
              PRAIB Advisors LLP
              <ArrowUpRight aria-hidden size={15} className="text-gold transition group-hover:-translate-y-px group-hover:translate-x-px" />
            </span>
            <span className="sr-only">{lang === "en" ? "(opens in a new tab)" : "(नए टैब में खुलता है)"}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
