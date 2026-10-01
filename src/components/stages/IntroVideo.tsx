"use client";

import { type CSSProperties, type Ref, useEffect, useState } from "react";
import { FastForward, SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import { INTRO_PLACEHOLDER_SECONDS, media } from "@/content/media";
import type { Dictionary } from "@/i18n/dictionaries";
import { CloverGlyph } from "@/components/art/Glyphs";
import { cn } from "@/lib/cn";

/**
 * Video chào mừng. Phần tử <video> được mount ngay từ màn chờ (ẩn) để:
 *  1. tải trước trong lúc người xem đọc nút bấm,
 *  2. Experience gọi video.play() đồng bộ trong cú click (bắt buộc với iOS Safari).
 * Kết thúc / Bỏ qua / Lỗi tải → onFinish() chuyển sang giao diện chính.
 * Chưa có file video (media.introVideo = null) → hiện khung tạm đếm ngược.
 */
export function IntroVideo({
  ref,
  t,
  active,
  muted,
  onToggleMute,
  onFinish,
}: {
  ref: Ref<HTMLVideoElement>;
  t: Dictionary;
  active: boolean;
  muted: boolean;
  onToggleMute: () => void;
  onFinish: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const hasVideo = Boolean(media.introVideo);

  useEffect(() => {
    if (!active || hasVideo) return;
    const timer = window.setTimeout(onFinish, INTRO_PLACEHOLDER_SECONDS * 1000);
    return () => window.clearTimeout(timer);
  }, [active, hasVideo, onFinish]);

  return (
    <section
      aria-label={t.intro.label}
      className={cn(
        "fixed inset-0 z-40 flex-col items-center justify-center gap-5 px-4 py-20",
        active ? "motion-stage-in flex" : "hidden",
      )}
    >
      <div className="clay w-full max-w-4xl rounded-panel p-2 sm:p-3">
        {hasVideo ? (
          <video
            ref={ref}
            src={media.introVideo ?? undefined}
            poster={media.introPoster ?? undefined}
            preload="auto"
            playsInline
            onEnded={onFinish}
            // Video được tải từ màn chờ: lỗi xảy ra lúc đó không được bỏ qua màn chờ.
            // Experience tự kiểm tra video.error khi người xem bấm nút.
            onError={() => {
              if (active) onFinish();
            }}
            onTimeUpdate={(e) => {
              const v = e.currentTarget;
              if (v.duration) setProgress(v.currentTime / v.duration);
            }}
            className="aspect-video w-full rounded-2xl bg-[var(--media-backdrop)] object-contain"
          >
            {media.introCaptions && (
              <track kind="subtitles" src={media.introCaptions} srcLang="vi" label="Tiếng Việt" default />
            )}
          </video>
        ) : (
          <div className="grid aspect-video w-full place-items-center rounded-2xl bg-surface px-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <CloverGlyph className="motion-bob size-20 text-primary sm:size-24" />
              <p className="font-display text-2xl font-bold sm:text-3xl">{t.intro.placeholderTitle}</p>
              <p className="text-sm text-fg-muted">{t.intro.placeholderNote}</p>
            </div>
          </div>
        )}
      </div>

      <div
        role="progressbar"
        aria-label={t.intro.progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={hasVideo ? Math.round(progress * 100) : undefined}
        className="h-2.5 w-full max-w-4xl overflow-hidden rounded-full bg-surface-raised ring-2 ring-line"
      >
        {hasVideo ? (
          <div
            className="h-full origin-left rounded-full bg-gradient-to-r from-primary-soft to-primary transition-transform duration-300 ease-linear"
            style={{ transform: "scaleX(" + progress + ")" }}
          />
        ) : (
          active && (
            <div
              className="motion-countdown h-full rounded-full bg-gradient-to-r from-primary-soft to-primary"
              style={{ "--countdown": INTRO_PLACEHOLDER_SECONDS + "s" } as CSSProperties}
            />
          )
        )}
      </div>

      <div className="flex items-center gap-3">
        {hasVideo && (
          <button
            type="button"
            aria-pressed={muted}
            aria-label={t.intro.mute}
            onClick={onToggleMute}
            className="clay-button grid size-12 cursor-pointer place-items-center rounded-full bg-surface-raised text-fg hover:text-primary-strong"
          >
            {muted ? (
              <SpeakerSlash aria-hidden="true" className="size-5" />
            ) : (
              <SpeakerHigh aria-hidden="true" weight="fill" className="size-5" />
            )}
          </button>
        )}
        <button
          type="button"
          onClick={onFinish}
          className="clay-button inline-flex min-h-12 cursor-pointer items-center gap-2 rounded-full bg-surface-raised px-6 font-display text-lg font-bold text-fg hover:text-primary-strong"
        >
          {t.intro.skip}
          <FastForward aria-hidden="true" weight="fill" className="size-5" />
        </button>
      </div>
    </section>
  );
}
