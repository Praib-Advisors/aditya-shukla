import type { L } from "@/lib/i18n";
import meta from "./photos.generated.json";

export type Category = "official" | "government" | "industry" | "political" | "social" | "conferences" | "portraits" | "video" | "news";

export const categoryLabel: Record<Category, L> = {
  official: { en: "Official Meetings", hi: "आधिकारिक भेंट" },
  government: { en: "Government Engagements", hi: "सरकारी कार्यक्रम" },
  industry: { en: "Industry Events", hi: "उद्योग कार्यक्रम" },
  political: { en: "Political & Organisational", hi: "राजनीतिक एवं संगठनात्मक" },
  social: { en: "Social Initiatives", hi: "सामाजिक पहल" },
  conferences: { en: "Conferences", hi: "सम्मेलन" },
  portraits: { en: "Portraits", hi: "चित्र" },
  video: { en: "Video Gallery", hi: "वीडियो" },
  news: { en: "News", hi: "समाचार" },
};

/** The order the Media page lays its sections out in. A section with no items is not shown. */
export const categoryOrder: Category[] = ["portraits", "industry", "conferences", "official", "government", "political", "social", "news", "video"];

export interface Photo {
  id: string;
  src: string;
  w: number;
  h: number;
  category: Category;
  caption: L;
  /** Only filled in where a source document states it. */
  date?: L;
}

const m = meta as Record<string, { w: number; h: number }>;
const p = (id: string, category: Category, en: string, hi: string, date?: L): Photo => ({
  id,
  src: `/photos/${id}.jpg`,
  w: m[id].w,
  h: m[id].h,
  category,
  caption: { en, hi },
  date,
});

const courtesy = ["Courtesy meeting", "शिष्टाचार भेंट"] as const;
const bouquet = ["Courtesy meeting with a floral welcome", "पुष्प-स्वागत के साथ शिष्टाचार भेंट"] as const;
const memento = ["Presenting a NAREDCO memento", "NAREDCO स्मृति-चिह्न भेंट करते हुए"] as const;
const summit = ["Real Estate & Infrastructure Investors' Summit 2026, 6th edition, organised by NAREDCO Maharashtra", "रियल एस्टेट एवं इन्फ्रास्ट्रक्चर इन्वेस्टर्स समिट 2026, छठा संस्करण, NAREDCO महाराष्ट्र द्वारा आयोजित"] as const;
const court = ["At the Supreme Court of India, in advocate's attire", "भारत के सर्वोच्च न्यायालय में, अधिवक्ता परिधान में"] as const;

