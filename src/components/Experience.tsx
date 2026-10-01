"use client";

import { useCallback, useRef, useState } from "react";
import { media } from "@/content/media";
import { type Locale, dictionaries } from "@/i18n/dictionaries";
import { useBackgroundMusic } from "@/hooks/useBackgroundMusic";
import { CloverField } from "@/components/art/CloverField";
import { LanguageToggle } from "@/components/controls/LanguageToggle";
import { ThemeToggle } from "@/components/controls/ThemeToggle";
import { Gate } from "@/components/stages/Gate";
import { IntroVideo } from "@/components/stages/IntroVideo";
import { MainStage } from "@/components/stages/MainStage";

type Stage = "gate" | "intro" | "main";

/**
 * Luồng chính: Màn chờ → (bấm) → Video chào mừng → (hết / Bỏ qua) → Giao diện chính.
 * Ngôn ngữ đổi phía client + cập nhật URL bằng replaceState, nên chuyển ngôn ngữ
 * giữa chừng không bắt người xem xem lại từ đầu.
 */
export function Experience({ initialLang }: { initialLang: Locale }) {
  const [lang, setLang] = useState<Locale>(initialLang);
  const [stage, setStage] = useState<Stage>("gate");
  const [videoMuted, setVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const music = useBackgroundMusic(media.music);
  const { start: startMusic } = music;
  const t = dictionaries[lang];

  const changeLang = useCallback((next: Locale) => {
    setLang(next);
    document.documentElement.lang = next;
    document.title = dictionaries[next].meta.title;
    window.history.replaceState(null, "", "/" + next);
  }, []);

  const goMain = useCallback(() => {
    videoRef.current?.pause();
    setStage("main");
    startMusic();
  }, [startMusic]);

  const enter = () => {
    // Cả hai lệnh dưới đây phải chạy đồng bộ trong cú click (chính sách autoplay của trình duyệt)
    music.unlock();
    const video = videoRef.current;
    if (video?.error) {
      // Video hỏng / không tải được từ trước → vào thẳng giao diện chính
      goMain();
      return;
    }
    if (video) {
      video.muted = false;
      video.play().catch(() => {
        // Trình duyệt vẫn chặn phát có tiếng → phát không tiếng, người xem tự bật lại
        video.muted = true;
        setVideoMuted(true);
        video.play().catch(goMain);
      });
    }
    setStage("intro");
  };

  const toggleVideoMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setVideoMuted(video.muted);
  };

  return (
    <>
      <CloverField />

      {stage !== "main" && (
        <div className="fixed right-4 top-4 z-50 flex items-center gap-2 sm:right-6 sm:top-6">
          <ThemeToggle labels={t.controls} />
          <LanguageToggle lang={lang} label={t.controls.language} onChange={changeLang} />
        </div>
      )}

      {stage === "gate" && <Gate t={t} onEnter={enter} />}

      {stage !== "main" && (
        <IntroVideo
          ref={videoRef}
          t={t}
          active={stage === "intro"}
          muted={videoMuted}
          onToggleMute={toggleVideoMute}
          onFinish={goMain}
        />
      )}

      {stage === "main" && <MainStage lang={lang} t={t} music={music} onChangeLang={changeLang} />}
    </>
  );
}
