import Link from "next/link";
import { href, type Lang } from "@/lib/i18n";
import { moreNav, nav, ui } from "@/content/ui";
import { site } from "@/lib/site";
import { socialIcons } from "./icons";

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="pilasters bg-navy text-ivory/75">
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
        <p className="wrap py-5 text-xs text-ivory/55">
          © {new Date().getFullYear()} {site.name[lang]}. {ui.rights[lang]}
        </p>
      </div>
    </footer>
  );
}
