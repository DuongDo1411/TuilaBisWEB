"use client";

import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Gift, Sparkle } from "@phosphor-icons/react";
import { rarities, type Sticker } from "@/content/gacha";
import type { Dictionary, Locale } from "@/i18n/dictionaries";
import type { GachaStatus } from "@/lib/gachaCookie";
import { GachaCelebration } from "@/components/art/GachaCelebration";
import { CatPeek } from "@/components/art/Stickers";
import { Panel } from "@/components/ui/Panel";

const WINNER_INDEX = 4;
const START_INDEX = 28;
const REEL_LENGTH = 33;
const SPIN_DURATION_MS = 17500;
const IDLE_CARDS = 14;

type GachaResponse = GachaStatus & { result?: Sticker; error?: string };

function MysteryCard({ label }: { label: string }) {
  return (
    <div data-reel-card className="gacha-card relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-[3px] border-line-strong bg-surface-raised p-2 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,var(--accent-soft),transparent_78%)]" />
      <span className="relative grid size-14 place-items-center rounded-full bg-accent-soft font-display text-5xl font-extrabold leading-none text-accent-strong">?</span>
      <span className="relative text-xs font-bold text-fg-muted">{label}</span>
      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-primary to-accent-vivid" />
    </div>
  );
}

function StickerCard({ sticker }: { sticker: Sticker }) {
  const rarity = rarities.find((item) => item.id === sticker.rarity)!;
  return (
    <div
      style={{ "--rarity": rarity.color } as CSSProperties}
      className="gacha-card gacha-result-card relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-[3px] border-[var(--rarity)] bg-surface-raised p-2 text-center shadow-[0_10px_24px_-8px_var(--rarity)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,color-mix(in_oklab,var(--rarity)_15%,transparent),transparent_75%)]" />
      <Image
        src={sticker.image}
        alt=""
        width={128}
        height={128}
        sizes="128px"
        className="relative aspect-square w-full object-contain"
      />
      <span className="relative text-xs font-bold leading-tight text-fg">{sticker.name}</span>
      <span className="relative rounded-full bg-surface px-2 text-xs font-extrabold text-fg">{sticker.rarity}</span>
      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[var(--rarity)]" />
    </div>
  );
}

