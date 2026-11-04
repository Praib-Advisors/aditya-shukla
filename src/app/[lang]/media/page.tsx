import type { Metadata } from "next";
import { getLang } from "@/lib/page";
import { pageMeta } from "@/lib/seo";
import { categoryLabel, categoryOrder, news, photos, videos } from "@/content/media";
import { Gallery } from "@/components/Gallery";
import { PageHeader } from "@/components/parts";

const title = { en: "Media and Gallery", hi: "मीडिया एवं गैलरी" };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = await getLang(params);
  return pageMeta(lang, "media", title, {
    en: "Photographic archive of Dr. Aditya Shukla: official meetings, government engagements, industry events and conferences.",
    hi: "डॉ. आदित्य शुक्ला का छायाचित्र संग्रह: आधिकारिक भेंट, सरकारी कार्यक्रम, उद्योग कार्यक्रम और सम्मेलन।",
  });
}

export default async function Media({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await getLang(params);
  return (
    <>
      <PageHeader lang={lang} title={title[lang]} />
      <section className="wrap py-14 md:py-20">
        <Gallery lang={lang} photos={[...photos, ...news]} videos={videos} labels={categoryLabel} order={categoryOrder} allLabel={{ en: "All", hi: "सभी" }} />
      </section>
    </>
  );
}
