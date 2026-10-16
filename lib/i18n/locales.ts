export const supportedLocales = [
  { code: "en", name: "English (US)", native: "English", region: "Global" },
  { code: "id", name: "Bahasa Indonesia", native: "Bahasa Indonesia", region: "Indonesia" },
  { code: "es", name: "Español", native: "Español", region: "Spain / LatAm" },
  { code: "zh", name: "简体中文", native: "简体中文", region: "China" },
  { code: "zh-TW", name: "繁體中文", native: "繁體中文", region: "Taiwan / HK" },
  { code: "ja", name: "日本語", native: "日本語", region: "Japan" },
  { code: "ko", name: "한국어", native: "한국어", region: "Korea" },
  { code: "de", name: "Deutsch", native: "Deutsch", region: "Germany" },
  { code: "fr", name: "Français", native: "Français", region: "France" },
  { code: "ar", name: "العربية", native: "العربية", region: "MENA" },
  { code: "pt", name: "Português", native: "Português", region: "Brazil / Portugal" },
  { code: "it", name: "Italiano", native: "Italiano", region: "Italy" },
  { code: "nl", name: "Nederlands", native: "Nederlands", region: "Netherlands" },
  { code: "ru", name: "Русский", native: "Русский", region: "Eurasia" },
  { code: "tr", name: "Türkçe", native: "Türkçe", region: "Turkey" },
  { code: "vi", name: "Tiếng Việt", native: "Tiếng Việt", region: "Vietnam" },
  { code: "th", name: "ไทย", native: "ไทย", region: "Thailand" },
  { code: "ms", name: "Bahasa Melayu", native: "Bahasa Melayu", region: "Malaysia" },
  { code: "hi", name: "हिन्दी", native: "हिन्दी", region: "India" },
  { code: "sv", name: "Svenska", native: "Svenska", region: "Sweden" },
  { code: "pl", name: "Polski", native: "Polski", region: "Poland" },
  { code: "uk", name: "Українська", native: "Українська", region: "Ukraine" },
  { code: "he", name: "עברית", native: "עברית", region: "Israel" },
  { code: "da", name: "Dansk", native: "Dansk", region: "Denmark" },
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
