"use client";

import { themeInitScript } from "@/lib/theme";

/** Inline script theo hướng dẫn preventing-flash-before-hydration của Next.js. */
export function ThemeInit() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: themeInitScript }}
    />
  );
}
