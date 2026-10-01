"use client";

import { type Locale, localeNames, locales } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";

export function LanguageToggle({
  lang,
  label,
  onChange,
}: {
  lang: Locale;
  label: string;
  onChange: (next: Locale) => void;
}) {
  return (
    <div role="group" aria-label={label} className="clay flex rounded-full p-1">
      {locales.map((locale) => {
        const active = locale === lang;
        return (
          <button
            key={locale}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(locale)}
            className={cn(
              "min-h-11 min-w-11 cursor-pointer rounded-full px-3 font-display text-base font-bold transition-colors duration-200",
              active ? "bg-primary-soft text-on-primary" : "text-fg-muted hover:text-fg",
            )}
          >
            {/* Tên truy cập chứa chữ hiển thị (WCAG 2.5.3): "VI – Tiếng Việt" */}
            {locale.toUpperCase()}
            <span className="sr-only" lang={locale}>
              {" "}
              – {localeNames[locale]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
