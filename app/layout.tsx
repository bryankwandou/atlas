import type { Metadata } from "next";
import { getLocale, getDict } from "@/lib/i18n";
import { ThemeScript } from "@/components/ThemeScript";
import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDict();
  return {
    title: t.meta.title,
    description: t.meta.description,
    icons: [{ rel: "icon", url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><text y='20' font-size='20'>A</text></svg>" }],
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const { t } = await getDict();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          {t.nav.skip}
        </a>
        {children}
      </body>
    </html>
  );
}
