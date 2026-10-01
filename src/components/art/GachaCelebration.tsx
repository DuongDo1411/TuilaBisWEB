"use client";

import { type CSSProperties } from "react";
import { createPortal } from "react-dom";

const bursts = [
  { x: "16%", y: "23%", delay: 0 },
  { x: "80%", y: "19%", delay: 360 },
  { x: "51%", y: "38%", delay: 760 },
  { x: "23%", y: "70%", delay: 1160 },
  { x: "76%", y: "67%", delay: 1500 },
  { x: "43%", y: "12%", delay: 1850 },
  { x: "58%", y: "81%", delay: 2100 },
] as const;

const colors = [
  "var(--accent-vivid)",
  "var(--butter-strong)",
  "var(--primary)",
  "var(--rarity-purple)",
] as const;

/** Portal giữ pháo hoa phủ cả màn hình, không bị khung gacha cắt mất. */
export function GachaCelebration() {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div aria-hidden="true" className="gacha-celebration pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <div className="gacha-celebration-flash absolute inset-0" />

      {bursts.map((burst, burstIndex) => (
        <div
          key={burstIndex}
          className="gacha-firework absolute"
          style={{
            left: burst.x,
            top: burst.y,
            "--burst-delay": `${burst.delay}ms`,
            color: colors[burstIndex % colors.length],
          } as CSSProperties}
        >
          <span className="gacha-firework-ring absolute" />
          {Array.from({ length: 18 }, (_, sparkIndex) => {
            const angle = (sparkIndex * Math.PI * 2) / 18;
            const distance = 120 + (sparkIndex % 3) * 45;
            return (
              <i
                key={sparkIndex}
                className="gacha-firework-spark absolute block"
                style={{
                  "--spark-x": `${Math.cos(angle) * distance}px`,
                  "--spark-y": `${Math.sin(angle) * distance}px`,
                  color: colors[(sparkIndex + burstIndex) % colors.length],
                } as CSSProperties}
              />
            );
          })}
        </div>
      ))}

      {Array.from({ length: 84 }, (_, index) => (
        <i
          key={index}
          className="gacha-screen-confetti absolute block"
          style={{
            left: `${(index * 47 + 13) % 100}%`,
            "--fall-delay": `${(index % 10) * 95}ms`,
            "--fall-duration": `${3400 + (index % 5) * 320}ms`,
            "--fall-drift": `${((index * 29) % 120) - 60}px`,
            "--fall-spin": `${(index % 2 ? 1 : -1) * (330 + index * 9)}deg`,
            backgroundColor: colors[index % colors.length],
          } as CSSProperties}
        />
      ))}
    </div>,
    document.body,
  );
}
