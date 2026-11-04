import { notFound } from "next/navigation";
import { isLang, type Lang } from "./i18n";

/** Resolves the [lang] route param, or 404s. */
export async function getLang(params: Promise<{ lang: string }>): Promise<Lang> {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return lang;
}
