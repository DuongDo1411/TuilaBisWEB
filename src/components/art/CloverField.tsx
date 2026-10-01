import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CloverGlyph, FlowerGlyph, PetalGlyph } from "./Glyphs";
import { BobaCup, CatFace, CatLoaf, PawPrint } from "./Stickers";

/**
 * Nền động toàn trang: đồng cỏ pastel + vườn cỏ ở 2 góc + cỏ/hoa/cánh hoa rơi chậm.
 * Chỉ animate transform/opacity. Reduced-motion → đứng yên (xem globals.css).
 * Vị trí hạt sinh từ seed cố định → server và client ra cùng kết quả (không lệch hydration).
 */

type Kind = "clover" | "flower" | "petal";
type Particle = {
  kind: Kind;
  tone: string;
  x: number;
  y: number;
  size: number;
  dur: number;
  delay: number;
  sway: number;
  swayDur: number;
  tilt: number;
  opacity: number;
};

const PARTICLE_COUNT = 18;
const MOBILE_COUNT = 10;
const CLOVER_TONES = ["text-primary", "text-primary-soft", "text-leaf"];

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (n: number) => Math.round(n * 100) / 100;

const PARTICLES: Particle[] = (() => {
  const rand = mulberry32(4);
  const range = (min: number, max: number) => round(min + rand() * (max - min));
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const kind: Kind = i % 3 === 0 ? "flower" : i % 3 === 1 ? "clover" : "petal";
    return {
      kind,
      tone: CLOVER_TONES[i % CLOVER_TONES.length],
      // Chia đều theo chiều ngang rồi lệch ngẫu nhiên để không bị thành hàng
      x: round(((i + 0.5) / PARTICLE_COUNT) * 100 + range(-3, 3)),
      y: range(4, 92),
      size: kind === "petal" ? range(10, 16) : kind === "flower" ? range(16, 26) : range(20, 38),
      dur: range(22, 38),
      delay: range(0, 38),
      sway: range(14, 42),
      swayDur: range(5, 9),
      tilt: range(12, 40),
      opacity: kind === "clover" ? range(0.5, 0.85) : range(0.6, 0.9),
    };
  });
})();

function Glyph({ particle }: { particle: Particle }) {
  if (particle.kind === "flower") return <FlowerGlyph className="size-full" />;
  if (particle.kind === "petal") return <PetalGlyph className="size-full" />;
  return <CloverGlyph className={cn("size-full", particle.tone)} veins={false} />;
}

/** Cụm cỏ + hoa tĩnh ở góc dưới, một nửa khuất ngoài màn hình cho tự nhiên */
function GardenCorner({ side, children }: { side: "left" | "right"; children?: ReactNode }) {
  const left = side === "left";
  return (
    <div
      className={cn(
        "absolute bottom-0 h-44 w-56 max-md:opacity-60 sm:h-64 sm:w-80",
        left ? "-left-10 sm:-left-8" : "-right-10 -scale-x-100 sm:-right-8",
      )}
    >
      <CloverGlyph className="absolute bottom-[-18%] left-[4%] size-28 rotate-[-18deg] text-leaf sm:size-40" />
      <CloverGlyph className="absolute bottom-[8%] left-[38%] size-16 rotate-[12deg] text-primary-soft sm:size-24" />
      <CloverGlyph className="absolute bottom-[-6%] left-[58%] size-20 rotate-[28deg] text-primary sm:size-28" />
      {children}
      <FlowerGlyph className="absolute bottom-[30%] left-[22%] size-8 sm:size-11" />
      <FlowerGlyph className="absolute bottom-[14%] left-[74%] size-7 sm:size-9" />
    </div>
  );
}

/**
 * Sticker dán quanh rìa trang — tránh vùng giữa (nơi có chữ/panel).
 * --rot: góc nghiêng như sticker dán tay. Nhún nhẹ, đứng yên khi reduced-motion.
 */
const EDGE_STICKERS: Array<{ node: ReactNode; className: string; style: CSSProperties }> = [
  {
    node: <CatFace coat="ginger" className="size-full" />,
    className: "left-[3%] top-[12%] w-16 sm:w-24",
    style: { "--rot": "-12deg", "--float-dur": "7s" } as CSSProperties,
  },
  {
    node: <BobaCup flavor="strawberry" className="size-full" />,
    className: "right-[3%] top-[16%] w-11 sm:w-16",
    style: { "--rot": "10deg", "--float-dur": "6.2s", "--float-delay": "-2s" } as CSSProperties,
  },
  {
    node: <CatFace coat="white" className="size-full" />,
    className: "right-[4%] top-[44%] w-14 max-sm:hidden sm:w-20",
    style: { "--rot": "8deg", "--float-dur": "7.6s", "--float-delay": "-4s" } as CSSProperties,
  },
  {
    node: <BobaCup flavor="matcha" className="size-full" />,
    className: "left-[4%] top-[50%] w-10 max-sm:hidden sm:w-14",
    style: { "--rot": "-8deg", "--float-dur": "6.8s", "--float-delay": "-1s" } as CSSProperties,
  },
];

const PAW_PRINTS = [
  "left-[14%] top-[32%] size-6 rotate-[-20deg]",
  "left-[17%] top-[37%] size-5 rotate-[-8deg]",
  "right-[15%] top-[70%] size-6 rotate-[25deg]",
  "right-[12%] top-[75%] size-5 rotate-[15deg] max-sm:hidden",
];

export function CloverField() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="garden-glow absolute inset-0" />

      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className={cn("particle motion-fall", i >= MOBILE_COUNT && "max-sm:hidden")}
          style={
            {
              left: `${p.x}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              "--y": `${p.y}%`,
              "--dur": `${p.dur}s`,
              "--delay": `${-p.delay}s`,
            } as CSSProperties
          }
        >
          <span
            className="motion-sway block size-full"
            style={
              {
                "--sway": `${p.sway}px`,
                "--sway-dur": `${p.swayDur}s`,
                "--tilt": `${p.tilt}deg`,
              } as CSSProperties
            }
          >
            <Glyph particle={p} />
          </span>
        </span>
      ))}

      {PAW_PRINTS.map((className) => (
        <PawPrint key={className} className={cn("absolute opacity-45", className)} />
      ))}

      {EDGE_STICKERS.map((s) => (
        <div key={s.className} className={cn("motion-float absolute", s.className)} style={s.style}>
          {s.node}
        </div>
      ))}

      <GardenCorner side="left">
        <CatLoaf className="absolute bottom-[4%] left-[26%] w-28 sm:w-40" />
      </GardenCorner>
      <GardenCorner side="right">
        <BobaCup flavor="matcha" className="absolute bottom-[12%] left-[36%] w-12 rotate-[-10deg] sm:w-16" />
      </GardenCorner>
    </div>
  );
}
