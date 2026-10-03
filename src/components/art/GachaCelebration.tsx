"use client";

import { type CSSProperties } from "react";
import { createPortal } from "react-dom";
import type { RarityId } from "@/content/gacha";

const bursts = [
  { x: "18%", y: "24%", delay: 0 },
  { x: "80%", y: "72%", delay: 280 },
  { x: "54%", y: "35%", delay: 620 },
  { x: "20%", y: "72%", delay: 1080 },
  { x: "78%", y: "21%", delay: 1420 },
  { x: "43%", y: "12%", delay: 1780 },
  { x: "58%", y: "82%", delay: 2050 },
] as const;

const effects = {
  R: {
    burstCount: 2,
    sparksPerBurst: 8,
    confettiCount: 16,
    sparkDistance: 65,
    distanceStep: 30,
    fallDelayCycle: 5,
    fallDelayStep: 35,
    fallDurationBase: 1050,
    fallDurationStep: 90,
    colors: ["var(--rarity-blue)", "color-mix(in srgb, var(--rarity-blue) 65%, var(--surface-raised))"],
  },
  SR: {
    burstCount: 3,
    sparksPerBurst: 12,
    confettiCount: 28,
    sparkDistance: 90,
    distanceStep: 45,
    fallDelayCycle: 7,
    fallDelayStep: 55,
    fallDurationBase: 1800,
    fallDurationStep: 100,
    colors: ["var(--rarity-purple)", "var(--accent-strong)"],
  },
  SSR: {
    burstCount: 7,
    sparksPerBurst: 18,
    confettiCount: 84,
    sparkDistance: 120,
    distanceStep: 45,
    fallDelayCycle: 10,
    fallDelayStep: 75,
    fallDurationBase: 2900,
    fallDurationStep: 120,
    colors: ["var(--rarity-gold)", "var(--butter-strong)", "var(--rarity-gold)", "var(--accent-vivid)"],
  },
} as const;

/** Mỗi độ hiếm có hiệu ứng phủ toàn màn hình, tăng dần độ rực rỡ. */
export function GachaCelebration({ rarity }: { rarity: RarityId }) {
  if (typeof document === "undefined") return null;
  const effect = effects[rarity];

  return createPortal(
    <div
      aria-hidden="true"
      data-rarity={rarity}
      className="gacha-celebration pointer-events-none fixed inset-0 z-[100] overflow-hidden"
      style={{ "--celebration-color": effect.colors[0] } as CSSProperties}
    >
      <div className="gacha-celebration-flash absolute inset-0" />

      {bursts.slice(0, effect.burstCount).map((burst, burstIndex) => (
        <div
          key={burstIndex}
          className="gacha-firework absolute"
          style={{
            left: burst.x,
            top: burst.y,
            "--burst-delay": `${burst.delay}ms`,
            color: effect.colors[burstIndex % effect.colors.length],
          } as CSSProperties}
        >
          <span className="gacha-firework-ring absolute" />
          {Array.from({ length: effect.sparksPerBurst }, (_, sparkIndex) => {
            const angle = (sparkIndex * Math.PI * 2) / effect.sparksPerBurst;
            const distance = effect.sparkDistance + (sparkIndex % 3) * effect.distanceStep;
            return (
              <i
                key={sparkIndex}
                className="gacha-firework-spark absolute block"
                style={{
                  "--spark-x": `${Math.cos(angle) * distance}px`,
                  "--spark-y": `${Math.sin(angle) * distance}px`,
                  color: effect.colors[(sparkIndex + burstIndex) % effect.colors.length],
                } as CSSProperties}
              />
            );
          })}
        </div>
      ))}

      {Array.from({ length: effect.confettiCount }, (_, index) => (
        <i
          key={index}
          className="gacha-screen-confetti absolute block"
          style={{
            left: `${(index * 47 + 13) % 100}%`,
            "--fall-delay": `${(index % effect.fallDelayCycle) * effect.fallDelayStep}ms`,
            "--fall-duration": `${effect.fallDurationBase + (index % 5) * effect.fallDurationStep}ms`,
            "--fall-drift": `${((index * 29) % 120) - 60}px`,
            "--fall-spin": `${(index % 2 ? 1 : -1) * (330 + index * 9)}deg`,
            backgroundColor: effect.colors[index % effect.colors.length],
          } as CSSProperties}
        />
      ))}
    </div>,
    document.body,
  );
}
