import { cookies } from "next/headers";
import id from "@/locales/id.json";
import en from "@/locales/en.json";
import { supportedLocales, LOCALE_COOKIE, type LocaleCode, type Locale } from "./locales";

export * from "./locales";

export type Dict = typeof id;

/** Explicit preference cookie wins; otherwise default to English (en) for international showcase and SEO. */
export async function getLocale(): Promise<Locale> {
  const fromCookie = (await cookies()).get(LOCALE_COOKIE)?.value as LocaleCode | undefined;
  if (fromCookie && supportedLocales.some((l) => l.code === fromCookie)) {
    return fromCookie;
  }
  return "en";
}

export async function getDict(): Promise<{ locale: Locale; t: Dict }> {
  const locale = await getLocale();
  const t = locale === "id" ? id : en;
  return { locale, t };
}
