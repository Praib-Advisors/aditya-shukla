import type { L } from "./i18n";

/** Set SITE_URL in the deployment environment; the fallback is only for local development. */
export const siteUrl = (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export const site = {
  email: "dradityashuklaofficial@gmail.com",
  name: { en: "Dr. Aditya Shukla", hi: "डॉ. आदित्य शुक्ला" } as L,
  role: { en: "President, NAREDCO Uttar Pradesh", hi: "अध्यक्ष, NAREDCO उत्तर प्रदेश" } as L,
  tag: { en: "Official Website", hi: "आधिकारिक वेबसाइट" } as L,
  /** Official profiles supplied by the client. */
  socials: [
    { id: "facebook", label: "Facebook", handle: "DrAdityaShuklaOfficial", href: "https://www.facebook.com/DrAdityaShuklaOfficial" },
    { id: "x", label: "X", handle: "@Dr_AdityaShukla", href: "https://x.com/Dr_AdityaShukla" },
    { id: "instagram", label: "Instagram", handle: "@dr_aditya_shukla", href: "https://www.instagram.com/dr_aditya_shukla/" },
  ] as const,
  facebookPage: "https://www.facebook.com/DrAdityaShuklaOfficial",
  instagramProfile: "https://www.instagram.com/dr_aditya_shukla/",
  /**
   * Facebook's page plugin shows only the page header for a profile that is in professional mode (the "Follow"
   * button instead of "Like"), so the posts do not appear. Paste the address of each post to show (open the post, copy
   * the link from the address bar or from Share > Copy link) and the home page shows them as a scrolling list instead.
   */
  facebookPosts: [] as string[],
  /**
   * Feeds that update on their own. Create a widget for each network at a service such as Elfsight, SociableKIT or
   * Behold, then copy the two parts of its embed code here: the `<script src="...">` address, and the class of the
   * `<div>` (plus any data-attribute on it). A widget set here replaces the plugin or post list for that network.
   * Elfsight: script "https://elfsightcdn.com/platform.js", className "elfsight-app-<id>".
   * SociableKIT: script "https://widgets.sociablekit.com/<widget>/widget.js", className "sk-ww-<widget>",
   * attrs { "data-embed-id": "<id>" }.
   */
  widgets: {} as Partial<Record<"facebook" | "instagram" | "linkedin", { script: string; className: string; attrs?: Record<string, string> }>>,
  /**
   * LinkedIn gives no feed plugin, only single posts. Fill these in to show Dr. Shukla's own LinkedIn on the home
   * page: the profile address, and the embed address of each post (LinkedIn > post > ... > Embed this post, the
   * src="" of the iframe). Until then the card shows the NAREDCO Uttar Pradesh page instead.
   */
  linkedinProfile: "" as string,
  linkedinPosts: [] as string[],
};
