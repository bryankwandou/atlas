import { cookies, headers } from "next/headers";
import id from "@/locales/id.json";
import en from "@/locales/en.json";

export type Locale = "id" | "en";
export type Dict = typeof id;
export const LOCALE_COOKIE = "atlas_locale";

const dictionaries: Record<Locale, Dict> = { id, en };

/** Explicit preference cookie wins; otherwise default to Indonesian (id) for Indonesian B2B market. */
export async function getLocale(): Promise<Locale> {
  const fromCookie = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (fromCookie === "id" || fromCookie === "en") return fromCookie;
  return "id";
}

export async function getDict(): Promise<{ locale: Locale; t: Dict }> {
  const locale = await getLocale();
  return { locale, t: dictionaries[locale] };
}

export const pick = (value: { id: string; en: string }, locale: Locale) => value[locale];
