export type Lang = "en" | "hi";
export type L<T = string> = Record<Lang, T>;

/**
 * Hindi was taken off the site, so only English routes exist. The Hindi strings are still present in the
 * content files but nothing renders them; to bring Hindi back, add "hi" here and restore the language switch.
 */
export const locales: readonly Lang[] = ["en"];

export const isLang = (v: string): v is Lang => (locales as readonly string[]).includes(v);

/** Every public page, as the path segment after the language ("" is the home page). */
export const pageSlugs = [
  "",
  "about",
  "leadership",
  "ideals",
  "government-experience",
  "legal-academic",
  "ananya-foundation",
  "corporate-international",
  "media",
  "contact",
] as const;
export type PageSlug = (typeof pageSlugs)[number];

export const href = (lang: Lang, slug: PageSlug | string = "") => `/${lang}${slug ? `/${slug}` : ""}`;
