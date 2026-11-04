import type { Metadata } from "next";
import { href, type Lang, type L } from "./i18n";
import { site, siteUrl } from "./site";

export function pageMeta(lang: Lang, slug: string, title: L, description: L): Metadata {
  const url = `${siteUrl}${href(lang, slug)}`;
  return {
    title: slug === "" ? { absolute: `${site.name[lang]} | ${site.role[lang]}` } : title[lang],
    description: description[lang],
    alternates: { canonical: url },
    openGraph: {
      type: "profile",
      url,
      siteName: site.name[lang],
      title: slug === "" ? `${site.name[lang]} | ${site.role[lang]}` : `${title[lang]} | ${site.name[lang]}`,
      description: description[lang],
      locale: "en_IN",
      images: [{ url: `${siteUrl}/photos/portrait-flags.jpg`, width: 683, height: 1024, alt: site.name[lang] }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export function personLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name[lang],
    url: `${siteUrl}${href(lang)}`,
    image: `${siteUrl}/photos/portrait-flags.jpg`,
    jobTitle: "President",
    worksFor: { "@type": "Organization", name: "NAREDCO Uttar Pradesh" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Amity University, Gurugram" },
    knowsLanguage: ["hi", "en", "fr"],
  };
}

export function websiteLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name[lang],
    url: `${siteUrl}${href(lang)}`,
    inLanguage: "en-IN",
  };
}
