import { cookies } from "next/headers";
import id from "@/locales/id.json";
import en from "@/locales/en.json";
import es from "@/locales/es.json";
import zh from "@/locales/zh.json";
import zhTW from "@/locales/zh-TW.json";
import ja from "@/locales/ja.json";
import ko from "@/locales/ko.json";
import de from "@/locales/de.json";
import fr from "@/locales/fr.json";
import ar from "@/locales/ar.json";
import pt from "@/locales/pt.json";
import it from "@/locales/it.json";
import nl from "@/locales/nl.json";
import ru from "@/locales/ru.json";
import tr from "@/locales/tr.json";
import vi from "@/locales/vi.json";
import th from "@/locales/th.json";
import ms from "@/locales/ms.json";
import hi from "@/locales/hi.json";
import sv from "@/locales/sv.json";
import pl from "@/locales/pl.json";
import uk from "@/locales/uk.json";
import he from "@/locales/he.json";
import da from "@/locales/da.json";
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
const extra: Record<string, Partial2<Dict>> = {
  es,
  zh,
  "zh-TW": zhTW,
  ja,
  ko,
  de,
  fr,
  ar,
  pt,
  it,
  nl,
  ru,
  tr,
  vi,
  th,
  ms,
  hi,
  sv,
  pl,
  uk,
  he,
  da,
};

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
