/**
 * 6 kênh mạng xã hội — sửa link và tên kênh ở đây.
 *
 * - `url: null`  → thẻ hiện "Link sắp cập nhật" và không bấm được.
 * - `handle`     → tên kênh / @username hiển thị dưới tên nền tảng.
 * - `brandColor` → màu bừng lên khi rê chuột. Khai báo token trong globals.css.
 */
export type SocialId =
  | "youtube"
  | "tiktok"
  | "facebook"
  | "discord"
  | "zypage"
  | "playerduo";

export type Social = {
  id: SocialId;
  name: string;
  handle: string;
  url: string | null;
  brandColor: string;
};

export const socials: Social[] = [
  { id: "youtube", name: "YouTube", handle: "@Bis1001", url: "https://www.youtube.com/@Bis1001", brandColor: "var(--brand-youtube)" },
  { id: "tiktok", name: "TikTok", handle: "@tuilabis", url: "https://www.tiktok.com/@tuilabis", brandColor: "var(--brand-tiktok)" },
  { id: "facebook", name: "Facebook", handle: "TuilaBis", url: "https://www.facebook.com/share/16YAf37YMU/?mibextid=wwXIfr", brandColor: "var(--brand-facebook)" },
  { id: "discord", name: "Discord", handle: "TuilaBis", url: "https://discord.gg/eEvRphVPU3", brandColor: "var(--brand-discord)" },
  // TODO: Zypage & PlayerDuo đang dùng icon tạm + màu xanh — thay khi có logo và màu chính thức
  { id: "zypage", name: "Zypage", handle: "tuilabisne", url: "https://zypage.com/tuilabisne", brandColor: "var(--primary-strong)" },
  { id: "playerduo", name: "PlayerDuo", handle: "tuilabisne", url: "https://playerduo.net/tuilabisne", brandColor: "var(--primary-strong)" },
];
