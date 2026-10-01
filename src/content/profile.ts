import type { Localized } from "@/i18n/dictionaries";

/**
 * Thông tin hiển thị ở đầu bảng Social.
 *
 * Ảnh đại diện: bỏ file vào public/media/ (ví dụ public/media/avatar.webp)
 * rồi đổi `avatar` thành "/media/avatar.webp". Để null thì hiện cỏ 4 lá thay thế.
 */
export const profile: {
  displayName: string;
  avatar: string | null;
  tagline: Localized;
} = {
  displayName: "TuilaBis",
  avatar: "/media/avatar.jpg",
  tagline: {
    vi: "Cảm ơn bạn đã ghé chơi!",
    en: "Thanks for stopping by!",
  },
};
