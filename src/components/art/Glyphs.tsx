/**
 * Hình vẽ SVG thuần — cỏ 4 lá, hoa, cánh hoa.
 * Tô màu bằng `currentColor` (lá) và token CSS (hoa), nên đổi màu qua className `text-*`.
 */

type GlyphProps = { className?: string };

/** Một lá hình trái tim: mũi nhọn ở gốc (0,0), hai thùy hướng lên trên */
const LEAF =
  "M0 0C-3-5-20-11-20-25C-20-34-12-39-6-36C-3-34.5-1-32 0-29C1-32 3-34.5 6-36C12-39 20-34 20-25C20-11 3-5 0 0Z";

export function CloverGlyph({ className, veins = true }: GlyphProps & { veins?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <path
        d="M50 47C52 63 56 77 64 95"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.85"
      />
      <g transform="translate(50 47)" fill="currentColor">
        {[45, 135, 225, 315].map((angle) => (
          <g key={angle} transform={`rotate(${angle})`}>
            <path d={LEAF} />
            {veins && (
              <path d="M0-3V-26" stroke="var(--leaf-vein)" strokeWidth="1.4" strokeLinecap="round" />
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}

export function FlowerGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="-32 -32 64 64" className={className} aria-hidden="true" focusable="false">
      <g fill="var(--petal)">
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse key={angle} cx="0" cy="-14" rx="8.5" ry="13" transform={`rotate(${angle})`} />
        ))}
      </g>
      <circle r="6.5" fill="var(--pollen)" />
    </svg>
  );
}

export function PetalGlyph({ className }: GlyphProps) {
  return (
    <svg viewBox="-10 -16 20 32" className={className} aria-hidden="true" focusable="false">
      <ellipse rx="8" ry="14" fill="var(--petal)" />
    </svg>
  );
}
