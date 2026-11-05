import type { L, PageSlug } from "@/lib/i18n";

export const nav: { slug: PageSlug; label: L }[] = [
  { slug: "", label: { en: "Home", hi: "मुखपृष्ठ" } },
  { slug: "about", label: { en: "About", hi: "परिचय" } },
  { slug: "leadership", label: { en: "Leadership", hi: "नेतृत्व" } },
  { slug: "ideals", label: { en: "Ideals", hi: "आदर्श" } },
  { slug: "ananya-foundation", label: { en: "Social Initiatives", hi: "सामाजिक पहल" } },
  { slug: "media", label: { en: "Media", hi: "मीडिया" } },
  { slug: "contact", label: { en: "Contact", hi: "संपर्क" } },
];

/** Pages that are not in the main bar but are listed in the footer and on the Leadership page. */
export const moreNav: { slug: PageSlug; label: L }[] = [
  { slug: "government-experience", label: { en: "Government Experience", hi: "सरकारी अनुभव" } },
  { slug: "legal-academic", label: { en: "Legal & Academic Profile", hi: "विधिक एवं शैक्षणिक परिचय" } },
  { slug: "corporate-international", label: { en: "Corporate & International", hi: "कॉर्पोरेट एवं अंतरराष्ट्रीय" } },
];

export const ui = {
  skip: { en: "Skip to content", hi: "मुख्य सामग्री पर जाएँ" } as L,
  menu: { en: "Menu", hi: "मेनू" } as L,
  close: { en: "Close", hi: "बंद करें" } as L,
  language: { en: "Language", hi: "भाषा" } as L,
  readMore: { en: "Read more", hi: "विस्तार से पढ़ें" } as L,
  exploreProfile: { en: "Explore Profile", hi: "परिचय देखें" } as L,
  journeyBtn: { en: "Professional Journey", hi: "व्यावसायिक यात्रा" } as L,
  viewAll: { en: "View all", hi: "सभी देखें" } as L,
  footerNote: {
    en: "Official website of Dr. Aditya Shukla, President, NAREDCO Uttar Pradesh.",
    hi: "डॉ. आदित्य शुक्ला, अध्यक्ष, NAREDCO उत्तर प्रदेश की आधिकारिक वेबसाइट।",
  } as L,
  rights: { en: "All rights reserved.", hi: "सर्वाधिकार सुरक्षित।" } as L,
  pending: { en: "Awaiting approval", hi: "अनुमोदन की प्रतीक्षा" } as L,
  sectionPages: { en: "Profile", hi: "प्रोफ़ाइल" } as L,
};
