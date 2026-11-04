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
};
