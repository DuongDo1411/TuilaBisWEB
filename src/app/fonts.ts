import { Baloo_2, Nunito } from "next/font/google";

/**
 * Khai báo font DUY NHẤT một lần ở đây. Nếu layout và trang 404 mỗi nơi tự gọi Baloo_2/Nunito,
 * Next sẽ tạo 2 bộ file font khác nhau và preload cả bộ không dùng tới trên mọi trang.
 *
 * Font bo tròn dễ thương — cả hai đều có subset tiếng Việt (đã kiểm tra google-fonts.csv).
 * Fredoka & Comic Neue KHÔNG có tiếng Việt nên không dùng.
 */
export const display = Baloo_2({
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700", "800"],
  variable: "--font-baloo",
  display: "swap",
});

export const body = Nunito({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export const fontVariables = display.variable + " " + body.variable;
