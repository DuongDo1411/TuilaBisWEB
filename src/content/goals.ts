import type { Localized } from "@/i18n/dictionaries";

/**
 * Bảng Mục tiêu — sửa tay ở đây rồi deploy lại.
 *
 * Mỗi mục tiêu:
 *   title        (bắt buộc) tên mục tiêu, 2 ngôn ngữ
 *   description  (tuỳ chọn) mô tả ngắn
 *   progress     (tuỳ chọn) { current, target } → hiện thanh tiến độ
 *   done         (tuỳ chọn) true = đã đạt mốc subscriber, hiện dấu tích
 *
 * Cập nhật currentSubscribers bên dưới khi số subscriber của kênh thay đổi.
 */
export type Goal = {
  id: string;
  title: Localized;
  description?: Localized;
  progress?: { current: number; target: number };
  done?: boolean;
};

const currentSubscribers = 1001;

export const goals: Goal[] = [
  {
    id: "bis-chibi-giveaway",
    title: {
      vi: "500 Subs GA 5 móc khóa chibi Bis cùng thư viết tay",
      en: "500 Subs — Giveaway: 5 chibi Bis keychains with handwritten letters",
    },
    progress: { current: currentSubscribers, target: 500 },
    done: currentSubscribers >= 500,
  },
  {
    id: "lemon-nightbot-wedding",
    title: {
      vi: "1010 Subs đám cưới Lemon với nightbot",
      en: "1010 Subs — Lemon and nightbot's wedding",
    },
    progress: { current: currentSubscribers, target: 1010 },
    done: currentSubscribers >= 1010,
  },
  {
    id: "bis-ayaka-cosplay",
    title: {
      vi: "2000 Subs Bis Cos Ayaka No Wid Live",
      en: "2000 Subs — Bis Cos Ayaka No Wid Live",
    },
    progress: { current: currentSubscribers, target: 2000 },
    done: currentSubscribers >= 2000,
  },
];
