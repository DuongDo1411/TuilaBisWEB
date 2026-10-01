"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "@/hooks/useTheme";
import type { Dictionary } from "@/i18n/dictionaries";

export function ThemeToggle({ labels }: { labels: Dictionary["controls"] }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      aria-label={labels.darkMode}
      aria-pressed={theme === "dark"}
      title={theme === "dark" ? labels.switchToLight : labels.switchToDark}
      onClick={toggleTheme}
      className="theme-toggle clay-button grid size-12 shrink-0 cursor-pointer place-items-center rounded-full bg-surface-raised text-primary-strong hover:bg-primary-softer"
    >
      <Moon aria-hidden="true" weight="bold" className="theme-moon size-5" />
      <Sun aria-hidden="true" weight="bold" className="theme-sun size-5" />
    </button>
  );
}
