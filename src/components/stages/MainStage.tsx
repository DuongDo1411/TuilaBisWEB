"use client";

import { profile } from "@/content/profile";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import type { BackgroundMusic } from "@/hooks/useBackgroundMusic";
import { CloverGlyph } from "@/components/art/Glyphs";
import { LanguageToggle } from "@/components/controls/LanguageToggle";
import { MusicToggle } from "@/components/controls/MusicToggle";
import { ThemeToggle } from "@/components/controls/ThemeToggle";
import { GachaStage } from "@/components/panels/GachaStage";
import { GoalBoard } from "@/components/panels/GoalBoard";
import { SocialBoard } from "@/components/panels/SocialBoard";

/**
 * Giao diện chính.
 * Thứ tự DOM = thứ tự trên điện thoại: Gacha → Social → Goal.
 *   Tablet (md):  Gacha chiếm cả hàng, Social + Goal chia đôi hàng dưới.
 *   Desktop (lg): 3 cột Goal | Gacha | Social (đảo bằng `order`).
 * Goal không chứa phần tử bấm được, nên thứ tự Tab luôn khớp với thứ tự nhìn thấy.
 */
export function MainStage({
  lang,
  t,
  music,
  onChangeLang,
}: {
  lang: Locale;
  t: Dictionary;
  music: BackgroundMusic;
  onChangeLang: (next: Locale) => void;
}) {
  return (
    <div className="motion-stage-in relative z-10 mx-auto flex min-h-dvh w-full max-w-7xl flex-col px-4 pb-12 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-3 py-4 sm:py-6">
        <div className="flex items-center gap-2.5">
          <CloverGlyph className="motion-bob size-10 text-primary" />
          <h1 className="font-display text-2xl font-extrabold sm:text-3xl">{profile.displayName}</h1>
        </div>
        <div className="ml-auto flex min-w-0 basis-full flex-wrap items-center justify-end gap-2 sm:basis-auto">
          <ThemeToggle labels={t.controls} />
          {music.available && (
            <MusicToggle
              playing={music.playing}
              label={t.controls.music}
              volume={music.volume}
              volumeLabel={t.controls.musicVolume}
              onToggle={music.toggle}
              onVolumeChange={music.setVolume}
            />
          )}
          <LanguageToggle lang={lang} label={t.controls.language} onChange={onChangeLang} />
        </div>
        {music.error && (
          <p role="status" className="basis-full text-right text-sm text-fg-muted">
            {t.controls.musicError}
          </p>
        )}
      </header>

      <main className="grid flex-1 grid-cols-1 content-start gap-5 pt-8 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)_minmax(0,1fr)]">
        <GachaStage lang={lang} t={t} className="md:col-span-2 lg:order-2 lg:col-span-1" />
        <SocialBoard lang={lang} t={t} className="lg:order-3" />
        <GoalBoard lang={lang} t={t} className="lg:order-1" />
      </main>
    </div>
  );
}
