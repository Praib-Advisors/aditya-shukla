import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { isLang, locales, type Lang } from "@/lib/i18n";
import { site, siteUrl } from "@/lib/site";
import { ui } from "@/content/ui";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { JsonLd } from "@/components/JsonLd";
import { personLd, websiteLd } from "@/lib/seo";

const serifLatin = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-serif-latin", display: "swap" });
const sansLatin = Inter({ subsets: ["latin"], variable: "--font-sans-latin", display: "swap" });

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export const viewport: Viewport = { themeColor: "#172b40", width: "device-width", initialScale: 1 };

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return {
    metadataBase: new URL(siteUrl),
    title: { default: `${site.name[lang]} | ${site.role[lang]}`, template: `%s | ${site.name[lang]}` },
    applicationName: site.name[lang],
    robots: { index: true, follow: true },
    formatDetection: { telephone: false },
  };
}

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;

  return (
    <html lang={lang} className={`${serifLatin.variable} ${sansLatin.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-navy">
          {ui.skip[lang]}
        </a>
        <SmoothScroll />
        <Navbar lang={lang} />
        <main id="main">{children}</main>
        <Footer lang={lang} />
        <JsonLd data={[websiteLd(lang), personLd(lang)]} />
      </body>
    </html>
  );
}