export const photos: Photo[] = [
  p("naredco-official-portrait", "portraits", "Official portrait, NAREDCO Uttar Pradesh", "आधिकारिक चित्र, NAREDCO उत्तर प्रदेश"),
  p("up-real-estate-summit-2026", "industry", "UP Real Estate Summit 2026, Lucknow", "यूपी रियल एस्टेट समिट 2026, लखनऊ", { en: "21 May 2026", hi: "21 मई 2026" }),
  p("mahi-convention", "industry", "5th NAREDCO Mahi Convention and NAREDCO Real Estate Conclave, New Delhi", "5वां NAREDCO माही कन्वेंशन एवं NAREDCO रियल एस्टेट कॉन्क्लेव, नई दिल्ली"),
  p("governing-council-meeting", "industry", "NAREDCO Uttar Pradesh, 2nd Governing Council Meeting", "NAREDCO उत्तर प्रदेश, द्वितीय गवर्निंग काउंसिल बैठक", { en: "26 April 2026", hi: "26 अप्रैल 2026" }),
  p("portrait-flags", "portraits", "Portrait", "चित्र"),
  p("portrait-summit", "portraits", "At the Real Estate & Infrastructure Investors' Summit 2026", "रियल एस्टेट एवं इन्फ्रास्ट्रक्चर इन्वेस्टर्स समिट 2026 में"),
  p("supreme-court-steps", "portraits", ...court),
  p("supreme-court-robes", "portraits", ...court),
  p("supreme-court-lawn", "portraits", "Outside the Supreme Court of India", "भारत के सर्वोच्च न्यायालय के बाहर"),

  p("summit-banner-wide", "industry", ...summit),
  p("summit-with-delegate", "industry", "In conversation with a fellow delegate at the Investors' Summit 2026, NAREDCO Maharashtra", "इन्वेस्टर्स समिट 2026, NAREDCO महाराष्ट्र में एक सहभागी के साथ"),
  p("summit-lobby", "industry", "With a fellow delegate at the Investors' Summit 2026", "इन्वेस्टर्स समिट 2026 में एक सहभागी के साथ"),
  p("expo-inauguration", "industry", "At the ribbon-cutting of a trade exhibition", "एक व्यापार प्रदर्शनी के उद्घाटन के अवसर पर"),

  p("convocation", "conferences", "At a convocation ceremony for honorary degree and award recipients", "मानद उपाधि एवं पुरस्कार प्राप्तकर्ताओं के दीक्षांत समारोह में"),
  p("portrait-conference", "conferences", "At a conference venue, with a delegate badge", "एक सम्मेलन स्थल पर, प्रतिनिधि पहचान-पत्र के साथ"),

  p("memento-minister-1", "official", ...memento),
  p("memento-minister-2", "official", ...memento),
  p("memento-minister-3", "official", ...memento),
  p("memento-minister-4", "official", ...memento),
  p("meeting-bouquet-1", "official", ...bouquet),
  p("meeting-bouquet-2", "official", ...bouquet),
  p("meeting-bouquet-3", "official", ...bouquet),
  p("meeting-seated-1", "official", ...courtesy),
  p("meeting-seated-2", "official", ...courtesy),
  p("meeting-seated-3", "official", ...courtesy),
  p("meeting-group-flag", "official", ...courtesy),
  p("meeting-formal-1", "official", ...courtesy),
  p("meeting-formal-2", "official", ...courtesy),
  p("meeting-hall-1", "official", ...courtesy),
  p("meeting-couch", "official", ...courtesy),
  p("meeting-stage", "official", ...courtesy),

  p("meeting-office-flag", "government", "Meeting in a government office", "एक सरकारी कार्यालय में भेंट"),
  p("meeting-up-secretariat", "government", "Meeting at an office displaying the Uttar Pradesh Government emblem", "उत्तर प्रदेश सरकार के प्रतीक-चिह्न वाले कार्यालय में भेंट"),
  p("meeting-office-1", "government", "Meeting in an office with a state emblem", "राजकीय प्रतीक-चिह्न वाले कार्यालय में भेंट"),
  p("meeting-office-2", "government", "Meeting in a government office", "एक सरकारी कार्यालय में भेंट"),
  p("meeting-office-3", "government", "Meeting in a government office", "एक सरकारी कार्यालय में भेंट"),

  p("org-desk", "political", "Meeting in an organisational office", "एक संगठनात्मक कार्यालय में भेंट"),
  p("org-session-1", "political", "At an organisational gathering", "एक संगठनात्मक बैठक में"),
  p("org-session-2", "political", "At an organisational gathering", "एक संगठनात्मक बैठक में"),
  p("org-memento-desk", "political", "Floral welcome at a party office", "एक पार्टी कार्यालय में पुष्प-स्वागत"),
];

/** Videos: none were supplied. Add { src, poster, caption } entries here and the Video Gallery filter appears. */
export interface Video { id: string; src: string; poster: string; caption: L; date?: L }
export const videos: Video[] = [];

/**
 * Press clippings: none were supplied. Add entries (category "news", the caption is the headline and
 * publication) and the News filter appears automatically.
 */
export const news: Photo[] = [];

export const homeStrip = ["memento-minister-2", "summit-banner-wide", "supreme-court-steps", "meeting-office-flag"];
export const photoById = (id: string) => photos.find((x) => x.id === id)!;
