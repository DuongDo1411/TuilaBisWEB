"use client";

import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

export function MusicToggle({
  playing,
  label,
  onToggle,
}: {
  playing: boolean;
  label: string;
  onToggle: () => void;
}) {
  const Icon = playing ? SpeakerHigh : SpeakerSlash;
  return (
    <button
      type="button"
      aria-pressed={playing}
      aria-label={label}
      title={label}
      onClick={onToggle}
      className={cn(
        "clay-button grid size-12 shrink-0 cursor-pointer place-items-center rounded-full",
        playing ? "bg-accent-soft text-accent-strong" : "bg-surface-raised text-fg-muted hover:text-fg",
      )}
    >
      <Icon aria-hidden="true" weight={playing ? "fill" : "bold"} className="size-5" />
    </button>
  );
}
