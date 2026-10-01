/**
 * Sticker dễ thương — mèo & trà sữa, vẽ bằng SVG thuần.
 *
 * Phong cách "sticker bế hình": lớp nền trắng dày (viền sticker) → hình tô màu có nét viền
 * xanh rừng → bóng đổ mềm (class .sticker). Khác với cỏ/hoa phẳng ở nền, nên "nhân vật"
 * tách bạch khỏi "cảnh". Toàn bộ là trang trí → aria-hidden. Màu lấy từ token trong globals.css.
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type StickerProps = { className?: string };

const LINE = "var(--sticker-line)";
const BACKING = "var(--sticker-backing)";
const LINE_WIDTH = 2.5;

function Sticker({ viewBox, className, children }: { viewBox: string; className?: string; children: ReactNode }) {
  return (
    <svg
      viewBox={viewBox}
      className={cn("sticker", className)}
      aria-hidden="true"
      focusable="false"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {children}
    </svg>
  );
}

/** Mắt tròn có đốm sáng */
function Eye({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r} fill={LINE} />
      <circle cx={cx + r * 0.35} cy={cy - r * 0.35} r={r * 0.34} fill={BACKING} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Mặt mèo — dán ở rìa trang
// ---------------------------------------------------------------------------

const FACE_EARS = ["M18 40 L22 9 L45 25 Z", "M82 40 L78 9 L55 25 Z"];

export function CatFace({ className, coat = "ginger" }: StickerProps & { coat?: "ginger" | "white" }) {
  const fur = coat === "ginger" ? "var(--cat-ginger)" : "var(--cat-white)";
  return (
    <Sticker viewBox="0 0 100 94" className={className}>
      {/* Viền sticker */}
      <g fill={BACKING} stroke={BACKING} strokeWidth="10">
        {FACE_EARS.map((d) => (
          <path key={d} d={d} />
        ))}
        <ellipse cx="50" cy="54" rx="38" ry="31" />
      </g>
      {/* Tai → lòng tai → đầu (đầu đè lên chân tai cho liền nét) */}
      <g fill={fur} stroke={LINE} strokeWidth={LINE_WIDTH}>
        {FACE_EARS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <path d="M25 31 L26.5 17 L37 25 Z" fill="var(--cat-ear)" />
      <path d="M75 31 L73.5 17 L63 25 Z" fill="var(--cat-ear)" />
      <ellipse cx="50" cy="54" rx="38" ry="31" fill={fur} stroke={LINE} strokeWidth={LINE_WIDTH} />
      {coat === "ginger" && (
        <path d="M44 27 L46 35 M50 25 V34 M56 27 L54 35" fill="none" stroke="var(--cat-stripe)" strokeWidth="3.2" />
      )}
      {/* Mặt */}
      <Eye cx={36} cy={54} r={4.6} />
      <Eye cx={64} cy={54} r={4.6} />
      <path d="M46.5 61 Q50 59 53.5 61 Q50 65.5 46.5 61 Z" fill="var(--cat-nose)" />
      <path d="M42 66 Q46 70.5 50 66 Q54 70.5 58 66" fill="none" stroke={LINE} strokeWidth="2.2" />
      <ellipse cx="25" cy="64" rx="6.5" ry="3.8" fill="var(--blush)" opacity="0.8" />
      <ellipse cx="75" cy="64" rx="6.5" ry="3.8" fill="var(--blush)" opacity="0.8" />
      <path
        d="M16 59 L5 56.5 M16 64.5 L5 66 M84 59 L95 56.5 M84 64.5 L95 66"
        fill="none"
        stroke={LINE}
        strokeWidth="1.6"
        opacity="0.55"
      />
    </Sticker>
  );
}

// ---------------------------------------------------------------------------
// Mèo trắng ngủ tròn như ổ bánh mì — nằm trong vườn cỏ góc dưới
// ---------------------------------------------------------------------------

const LOAF_EARS = ["M20 44 L24 15 L44 31 Z", "M70 42 L66 14 L48 30 Z"];
const LOAF_BODY = "M40 30 H100 A26 26 0 0 1 100 82 H40 A26 26 0 0 1 40 30 Z";
const LOAF_TAIL = "M104 80 C124 80 132 62 120 52";

export function CatLoaf({ className }: StickerProps) {
  return (
    <Sticker viewBox="0 -4 140 94" className={className}>
      {/* Viền sticker */}
      <g fill={BACKING} stroke={BACKING} strokeWidth="10">
        {LOAF_EARS.map((d) => (
          <path key={d} d={d} />
        ))}
        <path d={LOAF_BODY} />
      </g>
      <path d={LOAF_TAIL} fill="none" stroke={BACKING} strokeWidth="20" />

      <g fill="var(--cat-white)" stroke={LINE} strokeWidth={LINE_WIDTH}>
        {LOAF_EARS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <path d="M26 33 L27.5 21 L37 29 Z" fill="var(--cat-ear)" />
      <path d="M64 33 L62.5 21 L53 28 Z" fill="var(--cat-ear)" />
      <path d={LOAF_BODY} fill="var(--cat-white)" stroke={LINE} strokeWidth={LINE_WIDTH} />
      {/* Đốm cam trên lưng */}
      <ellipse cx="97" cy="50" rx="15" ry="10" fill="var(--cat-ginger)" />
      <ellipse cx="84" cy="68" rx="6" ry="4.5" fill="var(--cat-ginger)" />
      {/* Đuôi cuộn phía trước */}
      <path d={LOAF_TAIL} fill="none" stroke={LINE} strokeWidth="12" />
      <path d={LOAF_TAIL} fill="none" stroke="var(--cat-ginger)" strokeWidth="7.5" />
      {/* Chân trước thu gọn */}
      <ellipse cx="36" cy="82" rx="9" ry="5.5" fill="var(--cat-white)" stroke={LINE} strokeWidth={LINE_WIDTH} />
      <ellipse cx="58" cy="82" rx="9" ry="5.5" fill="var(--cat-white)" stroke={LINE} strokeWidth={LINE_WIDTH} />
      {/* Mặt đang ngủ */}
      <path d="M29 55 Q34 60 39 55 M51 55 Q56 60 61 55" fill="none" stroke={LINE} strokeWidth="2.4" />
      <path d="M42.5 61.5 Q45 60 47.5 61.5 Q45 64.5 42.5 61.5 Z" fill="var(--cat-nose)" />
      <path d="M41 66 Q43 68.5 45 66 Q47 68.5 49 66" fill="none" stroke={LINE} strokeWidth="1.8" />
      <ellipse cx="25" cy="63" rx="5.5" ry="3.2" fill="var(--blush)" opacity="0.8" />
      <ellipse cx="65" cy="63" rx="5.5" ry="3.2" fill="var(--blush)" opacity="0.8" />
      {/* zZ */}
      <path d="M86 10 H95 L86 19 H95 M101 -1 H107 L101 5 H107" fill="none" stroke={LINE} strokeWidth="2.2" />
    </Sticker>
  );
}

// ---------------------------------------------------------------------------
// Mèo thò đầu — đặt lên mép trên của panel, 2 chân trước bám vào viền
// ---------------------------------------------------------------------------

const PEEK_EARS = ["M34 28 L37 3 L55 18 Z", "M86 28 L83 3 L65 18 Z"];

export function CatPeek({ className }: StickerProps) {
  return (
    <Sticker viewBox="0 0 120 70" className={className}>
      <g fill={BACKING} stroke={BACKING} strokeWidth="9">
        {PEEK_EARS.map((d) => (
          <path key={d} d={d} />
        ))}
        <path d="M28 70 V44 A32 28 0 0 1 92 44 V70 Z" />
        <ellipse cx="36" cy="61" rx="12" ry="7.5" />
        <ellipse cx="84" cy="61" rx="12" ry="7.5" />
      </g>
      <g fill="var(--cat-ginger)" stroke={LINE} strokeWidth={LINE_WIDTH}>
        {PEEK_EARS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <path d="M40 24 L41.5 11 L50 18 Z" fill="var(--cat-ear)" />
      <path d="M80 24 L78.5 11 L70 18 Z" fill="var(--cat-ear)" />
      {/* Đầu — phần dưới bị mép panel che (cắt ở đáy viewBox) */}
      <path d="M28 72 V44 A32 28 0 0 1 92 44 V72" fill="var(--cat-ginger)" stroke={LINE} strokeWidth={LINE_WIDTH} />
      <path d="M54 19 L56 26 M60 17 V25 M66 19 L64 26" fill="none" stroke="var(--cat-stripe)" strokeWidth="3" />
      <Eye cx={47} cy={40} r={4.2} />
      <Eye cx={73} cy={40} r={4.2} />
      <path d="M57 46.5 Q60 45 63 46.5 Q60 50 57 46.5 Z" fill="var(--cat-nose)" />
      <path d="M53.5 51 Q57 54.5 60 51 Q63 54.5 66.5 51" fill="none" stroke={LINE} strokeWidth="2" />
      <ellipse cx="38" cy="49" rx="5.5" ry="3.2" fill="var(--blush)" opacity="0.8" />
      <ellipse cx="82" cy="49" rx="5.5" ry="3.2" fill="var(--blush)" opacity="0.8" />
      {/* 2 chân trước bám mép */}
      <g fill="var(--cat-ginger)" stroke={LINE} strokeWidth={LINE_WIDTH}>
        <ellipse cx="36" cy="61" rx="12" ry="7.5" />
        <ellipse cx="84" cy="61" rx="12" ry="7.5" />
      </g>
      <path d="M32 57 V62 M40 57 V62 M80 57 V62 M88 57 V62" fill="none" stroke={LINE} strokeWidth="1.5" />
    </Sticker>
  );
}

// ---------------------------------------------------------------------------
// Cốc trà sữa có mặt cười — vị matcha (ống hút hồng) hoặc dâu (ống hút xanh)
// ---------------------------------------------------------------------------

const CUP = "M15 49 L65 49 L59 111 Q58.5 116 53.5 116 L26.5 116 Q21.5 116 21 111 Z";
const LID = "M15 41 Q40 17 65 41 Z";
const STRAW = "M43 44 L53 3";
const PEARLS: Array<[number, number]> = [
  [29, 108],
  [38, 110],
  [47, 109],
  [55, 105],
  [33, 100],
  [43, 101],
  [51, 98],
];

export function BobaCup({ className, flavor = "matcha" }: StickerProps & { flavor?: "matcha" | "strawberry" }) {
  const tea = flavor === "matcha" ? "var(--tea-matcha)" : "var(--tea-strawberry)";
  const straw = flavor === "matcha" ? "var(--straw-pink)" : "var(--straw-mint)";
  return (
    <Sticker viewBox="0 0 80 124" className={className}>
      {/* Viền sticker */}
      <path d={STRAW} fill="none" stroke={BACKING} strokeWidth="20" />
      <g fill={BACKING} stroke={BACKING} strokeWidth="10">
        <path d={LID} />
        <rect x="10" y="39" width="60" height="10" rx="5" />
        <path d={CUP} />
      </g>
      {/* Ống hút sọc */}
      <path d={STRAW} fill="none" stroke={LINE} strokeWidth="11.5" />
      <path d={STRAW} fill="none" stroke={straw} strokeWidth="7.5" />
      <path d={STRAW} fill="none" stroke={BACKING} strokeWidth="7.5" strokeDasharray="3 6" opacity="0.55" />
      {/* Nắp + cốc */}
      <path d={LID} fill={BACKING} stroke={LINE} strokeWidth={LINE_WIDTH} />
      <path d={CUP} fill={tea} stroke={LINE} strokeWidth={LINE_WIDTH} />
      <rect x="10" y="39" width="60" height="10" rx="5" fill={BACKING} stroke={LINE} strokeWidth={LINE_WIDTH} />
      <path d="M22.5 57 L26 104" fill="none" stroke={BACKING} strokeWidth="3" opacity="0.7" />
      {/* Trân châu */}
      {PEARLS.map(([cx, cy]) => (
        <circle key={cx + "-" + cy} cx={cx} cy={cy} r="4" fill="var(--tapioca)" />
      ))}
      {/* Mặt */}
      <Eye cx={32} cy={72} r={3.3} />
      <Eye cx={48} cy={72} r={3.3} />
      <path d="M37.5 78 Q40 81 42.5 78" fill="none" stroke={LINE} strokeWidth="2" />
      <ellipse cx="26" cy="78" rx="4.2" ry="2.6" fill="var(--blush)" opacity="0.85" />
      <ellipse cx="54" cy="78" rx="4.2" ry="2.6" fill="var(--blush)" opacity="0.85" />
    </Sticker>
  );
}

// ---------------------------------------------------------------------------
// Dấu chân mèo — hoạ tiết mờ, không viền
// ---------------------------------------------------------------------------

export function PawPrint({ className }: StickerProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <g fill="var(--accent)">
        <ellipse cx="20" cy="26" rx="9" ry="7.5" />
        <circle cx="9" cy="15" r="4.2" />
        <circle cx="16" cy="8.5" r="4.2" />
        <circle cx="24" cy="8.5" r="4.2" />
        <circle cx="31" cy="15" r="4.2" />
      </g>
    </svg>
  );
}
