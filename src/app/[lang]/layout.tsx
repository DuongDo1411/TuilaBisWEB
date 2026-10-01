import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { dictionaries, hasLocale, locales } from "@/i18n/dictionaries";
import { fontVariables } from "../fonts";
import { ThemeInit } from "@/components/ThemeInit";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = dictionaries[lang];
  return { title: meta.title, description: meta.description };
}

export const viewport: Viewport = {
  colorScheme: "light dark",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={fontVariables} data-theme="light" suppressHydrationWarning>
      <head><ThemeInit /></head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
