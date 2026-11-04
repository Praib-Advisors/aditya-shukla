import type { L } from "@/lib/i18n";

/** Source: naredcouttarpradesh.in (Governance, Events, Meetings and Contact pages). Re-check there before launch; office bearers change. */
export const naredcoSite = "https://naredcouttarpradesh.in/";

export const chapterOffice = {
  name: { en: "NAREDCO Uttar Pradesh", hi: "NAREDCO उत्तर प्रदेश" } as L,
  address: "606 JB Metro Height 678/1, Besha Kanpur Road, Lucknow – 226012",
  phone: "+91 522 470 8300",
  phoneHref: "tel:+915224708300",
  emails: ["dg@naredcouttarpradesh.in", "secretariat@naredcouttarpradesh.in"],
};

export const chapterSocials = [
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/profile.php?id=61578744316164" },
  { id: "x", label: "X", href: "https://x.com/naredco_up" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/naredco_up/" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/naredcoup" },
] as const;

export const officeBearers: { group: L; people: { name: string; role: L }[] }[] = [
  {
    group: { en: "National", hi: "राष्ट्रीय" },
    people: [
      { name: "Shri Manohar Lal", role: { en: "Chief Patron; Hon'ble Minister, Ministry of Housing and Urban Affairs, Government of India", hi: "मुख्य संरक्षक; माननीय मंत्री, आवासन और शहरी कार्य मंत्रालय, भारत सरकार" } },
      { name: "Dr. Niranjan Hiranandani", role: { en: "National Chairman", hi: "राष्ट्रीय अध्यक्ष (चेयरमैन)" } },
      { name: "Shri Praveen Jain", role: { en: "National President", hi: "राष्ट्रीय अध्यक्ष (प्रेसिडेंट)" } },
    ],
  },
  {
    group: { en: "Uttar Pradesh", hi: "उत्तर प्रदेश" },
    people: [
      { name: "Dr. Virendra Kumar Tiwari", role: { en: "Chairman Emeritus", hi: "चेयरमैन एमेरिटस" } },
      { name: "Dr. Aditya Shukla", role: { en: "President", hi: "अध्यक्ष" } },
      { name: "Mr. Saurabh Singh", role: { en: "Secretary General", hi: "महासचिव" } },
      { name: "Mr. Ajay Kumar", role: { en: "Senior Vice President", hi: "वरिष्ठ उपाध्यक्ष" } },
      { name: "Dr. Ankit Srivastava", role: { en: "Vice President", hi: "उपाध्यक्ष" } },
      { name: "Dr. Ajay Pandey", role: { en: "Vice President", hi: "उपाध्यक्ष" } },
      { name: "Mr. Ghanshyam Bhatt", role: { en: "Vice President", hi: "उपाध्यक्ष" } },
      { name: "Mr. Amit Kumar Tiwari", role: { en: "Vice President", hi: "उपाध्यक्ष" } },
      { name: "Mr. Amitesh Pandey", role: { en: "Secretary", hi: "सचिव" } },
      { name: "Mr. Abhishek Ganguli", role: { en: "Secretary", hi: "सचिव" } },
      { name: "Mr. Amit Ojha", role: { en: "Joint Secretary", hi: "संयुक्त सचिव" } },
      { name: "Mr. Abhinav Chaubey", role: { en: "Joint Secretary", hi: "संयुक्त सचिव" } },
      { name: "Mr. Adarsh Bhatt", role: { en: "Treasurer", hi: "कोषाध्यक्ष" } },
    ],
  },
];

/** Chapter events and meetings that have a photograph supplied by the chapter's site. */
export const chapterActivity: { photo: string; title: L; date?: L; note: L }[] = [
  {
    photo: "up-real-estate-summit-2026",
    title: { en: "UP Real Estate Summit 2026", hi: "यूपी रियल एस्टेट समिट 2026" },
    date: { en: "21 May 2026, Lucknow", hi: "21 मई 2026, लखनऊ" },
    note: { en: "Listed among the chapter's events. The summit banner names the Indian Chamber of Commerce.", hi: "चैप्टर के कार्यक्रमों में सूचीबद्ध। समिट के बैनर पर इंडियन चैंबर ऑफ कॉमर्स का नाम है।" },
  },
  {
    photo: "governing-council-meeting",
    title: { en: "2nd Governing Council Meeting", hi: "द्वितीय गवर्निंग काउंसिल बैठक" },
    date: { en: "26 April 2026", hi: "26 अप्रैल 2026" },
    note: { en: "The backdrop reads: National Real Estate Development Council, Uttar Pradesh, under the aegis of the Ministry of Housing and Urban Affairs, Government of India.", hi: "पृष्ठभूमि पर लिखा है: नेशनल रियल एस्टेट डेवलपमेंट काउंसिल, उत्तर प्रदेश, आवासन और शहरी कार्य मंत्रालय, भारत सरकार के तत्वावधान में।" },
  },
  {
    photo: "mahi-convention",
    title: { en: "5th NAREDCO Mahi Convention", hi: "5वां NAREDCO माही कन्वेंशन" },
    note: { en: "Held with the NAREDCO Real Estate Conclave in New Delhi, according to the event banner.", hi: "कार्यक्रम के बैनर के अनुसार NAREDCO रियल एस्टेट कॉन्क्लेव के साथ नई दिल्ली में आयोजित।" },
  },
];
