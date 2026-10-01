"use client";

import { SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

export function MusicToggle({
  playing,
  label,
  volume,
  volumeLabel,
  onToggle,
  onVolumeChange,
}: {
  playing: boolean;
  label: string;
  volume: number;
  volumeLabel: string;
  onToggle: () => void;
  onVolumeChange: (value: number) => void;
}) {
  const Icon = playing ? SpeakerHigh : SpeakerSlash;
  const percent = Math.round(volume * 100);
  return (
    <div className="flex items-center gap-2">
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
      <div className="clay flex h-12 items-center gap-1 rounded-full px-2">
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={percent}
          onChange={(event) => onVolumeChange(Number(event.currentTarget.value) / 100)}
          aria-label={volumeLabel}
          className="music-volume-range h-11 w-14 cursor-pointer appearance-none bg-transparent sm:w-20"
        />
        <output className="w-8 text-right text-xs font-bold tabular-nums text-fg-muted">{percent}%</output>
      </div>
    </div>
  );
}
