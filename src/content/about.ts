import type { L } from "@/lib/i18n";
import type { PageSlug } from "@/lib/i18n";

/** The few facts set beside the opening paragraph of the About page. */
export const aboutFacts: { k: L; v: L }[] = [
  { k: { en: "Position", hi: "पद" },
    v: { en: "President, NAREDCO Uttar Pradesh, since 3 August 2025", hi: "अध्यक्ष, NAREDCO उत्तर प्रदेश, 3 अगस्त 2025 से" } },
  { k: { en: "Government", hi: "सरकार" },
    v: { en: "Additional Private Secretary to the Minister of State for Housing and Urban Affairs, July 2021 to June 2024", hi: "आवासन और शहरी कार्य राज्य मंत्री के अपर निजी सचिव, जुलाई 2021 से जून 2024" } },
  { k: { en: "Honour", hi: "सम्मान" },
    v: { en: "Honorary doctorate (Honoris Causa), B V University for Peace and Education", hi: "मानद उपाधि (ऑनोरिस कॉज़ा), बी वी यूनिवर्सिटी फॉर पीस एंड एजुकेशन" } },
  { k: { en: "Languages", hi: "भाषाएँ" },
    v: { en: "Hindi, English (fluent) and French", hi: "हिंदी, अंग्रेज़ी (धाराप्रवाह) और फ़्रेंच" } },
];

export interface AboutBlock {
  id: string;
  title: L;
  points: L<string[]>;
  more?: { slug: PageSlug; label: L };
}

/** The biography, one topic at a time. Every point comes from the long biography in profile.ts. */
export const aboutBlocks: AboutBlock[] = [
  {
    id: "law",
    title: { en: "Law and academics", hi: "विधि और शिक्षा-जगत" },
    points: {
      en: [
        "Grounded in law: B.A. LL.B. (Hons.) at Amity University, Gurugram, then an LL.M. at Jagannath University, Jaipur",
        "At Amity Law School he helped organise moot court competitions, international conferences and a technology entrepreneurship programme",
        "Registered with the Bar Council of Uttar Pradesh and a member of the Oudh Bar Association, High Court, Lucknow Bench",
        "On the Advisory Editorial Board of LEX REVOLUTION, a UGC-indexed law journal",
      ],
      hi: [
        "विधि में सुदृढ़ आधार: एमिटी विश्वविद्यालय, गुरुग्राम से बी.ए. एल.एल.बी. (ऑनर्स), फिर जगन्नाथ विश्वविद्यालय, जयपुर से एल.एल.एम.",
        "एमिटी लॉ स्कूल में मूट कोर्ट प्रतियोगिताओं, अंतरराष्ट्रीय सम्मेलनों और प्रौद्योगिकी उद्यमिता कार्यक्रम के आयोजन में भूमिका",
        "उत्तर प्रदेश बार काउंसिल में पंजीकृत और उच्च न्यायालय, लखनऊ पीठ की अवध बार एसोसिएशन के सदस्य",
        "यू.जी.सी.-सूचीबद्ध विधि पत्रिका LEX REVOLUTION के परामर्शदात्री संपादकीय मंडल में",
      ],
    },
    more: { slug: "legal-academic", label: { en: "Legal & academic profile", hi: "विधिक एवं शैक्षणिक परिचय" } },
  },
  {
    id: "public-life",
    title: { en: "Public life and the party", hi: "सार्वजनिक जीवन और पार्टी" },
    points: {
      en: [
        "His involvement in public life began early, with the Rashtriya Swayamsevak Sangh primary training course in 2011",
        "An active member of the Bharatiya Janata Party since 2012",
        "Since 2014 he has worked with the party as a legal specialist and political analyst",
      ],
      hi: [
        "सार्वजनिक जीवन से जुड़ाव कम उम्र में शुरू हुआ: 2011 में राष्ट्रीय स्वयंसेवक संघ का प्राथमिक शिक्षा वर्ग",
        "2012 से भारतीय जनता पार्टी के सक्रिय सदस्य",
        "2014 से पार्टी के साथ विधि विशेषज्ञ तथा राजनीतिक विश्लेषक के रूप में कार्य",
      ],
    },
  },
  {
    id: "government",
    title: { en: "Government service", hi: "सरकारी सेवा" },
    points: {
      en: [
        "Member of a Divisional Railway Consultative Committee, Ministry of Railways, 2019 to 2021, a forum where railway users put their concerns to the administration",
        "Additional Private Secretary to the Minister of State for Housing and Urban Affairs, July 2021 to June 2024",
        "The work was administrative and parliamentary: letters, notes, speeches, tour programmes and parliamentary questions",
      ],
      hi: [
        "2019 से 2021 तक रेल मंत्रालय की एक मंडल रेल उपयोगकर्ता परामर्शदात्री समिति के सदस्य, जो रेल उपयोगकर्ताओं की बातें प्रशासन तक पहुँचाने का मंच है",
        "जुलाई 2021 से जून 2024 तक आवासन और शहरी कार्य राज्य मंत्री के अपर निजी सचिव",
        "कार्य प्रशासनिक और संसदीय था: पत्र, टिप्पणियाँ, भाषण, दौरा कार्यक्रम और संसदीय प्रश्न",
      ],
    },
    more: { slug: "government-experience", label: { en: "Government experience", hi: "सरकारी अनुभव" } },
  },
  {
    id: "industry",
    title: { en: "Industry, corporate and social work", hi: "उद्योग, कॉर्पोरेट और सामाजिक कार्य" },
    points: {
      en: [
        "President of NAREDCO Uttar Pradesh, the state chapter of the National Real Estate Development Council",
        "Director of GMA Infra Private Limited and Chief Legal Advisor to the Legal and Compliance Cell of Aarnaa Enterprises",
        "Founder of Ananya Foundation, a self-funded non-profit for women's empowerment in Uttar Pradesh, West Bengal, Delhi, Maharashtra and Bengaluru",
      ],
      hi: [
        "नेशनल रियल एस्टेट डेवलपमेंट काउंसिल की प्रदेश इकाई, NAREDCO उत्तर प्रदेश के अध्यक्ष",
        "जीएमए इंफ्रा प्राइवेट लिमिटेड के निदेशक और आर्ना एंटरप्राइज़ेज़ के विधिक एवं अनुपालन प्रकोष्ठ के मुख्य विधिक सलाहकार",
        "अनन्या फाउंडेशन के संस्थापक, जो उत्तर प्रदेश, पश्चिम बंगाल, दिल्ली, महाराष्ट्र और बेंगलुरु में महिला सशक्तिकरण के लिए कार्यरत स्वविपोषित गैर-लाभकारी संस्था है",
      ],
    },
    more: { slug: "corporate-international", label: { en: "Corporate & international", hi: "कॉर्पोरेट एवं अंतरराष्ट्रीय" } },
  },
];
