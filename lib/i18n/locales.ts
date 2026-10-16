export const supportedLocales = [
  { code: "en", name: "English (US)", native: "English", region: "Global" },
  { code: "id", name: "Bahasa Indonesia", native: "Bahasa Indonesia", region: "Indonesia" },
  { code: "es", name: "Español", native: "Español", region: "Spain / LatAm" },
  { code: "zh", name: "简体中文", native: "简体中文", region: "China" },
  { code: "ja", name: "日本語", native: "日本語", region: "Japan" },
  { code: "ko", name: "한국어", native: "한국어", region: "Korea" },
  { code: "de", name: "Deutsch", native: "Deutsch", region: "Germany" },
  { code: "fr", name: "Français", native: "Français", region: "France" },
  { code: "ar", name: "العربية", native: "العربية", region: "MENA" },
] as const;

export type LocaleCode = (typeof supportedLocales)[number]["code"];
export type Locale = LocaleCode;
export const LOCALE_COOKIE = "atlas_locale";

export const pick = (value: { id: string; en: string }, locale: Locale) => {
  if (locale === "id") return value.id;
  return value.en;
};

import type id from "@/locales/id.json";
export type Dict = typeof id;
