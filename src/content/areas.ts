import type { L } from "@/lib/i18n";

/** The four areas of responsibility, shown on the home page and the Leadership page. */
export const leadershipAreas: { slug: string; title: L; body: L }[] = [
  { slug: "leadership", title: { en: "NAREDCO Uttar Pradesh", hi: "NAREDCO उत्तर प्रदेश" },
    body: { en: "President of the state chapter since 3 August 2025.", hi: "3 अगस्त 2025 से प्रदेश इकाई के अध्यक्ष।" } },
  { slug: "government-experience", title: { en: "Government and ministerial service", hi: "सरकार एवं मंत्रालयीन सेवा" },
    body: { en: "Additional Private Secretary to the Minister of State for Housing and Urban Affairs, July 2021 to June 2024.", hi: "आवासन और शहरी कार्य राज्य मंत्री के अपर निजी सचिव, जुलाई 2021 से जून 2024।" } },
  { slug: "legal-academic", title: { en: "Legal and corporate responsibilities", hi: "विधिक एवं कॉर्पोरेट दायित्व" },
    body: { en: "Advocate in Uttar Pradesh, Chief Legal Advisor to a compliance cell and Director of an infrastructure company.", hi: "उत्तर प्रदेश में अधिवक्ता, एक अनुपालन प्रकोष्ठ के मुख्य विधिक सलाहकार और एक इन्फ्रा कंपनी के निदेशक।" } },
  { slug: "ananya-foundation", title: { en: "Social initiatives", hi: "सामाजिक पहल" },
    body: { en: "Ananya Foundation, a non-profit working for women's empowerment.", hi: "अनन्या फाउंडेशन, महिला सशक्तिकरण के लिए कार्यरत एक गैर-लाभकारी संस्था।" } },
];
