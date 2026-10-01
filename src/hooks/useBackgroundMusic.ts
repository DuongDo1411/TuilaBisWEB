"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "tuilabis:music";
const TARGET_VOLUME = 0.35;
const FADE_IN_S = 1.5;
const FADE_OUT_S = 0.4;

type WebkitWindow = Window & { webkitAudioContext?: typeof AudioContext };

function readPreference(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}

function writePreference(on: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    // Trình duyệt chặn localStorage (chế độ riêng tư...) — bỏ qua, chỉ không nhớ được lựa chọn
  }
}

/**
 * Nhạc nền phát lặp, có fade-in/fade-out.
 *
 * - `unlock()` PHẢI được gọi đồng bộ trong sự kiện click của người dùng: tạo AudioContext và
 *   "mở khóa" phần tử audio (iOS Safari chỉ cho phát âm thanh khởi tạo từ cú chạm).
 * - Âm lượng điều khiển qua Web Audio GainNode vì trên iOS `audio.volume` là chỉ-đọc.
 *   Nếu trình duyệt không có Web Audio thì lùi về `audio.volume`.
 * - Tạm dừng khi tab bị ẩn, phát tiếp khi quay lại.
 */
export function useBackgroundMusic(src: string | null) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const unlockRef = useRef<Promise<void>>(Promise.resolve());
  const pauseTimerRef = useRef<number | undefined>(undefined);
  const rafRef = useRef<number | undefined>(undefined);
  const wantsPlaybackRef = useRef(false);
  const requestRef = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  const rampTo = useCallback((value: number, seconds: number) => {
    const ctx = ctxRef.current;
    const gain = gainRef.current;
    if (ctx && gain) {
      const now = ctx.currentTime;
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(gain.gain.value, now);
      gain.gain.linearRampToValueAtTime(value, now + seconds);
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;
    if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    if (seconds <= 0) {
      audio.volume = value;
      return;
    }
    const from = audio.volume;
    const startedAt = performance.now();
    const step = (time: number) => {
      const k = Math.min(1, (time - startedAt) / (seconds * 1000));
      audio.volume = from + (value - from) * k;
      if (k < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }, []);

  const unlock = useCallback(() => {
    if (!src || audioRef.current) return;
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;
    audio.onpause = () => setPlaying(false);
    audio.onerror = () => {
      requestRef.current += 1;
      wantsPlaybackRef.current = false;
      audio.pause();
      rampTo(0, 0);
      setPlaying(false);
      setError(true);
    };

    const Ctx = window.AudioContext ?? (window as WebkitWindow).webkitAudioContext;
    if (Ctx) {
      try {
        const ctx = new Ctx();
        const gain = ctx.createGain();
        gain.gain.value = 0;
        ctx.createMediaElementSource(audio).connect(gain).connect(ctx.destination);
        ctxRef.current = ctx;
        gainRef.current = gain;
        void ctx.resume().catch(() => undefined);
      } catch {
        ctxRef.current = null;
        gainRef.current = null;
      }
    }
    if (!gainRef.current) audio.volume = 0;

    audio.muted = true;
    unlockRef.current = audio
      .play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
      })
      .catch(() => undefined)
      .finally(() => {
        audio.muted = false;
      });
  }, [src, rampTo]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    const request = ++requestRef.current;
    window.clearTimeout(pauseTimerRef.current);
    setError(false);
    // Gọi resume ngay trong cú bấm; không chờ tải file trước khi mở AudioContext.
    const resumed = ctxRef.current?.resume().catch(() => undefined);
    try {
      await resumed;
      await unlockRef.current;
      if (request !== requestRef.current || !wantsPlaybackRef.current || document.hidden) return;
      if (audio.error) audio.load();
      await audio.play();
      if (request !== requestRef.current || !wantsPlaybackRef.current || document.hidden) {
        if (!wantsPlaybackRef.current || document.hidden) audio.pause();
        return;
      }
      if (ctxRef.current && ctxRef.current.state !== "running") {
        audio.pause();
        wantsPlaybackRef.current = false;
        setError(true);
        return;
      }
      setPlaying(true);
      rampTo(TARGET_VOLUME, FADE_IN_S);
    } catch {
      if (request === requestRef.current) {
        wantsPlaybackRef.current = false;
        audio.pause();
        setPlaying(false);
        setError(true);
      }
    }
  }, [rampTo]);

  const pause = useCallback(() => {
    requestRef.current += 1;
    const audio = audioRef.current;
    if (!audio) return;
    setPlaying(false);
    rampTo(0, FADE_OUT_S);
    window.clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = window.setTimeout(() => audio.pause(), FADE_OUT_S * 1000);
  }, [rampTo]);

  /** Gọi khi vào giao diện chính — chỉ phát nếu người dùng chưa từng tắt nhạc */
  const start = useCallback(() => {
    wantsPlaybackRef.current = readPreference();
    if (wantsPlaybackRef.current && !document.hidden) void play();
  }, [play]);

  const toggle = useCallback(() => {
    if (wantsPlaybackRef.current) {
      wantsPlaybackRef.current = false;
      writePreference(false);
      setError(false);
      pause();
    } else {
      wantsPlaybackRef.current = true;
      writePreference(true);
      void play();
    }
  }, [pause, play]);

  useEffect(() => {
    const onVisibility = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) {
        requestRef.current += 1;
        window.clearTimeout(pauseTimerRef.current);
        rampTo(0, 0);
        audio.pause();
        setPlaying(false);
      } else if (wantsPlaybackRef.current) {
        void play();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [play, rampTo]);

  useEffect(
    () => () => {
      requestRef.current += 1;
      wantsPlaybackRef.current = false;
      window.clearTimeout(pauseTimerRef.current);
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
      const audio = audioRef.current;
      if (audio) {
        audio.onpause = null;
        audio.onerror = null;
        audio.pause();
      }
      audioRef.current = null;
      void ctxRef.current?.close().catch(() => undefined);
      ctxRef.current = null;
      gainRef.current = null;
    },
    [],
  );

  return { available: Boolean(src), playing, error, unlock, start, toggle };
}

export type BackgroundMusic = ReturnType<typeof useBackgroundMusic>;
