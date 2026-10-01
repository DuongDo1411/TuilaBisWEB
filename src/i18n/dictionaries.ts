export const locales = ["vi", "en"] as const;
export type Locale = (typeof locales)[number];

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Chuỗi có 2 ngôn ngữ — dùng chung cho mọi file trong src/content */
export type Localized = Record<Locale, string>;

export const localeNames: Record<Locale, string> = {
  vi: "Tiếng Việt",
  en: "English",
};

export const numberLocale: Record<Locale, string> = {
  vi: "vi-VN",
  en: "en-US",
};

const vi = {
  meta: {
    title: "TuilaBis — Cùng khám phá về Bí",
    description:
      "Tất cả các kênh của TuilaBis: YouTube, TikTok, Facebook, Discord, Zypage và PlayerDuo.",
  },
  gate: {
    enter: "Cùng khám phá về Bí nèoo",
    soundHint: "Nên bật âm thanh để có trải nghiệm tốt nhất",
  },
  intro: {
    label: "Video chào mừng từ Bí",
    skip: "Bỏ qua",
    mute: "Tắt tiếng",
    progress: "Tiến độ video",
    placeholderTitle: "Video chào mừng của Bí sẽ phát ở đây",
    placeholderNote: "Đang dùng khung tạm — sẽ thay khi có file video",
  },
  controls: {
    language: "Ngôn ngữ",
    music: "Nhạc nền",
    musicVolume: "Âm lượng nhạc nền",
    musicError: "Chưa phát được nhạc. Bấm nút loa để thử lại.",
    darkMode: "Chế độ tối",
    switchToLight: "Chuyển sang giao diện sáng",
    switchToDark: "Chuyển sang giao diện tối",
  },
  goals: {
    title: "Mục tiêu",
    subtitle: "Những cột mốc Bí đang hướng tới",
    done: "Đã đạt",
  },
  gacha: {
    title: "Gacha Sticker",
    subtitle: "Mở hòm, săn sticker hiếm",
    open: "Mở hòm",
    next: "Quay tiếp",
    mystery: "Bí ẩn",
    congrats: "Chúc mừng! Bạn đã nhận được sticker!",
    dailyInfo: "1 lượt miễn phí mỗi ngày",
    testUnlimited: "Chế độ thử nghiệm: quay không giới hạn",
    remaining: "Lượt còn lại",
    drawing: "Đang mở hòm...",
    spinning: "Đang quay sticker",
    skip: "Xem kết quả ngay",
    dailyUsed: "Đã dùng lượt hôm nay",
    resetAt: "Lượt mới lúc 00:00 (giờ Việt Nam)",
    odds: "Tỷ lệ rơi",
    latest: "Sticker đã nhận",
    error: "Chưa tải được lượt quay. Hãy thử lại.",
    retry: "Thử lại",
  },
  social: {
    title: "Kênh của Bí",
    subtitle: "Theo dõi Bí ở mọi nơi",
    opensNewTab: "mở trong tab mới",
    linkPending: "Link sắp cập nhật",
    avatarAlt: "Ảnh đại diện của TuilaBis",
  },
  notFound: {
    title: "Lạc mất rồi!",
    body: "Trang bạn tìm không tồn tại. Quay về nhà của Bí nhé.",
    back: "Về trang chính",
  },
};

export type Dictionary = typeof vi;

const en: Dictionary = {
  meta: {
    title: "TuilaBis — Let's explore Bí",
    description:
      "All of TuilaBis's channels: YouTube, TikTok, Facebook, Discord, Zypage and PlayerDuo.",
  },
  gate: {
    enter: "Let's explore Bí",
    soundHint: "Turn your sound on for the best experience",
  },
  intro: {
    label: "Welcome video from Bí",
    skip: "Skip",
    mute: "Mute",
    progress: "Video progress",
    placeholderTitle: "Bí's welcome video will play here",
    placeholderNote: "Placeholder frame — will be replaced once the video file is ready",
  },
  controls: {
    language: "Language",
    music: "Background music",
    musicVolume: "Background music volume",
    musicError: "Music could not play. Press the speaker button to try again.",
    darkMode: "Dark mode",
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",
  },
  goals: {
    title: "Goals",
    subtitle: "Milestones Bí is working towards",
    done: "Achieved",
  },
  gacha: {
    title: "Sticker Gacha",
    subtitle: "Open the case, hunt rare stickers",
    open: "Open case",
    next: "Spin again",
    mystery: "Mystery",
    congrats: "Congratulations! A sticker is yours!",
    dailyInfo: "1 free spin each day",
    testUnlimited: "Test mode: unlimited spins",
    remaining: "Spins left",
    drawing: "Opening the case...",
    spinning: "Spinning for a sticker",
    skip: "Show result now",
    dailyUsed: "Today's spin is used",
    resetAt: "New spin at 00:00 (Vietnam time)",
    odds: "Drop rates",
    latest: "Sticker received",
    error: "Could not load your spin. Please try again.",
    retry: "Try again",
  },
  social: {
    title: "Bí's channels",
    subtitle: "Follow Bí everywhere",
    opensNewTab: "opens in a new tab",
    linkPending: "Link coming soon",
    avatarAlt: "TuilaBis's avatar",
  },
  notFound: {
    title: "Lost in the clover field!",
    body: "The page you're looking for doesn't exist. Let's head back to Bí's home.",
    back: "Back to home",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { vi, en };
