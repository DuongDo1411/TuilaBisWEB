import { type ReactNode, useId } from "react";
import { cn } from "@/lib/cn";

/** Màu pastel của ô icon ở đầu panel — mỗi panel một màu cho vui mắt */
const TONES = {
  mint: "bg-primary-softer text-primary-strong",
  pink: "bg-accent-soft text-accent-strong",
  butter: "bg-butter-soft text-butter-strong",
} as const;

/** Khung đất sét (claymorphism) dùng chung cho 3 bảng Goal / Gacha / Social */
export function Panel({
  title,
  subtitle,
  icon,
  tone = "mint",
  decoration,
  className,
  children,
}: {
  title: string;
  subtitle?: string;
  icon: ReactNode;
  tone?: keyof typeof TONES;
  /** Hình trang trí đặt tuyệt đối so với panel (ví dụ mèo thò đầu lên mép) */
  decoration?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const headingId = useId();
  return (
    <section
      aria-labelledby={headingId}
      className={cn("clay relative flex min-w-0 flex-col gap-5 rounded-panel p-5 sm:p-6", className)}
    >
      {decoration}
      <header className="flex items-center gap-3">
        <span className={cn("grid size-11 shrink-0 place-items-center rounded-2xl", TONES[tone])}>{icon}</span>
        <div className="min-w-0">
          <h2 id={headingId} className="font-display text-2xl font-bold leading-none">
            {title}
          </h2>
          {subtitle && <p className="mt-1 text-sm text-fg-muted">{subtitle}</p>}
        </div>
      </header>
      {children}
    </section>
  );
}
