"use client";

import { Play, SpeakerHigh } from "@phosphor-icons/react";
import { profile } from "@/content/profile";
import type { Dictionary } from "@/i18n/dictionaries";
import { CloverGlyph, FlowerGlyph } from "@/components/art/Glyphs";

/**
 * Màn chờ. Cú bấm ở đây là "cú tương tác đầu tiên" mà trình duyệt yêu cầu
 * trước khi cho phát video / nhạc có tiếng.
 */
export function Gate({ t, onEnter }: { t: Dictionary; onEnter: () => void }) {
  return (
    <main className="motion-stage-in relative z-10 flex min-h-dvh flex-col items-center justify-center gap-7 px-6 py-16 text-center">
      <div className="relative size-36 sm:size-44">
        <div className="motion-breathe absolute -inset-8 rounded-full bg-[radial-gradient(circle,var(--accent)_0%,transparent_62%)] opacity-70 blur-2xl" />
        <div className="motion-bob relative size-full">
          <CloverGlyph className="size-full text-primary drop-shadow-[0_10px_14px_var(--shadow-mint)]" />
          <FlowerGlyph className="absolute -right-1 top-2 size-9 drop-shadow-[0_4px_6px_var(--shadow-pink)] sm:size-11" />
        </div>
      </div>

      <h1 className="font-display text-5xl font-extrabold leading-none tracking-tight sm:text-6xl">
        {profile.displayName}
      </h1>

      <button
        type="button"
        onClick={onEnter}
        className="clay-button inline-flex min-h-14 cursor-pointer items-center gap-3 rounded-full bg-primary-soft px-8 py-3 font-display text-xl font-bold text-on-primary sm:text-2xl"
      >
        <Play aria-hidden="true" weight="fill" className="size-5" />
        {t.gate.enter}
      </button>

      <p className="flex items-center gap-2 text-sm font-semibold text-fg-muted">
        <SpeakerHigh aria-hidden="true" weight="bold" className="size-4 shrink-0" />
        {t.gate.soundHint}
      </p>
    </main>
  );
}
