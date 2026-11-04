import type { MetadataRoute } from "next";
import { href, locales, pageSlugs } from "@/lib/i18n";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return pageSlugs.flatMap((slug) =>
    locales.map((lang) => ({
      url: `${siteUrl}${href(lang, slug)}`,
      changeFrequency: "monthly" as const,
      priority: slug === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}${href(l, slug)}`])),
      },
    })),
  );
}
