import type { Metadata } from "next";
import Link from "next/link";
import { dictionaries } from "@/i18n/dictionaries";
import { CloverGlyph } from "@/components/art/Glyphs";
import { fontVariables } from "./fonts";
import { ThemeInit } from "@/components/ThemeInit";
import { ThemeToggle } from "@/components/controls/ThemeToggle";
import "./globals.css";

const t = dictionaries.vi.notFound;

export const metadata: Metadata = { title: "404 — TuilaBis" };

export default function GlobalNotFound() {
  return (
    <html lang="vi" className={fontVariables} data-theme="light" suppressHydrationWarning>
      <head><ThemeInit /></head>
      <body className="grid min-h-dvh place-items-center px-6 text-center">
        <div className="fixed right-4 top-4 sm:right-6 sm:top-6">
          <ThemeToggle labels={dictionaries.vi.controls} />
        </div>
        <main className="flex max-w-md flex-col items-center gap-5">
          <CloverGlyph className="motion-bob size-24 text-primary" />
          <h1 className="font-display text-3xl font-bold">{t.title}</h1>
          <p className="text-fg-muted">{t.body}</p>
          <Link
            href="/vi"
            className="clay-button inline-flex min-h-12 items-center rounded-full bg-primary-soft px-6 font-display font-bold text-on-primary"
          >
            {t.back}
          </Link>
        </main>
      </body>
    </html>
  );
}
