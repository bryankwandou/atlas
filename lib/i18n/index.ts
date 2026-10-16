import { cookies } from "next/headers";
import id from "@/locales/id.json";
import en from "@/locales/en.json";
import es from "@/locales/es.json";
import zh from "@/locales/zh.json";
import ja from "@/locales/ja.json";
import ko from "@/locales/ko.json";
import de from "@/locales/de.json";
import fr from "@/locales/fr.json";
import ar from "@/locales/ar.json";
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

type Partial2<T> = { [K in keyof T]?: Partial<T[K]> };
const extra: Record<string, Partial2<Dict>> = { es, zh, ja, ko, de, fr, ar };

function merge(base: Dict, over: Partial2<Dict>): Dict {
  const out = { ...base } as Record<string, unknown>;
  for (const key of Object.keys(over)) {
    out[key] = { ...(base as Record<string, object>)[key], ...(over as Record<string, object>)[key] };
  }
  return out as Dict;
}

export async function getDict(): Promise<{ locale: Locale; t: Dict }> {
  const locale = await getLocale();
  if (locale === "id") return { locale, t: id };
  const over = extra[locale];
  return { locale, t: over ? merge(en as Dict, over) : (en as Dict) };
}