export function GachaStage({ t, className }: { lang: Locale; t: Dictionary; className?: string }) {
  const [status, setStatus] = useState<GachaStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [pendingResult, setPendingResult] = useState<Sticker | null>(null);
  const [shownResult, setShownResult] = useState<Sticker | null>(null);
  const [celebrating, setCelebrating] = useState(false);
  const [error, setError] = useState(false);
  const busyRef = useRef(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const refresh = useCallback(async (restoreResult = false): Promise<GachaStatus | null> => {
    try {
      const response = await fetch("/api/gacha", { cache: "no-store" });
      if (!response.ok) throw new Error("Gacha status unavailable");
      const data: GachaStatus = await response.json();
      setStatus(data);
      if (restoreResult) setShownResult(data.lastSticker);
      setError(false);
      return data;
    } catch {
      setError(true);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => { void refresh(); }, 0);
    return () => window.clearTimeout(timer);
  }, [refresh]);

  const resetAt = status?.resetAt;
  useEffect(() => {
    if (!resetAt) return;
    const milliseconds = new Date(resetAt).getTime() - Date.now();
    const timer = window.setTimeout(() => { void refresh(); }, Math.max(1000, milliseconds + 100));
    const onVisible = () => { if (!document.hidden) void refresh(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [resetAt, refresh]);

  const reveal = useCallback(() => {
    setShownResult(pendingResult);
    setPendingResult(null);
    setSpinning(false);
    setCelebrating(true);
  }, [pendingResult]);

  useEffect(() => {
    if (!spinning) return;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>("[data-reel-card]");
    if (!viewport || !track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const offsetFor = (index: number) => viewport.clientWidth / 2 - (index + 0.5) * card.offsetWidth - index * gap;
    track.style.transition = "none";
    track.style.setProperty("--reel-offset", `${offsetFor(START_INDEX)}px`);
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      track.style.visibility = "visible";
      secondFrame = requestAnimationFrame(() => {
        track.style.transition = "";
        track.style.setProperty("--reel-offset", `${offsetFor(WINNER_INDEX)}px`);
      });
    });
    const timer = window.setTimeout(reveal, SPIN_DURATION_MS + 350);
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      window.clearTimeout(timer);
    };
  }, [spinning, reveal]);

  const draw = async () => {
    if (busyRef.current || !status || (!status.unlimited && status.remaining < 1)) return;
    busyRef.current = true;
    setSubmitting(true);
    setError(false);
    try {
      const response = await fetch("/api/gacha", { method: "POST", cache: "no-store" });
      const data: GachaResponse = await response.json();
      if (response.status === 409) {
        setStatus(data);
        setShownResult(null);
        return;
      }
      if (!response.ok || !data.result) throw new Error("Gacha draw unavailable");
      setStatus(data);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setShownResult(data.result);
        setCelebrating(true);
      } else {
        setShownResult(null);
        setCelebrating(false);
        setPendingResult(data.result);
        setSpinning(true);
      }
    } catch {
      setError(true);
      // Nếu phản hồi POST bị mất sau khi máy chủ đã quay, GET sẽ phục hồi sticker đã lưu.
      const restored = await refresh(true);
      if (restored && (restored.unlimited || restored.remaining > 0)) setError(true);
    } finally {
      setSubmitting(false);
      busyRef.current = false;
    }
  };

  const returnToGacha = () => {
    setShownResult(null);
    setCelebrating(false);
  };

  const buttonDisabled = loading || submitting || spinning || !status || (!shownResult && !status.unlimited && status.remaining < 1);
  const buttonText = spinning ? t.gacha.spinning : submitting ? t.gacha.drawing : shownResult ? t.gacha.next : status && !status.unlimited && status.remaining === 0 ? t.gacha.dailyUsed : t.gacha.open;

  return (
    <Panel
      title={t.gacha.title}
      subtitle={t.gacha.subtitle}
      icon={<Gift aria-hidden="true" weight="bold" className="size-5" />}
      tone="pink"
      decoration={<CatPeek className="pointer-events-none absolute -top-[46px] right-10 w-24 sm:-top-[52px] sm:right-14 sm:w-28" />}
      className={className}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-bold text-fg-muted">
        <span>{status?.unlimited ? t.gacha.testUnlimited : t.gacha.dailyInfo}</span>
        <span className="rounded-full bg-primary-softer px-3 py-1 text-primary-strong tabular-nums">
          {t.gacha.remaining}: {status?.unlimited ? "∞" : status?.remaining ?? "–"}
        </span>
      </div>

      <div ref={viewportRef} className="relative flex min-h-48 flex-1 items-center overflow-hidden rounded-3xl border-2 border-line bg-surface py-5 lg:min-h-72">
        {shownResult && !spinning ? (
          <>
            <div className="pointer-events-none absolute left-1/2 top-0 z-10 h-6 w-1 -translate-x-1/2 rounded-full bg-accent-vivid" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-6 w-1 -translate-x-1/2 rounded-full bg-accent-vivid" />
          </>
        ) : (
          <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-1 -translate-x-1/2 rounded-full bg-accent-vivid" />
        )}
        {spinning ? (
          <div
            ref={trackRef}
            aria-hidden="true"
            className="gacha-reel-track relative z-10 flex shrink-0 gap-3"
            style={{ "--spin-duration": `${SPIN_DURATION_MS}ms` } as CSSProperties}
          >
            {Array.from({ length: REEL_LENGTH }, (_, index) => <MysteryCard key={index} label={t.gacha.mystery} />)}
          </div>
        ) : shownResult ? (
          <div className="relative z-10 mx-auto flex flex-col items-center gap-2 px-5 text-center">
            {celebrating && <p className="gacha-congrats relative z-10 font-display text-xl font-extrabold text-accent-strong">{t.gacha.congrats}</p>}
            <StickerCard sticker={shownResult} />
            <p className="font-display text-lg font-bold">{t.gacha.latest}: {shownResult.name} · {shownResult.rarity}</p>
          </div>
        ) : (
          <div aria-hidden="true" className="gacha-idle-track relative z-10 flex w-max shrink-0 gap-3">
            {Array.from({ length: IDLE_CARDS }, (_, index) => <MysteryCard key={index} label={t.gacha.mystery} />)}
          </div>
        )}
        {spinning && <div aria-hidden="true" className="gacha-spin-progress pointer-events-none absolute bottom-0 left-0 z-30 h-1.5 w-full origin-left bg-accent-vivid" style={{ "--spin-duration": `${SPIN_DURATION_MS}ms` } as CSSProperties} />}
        {shownResult && celebrating && <GachaCelebration />}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-7 bg-gradient-to-r from-surface to-transparent sm:w-12" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-7 bg-gradient-to-l from-surface to-transparent sm:w-12" />
      </div>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-fg-muted">{t.gacha.odds}</p>
        <ul className="flex flex-wrap gap-2">
          {rarities.map((rarity) => (
            <li key={rarity.id} style={{ "--rarity": rarity.color } as CSSProperties} className="flex items-center gap-2 rounded-full border-2 border-line bg-surface-raised px-3 py-1.5 text-xs font-bold">
              <span aria-hidden="true" className="size-2.5 rounded-full bg-[var(--rarity)]" />
              {rarity.id} · {rarity.chance}%
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <button
          type="button"
          disabled={buttonDisabled}
          onClick={() => { if (shownResult) returnToGacha(); else void draw(); }}
          className="clay-button inline-flex min-h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-primary-soft px-6 font-display text-xl font-bold text-on-primary disabled:cursor-not-allowed disabled:bg-surface disabled:text-fg-muted"
        >
          <Sparkle aria-hidden="true" weight="bold" className="size-5" />
          {buttonText}
        </button>
        {spinning && (
          <button type="button" onClick={reveal} className="min-h-11 w-full cursor-pointer rounded-full font-bold text-primary-strong underline underline-offset-4">
            {t.gacha.skip}
          </button>
        )}
        {status && !status.unlimited && status.remaining === 0 && <p className="text-center text-sm text-fg-muted">{t.gacha.resetAt}</p>}
        {error && (
          <div role="alert" className="flex flex-wrap items-center justify-center gap-2 text-sm text-accent-strong">
            <span>{t.gacha.error}</span>
            <button type="button" onClick={() => { void refresh(); }} className="min-h-11 cursor-pointer px-2 font-bold underline underline-offset-4">{t.gacha.retry}</button>
          </div>
        )}
        <p role="status" aria-live="polite" className="sr-only">
          {spinning ? t.gacha.spinning : shownResult ? `${t.gacha.latest}: ${shownResult.name}, ${shownResult.rarity}` : ""}
        </p>
      </div>
    </Panel>
  );
}
