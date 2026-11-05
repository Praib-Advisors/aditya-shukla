import type { L } from "@/lib/i18n";

export type IdealCategory = "rss" | "bjp" | "builders";

export const idealCategories: { id: IdealCategory; label: L }[] = [
  { id: "rss", label: { en: "Rashtriya Swayamsevak Sangh", hi: "राष्ट्रीय स्वयंसेवक संघ" } },
  { id: "bjp", label: { en: "Bharatiya Janata Party", hi: "भारतीय जनता पार्टी" } },
  { id: "builders", label: { en: "Nation-builders", hi: "राष्ट्र-निर्माता" } },
];

export interface Ideal {
  slug: string; // also the file name in /public/ideals
  category: IdealCategory;
  name: L;
  role: L;
  years: L;
  /** Either a short account of the person or a saying attributed to them, as on the reference page. */
  text?: L;
  quote?: L;
  credit: { author: string; license: string; url: string };
}

/**
 * Dr. Shukla's ideals, confirmed by the client for publication. The layout follows the reference page; the wording of
 * the short accounts is written fresh. Sayings are the widely quoted ones; the one widely quoted for Dr. Kalam is
 * left out because its attribution is disputed.
 */
export const ideals: Ideal[] = [
  {
    slug: "hedgewar", category: "rss",
    name: { en: "Dr. Keshav Baliram Hedgewar", hi: "डॉ. केशव बलिराम हेडगेवार" },
    role: { en: "Founder, Rashtriya Swayamsevak Sangh", hi: "राष्ट्रीय स्वयंसेवक संघ के संस्थापक" },
    years: { en: "1889–1940", hi: "1889–1940" },
    text: {
      en: "Founded the Sangh in Nagpur on Vijayadashami in 1925 and offered the shakha as a way of building disciplined people of good character.",
      hi: "1925 में विजयादशमी के दिन नागपुर में संघ की स्थापना की और शाखा को चरित्रवान, अनुशासित व्यक्तियों के निर्माण का माध्यम बनाया।",
    },
    credit: { author: "Sudhirn (cropped)", license: "CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Dr._Hedgevar.jpg" },
  },
  {
    slug: "golwalkar", category: "rss",
    name: { en: "Madhav Sadashiv Golwalkar ‘Shri Guruji’", hi: "श्री माधव सदाशिव गोलवलकर ‘श्री गुरुजी’" },
    role: { en: "Second Sarsanghchalak of the Sangh (1940–1973)", hi: "संघ के द्वितीय सरसंघचालक (1940–1973)" },
    years: { en: "1906–1973", hi: "1906–1973" },
    text: {
      en: "Led the Sangh for 33 years, took its work to every part of the country and inspired many efforts in service and organisation.",
      hi: "33 वर्षों तक सरसंघचालक रहकर संघ के कार्य को देश के हर कोने तक पहुँचाया और सेवा व संगठन के अनेक कार्यों को प्रेरणा दी।",
    },
    credit: { author: "Filmindia magazine, 1949", license: "Public domain", url: "https://commons.wikimedia.org/wiki/File:M_S_Golwalkar.jpg" },
  },
  {
    slug: "nanaji-deshmukh", category: "rss",
    name: { en: "Bharat Ratna Nanaji Deshmukh", hi: "भारत रत्न नानाजी देशमुख" },
    role: { en: "Pioneer of rural development, Chitrakoot", hi: "ग्रामोदय के प्रणेता, चित्रकूट" },
    years: { en: "1916–2010", hi: "1916–2010" },
    quote: {
      en: "I live not for myself but for my own people, and my own are those who have suffered and been neglected for centuries.",
      hi: "मैं अपने लिए नहीं, अपनों के लिए हूँ; अपने वे हैं जो सदियों से पीड़ित और उपेक्षित हैं।",
    },
    credit: { author: "India Post, Government of India", license: "GODL-India", url: "https://commons.wikimedia.org/wiki/File:Nanaji_Deshmukh_2017_stamp_of_India.jpg" },
  },
  {
    slug: "atal-bihari-vajpayee", category: "bjp",
    name: { en: "Bharat Ratna Atal Bihari Vajpayee", hi: "भारत रत्न श्री अटल बिहारी वाजपेयी" },
    role: { en: "Founding president of the BJP, former Prime Minister", hi: "भाजपा के संस्थापक अध्यक्ष, पूर्व प्रधानमंत्री" },
    years: { en: "1924–2018", hi: "1924–2018" },
    quote: {
      en: "No one becomes great with a small mind, and no one stands tall with a broken spirit.",
      hi: "छोटे मन से कोई बड़ा नहीं होता, टूटे मन से कोई खड़ा नहीं होता।",
    },
    credit: { author: "Government of India", license: "GODL-India", url: "https://commons.wikimedia.org/wiki/File:Atal_Bihari_Vajpayee_(crop_2).jpg" },
  },
  {
    slug: "narendra-modi", category: "bjp",
    name: { en: "Shri Narendra Modi", hi: "श्री नरेन्द्र मोदी" },
    role: { en: "Prime Minister of India", hi: "भारत के प्रधानमंत्री" },
    years: { en: "Born 1950", hi: "जन्म 1950" },
    quote: {
      en: "Sabka Saath, Sabka Vikas, Sabka Vishwas, Sabka Prayas.",
      hi: "सबका साथ, सबका विकास, सबका विश्वास, सबका प्रयास।",
    },
    credit: { author: "Prime Minister's Office", license: "GODL-India", url: "https://commons.wikimedia.org/wiki/File:Shri_Narendra_Modi,_Prime_Minister_of_India.jpg" },
  },
  {
    slug: "yogi-adityanath", category: "bjp",
    name: { en: "Shri Yogi Adityanath", hi: "श्री योगी आदित्यनाथ" },
    role: { en: "Chief Minister of Uttar Pradesh", hi: "उत्तर प्रदेश के मुख्यमंत्री" },
    years: { en: "Born 1972", hi: "जन्म 1972" },
    text: {
      en: "Leads Uttar Pradesh with a stated commitment to good governance, security and development.",
      hi: "सुशासन, सुरक्षा और विकास के संकल्प के साथ उत्तर प्रदेश का नेतृत्व कर रहे हैं।",
    },
    credit: { author: "Government of India", license: "GODL-India", url: "https://commons.wikimedia.org/wiki/File:The_Uttar_Pradesh_Chief_Minister,_Shri_Yogi_Adityanath_in_New_Delhi_on_February_10,_2018_(cropped).jpg" },
  },
  {
    slug: "syama-prasad-mukherjee", category: "bjp",
    name: { en: "Dr. Syama Prasad Mukherjee", hi: "डॉ. श्यामा प्रसाद मुखर्जी" },
    role: { en: "Founder, Bharatiya Jana Sangh", hi: "भारतीय जनसंघ के संस्थापक" },
    years: { en: "1901–1953", hi: "1901–1953" },
    quote: {
      en: "One country cannot have two constitutions, two heads of state and two flags.",
      hi: "एक देश में दो विधान, दो प्रधान और दो निशान नहीं चलेंगे।",
    },
    credit: { author: "Portrait, via Wikimedia Commons", license: "Public domain", url: "https://commons.wikimedia.org/wiki/Category:Syama_Prasad_Mukherjee" },
  },
  {
    slug: "deendayal-upadhyaya", category: "bjp",
    name: { en: "Pandit Deendayal Upadhyaya", hi: "पंडित दीनदयाल उपाध्याय" },
    role: { en: "Originator of Integral Humanism, leader of the Bharatiya Jana Sangh", hi: "एकात्म मानववाद के प्रणेता, भारतीय जनसंघ के नेता" },
    years: { en: "1916–1968", hi: "1916–1968" },
    text: {
      en: "Gave the country the idea of Integral Humanism and of Antyodaya: that development is measured by the uplift of the last person in society.",
      hi: "एकात्म मानववाद और अंत्योदय का विचार दिया: विकास की कसौटी समाज की अंतिम पंक्ति के व्यक्ति का उत्थान है।",
    },
    credit: { author: "Portrait, via Wikimedia Commons", license: "Public domain", url: "https://commons.wikimedia.org/wiki/Category:Deendayal_Upadhyaya" },
  },
  {
    slug: "swami-vivekananda", category: "builders",
    name: { en: "Swami Vivekananda", hi: "स्वामी विवेकानंद" },
    role: { en: "Inspiration for the young, voice of Vedanta", hi: "युवाओं के प्रेरणास्रोत, वेदांत के प्रवक्ता" },
    years: { en: "1863–1902", hi: "1863–1902" },
    quote: {
      en: "Arise, awake, and stop not until the goal is reached.",
      hi: "उठो, जागो और तब तक मत रुको जब तक लक्ष्य प्राप्त न हो जाए।",
    },
    credit: { author: "Photograph, Chicago, September 1893, via Wikimedia Commons", license: "Public domain", url: "https://commons.wikimedia.org/wiki/File:Swami_Vivekananda-1893-09-signed.jpg" },
  },
  {
    slug: "apj-abdul-kalam", category: "builders",
    name: { en: "Bharat Ratna Dr. A. P. J. Abdul Kalam", hi: "भारत रत्न डॉ. ए. पी. जे. अब्दुल कलाम" },
    role: { en: "‘Missile Man’, 11th President of India", hi: "‘मिसाइल मैन’, भारत के 11वें राष्ट्रपति" },
    years: { en: "1931–2015", hi: "1931–2015" },
    text: {
      en: "A scientist known as the ‘Missile Man’, who went on to serve as the eleventh President of India.",
      hi: "‘मिसाइल मैन’ के नाम से जाने जाने वाले वैज्ञानिक, जो आगे चलकर भारत के ग्यारहवें राष्ट्रपति बने।",
    },
    credit: { author: "Government of India", license: "GODL-India", url: "https://commons.wikimedia.org/wiki/File:A._P._J._Abdul_Kalam_(cropped)_3x4.jpg" },
  },
];

/** The ideal featured at the top of the Ideals page, with a large portrait and a fixed saying. Not repeated in the grid below. */
export const featuredIdeal = { by: "atal-bihari-vajpayee" };
