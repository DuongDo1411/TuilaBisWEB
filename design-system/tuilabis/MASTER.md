# TuilaBis — Design System (MASTER)

> Nguồn chuẩn duy nhất (source of truth) cho mọi quyết định giao diện của dự án.
> Khi build một trang cụ thể: đọc file này, rồi kiểm tra `pages/<tên-trang>.md` — nếu có,
> quy tắc trong file trang **ghi đè** file này.

**Phiên bản 3 — "Matcha Dâu" sáng/tối** (2026-09-29). Bổ sung chế độ tối tùy chọn cho bản 2.
Giao diện sáng vẫn là mặc định. Bản 2 (2026-09-27) thay cho bản 1 (nền đen + xanh lá, glassmorphism),
vì chủ dự án thấy nền đen quá u ám và muốn vibe dễ thương, đáng yêu.

## Nguồn gốc

| Thành phần | Nguồn |
|---|---|
| Palette | `colors.csv` → Childcare/Daycare: "Soft pink + safe green" (query "mint green pastel soft", lần retry — query đầu "cute pastel playful kids" không ra tổ hợp có xanh lá) |
| Style | `styles.csv` → `claymorphism` (active, cost:low, a11y risk:conditional) |
| Font | `typography.csv` → cặp "Kids/Education" + "Playful Creative", đã lọc theo subset `vietnamese` trong `google-fonts.csv` |
| Carousel/auto-motion | `motion.csv` → "Carousel / Auto-Rotation" (Standard) |
| Video | `ux-guidelines.csv` → "Auto-Play Video": click-to-play, pause, captions |
| Bố cục | tham khảo guns.lol/vntakeshi (panel nổi trên nền động) |

## Màu sắc

### Primitive
| Token | Hex | Ghi chú |
|---|---|---|
| `--cream-50` | `#F3FBF4` | Nền trang — trắng ngà ám mint |
| `--white` | `#FFFFFF` | Panel đất sét, ô nổi |
| `--mint-50` | `#F0FDF4` | Mục bên trong panel |
| `--mint-100` | `#DCFCE7` | Ô icon mint |
| `--mint-300` | `#86EFAC` | Nền nút pastel |
| `--green-500` | `#22C55E` | Cỏ 4 lá, thanh tiến độ (chỉ trang trí) |
| `--green-600` | `#16A34A` | Lá đậm |
| `--green-700` | `#15803D` | Chữ/icon xanh |
| `--forest-900` | `#14532D` | Chữ chính (thay cho đen) |
| `--sage-700` | `#44725A` | Chữ phụ |
| `--pink-100` | `#FCE7F3` | Ô icon hồng, huy hiệu |
| `--pink-300` | `#F9A8D4` | Cánh hoa, viền avatar |
| `--pink-500` | `#EC4899` | Vạch chỉ gacha, icon "đã đạt" |
| `--pink-600` | `#DB2777` | Focus ring |
| `--pink-700` | `#BE185D` | Chữ hồng |
| `--butter-100` | `#FEF3C7` | Ô icon vàng bơ |
| `--butter-300` | `#FDE68A` | Nhụy hoa |
| `--amber-700` | `#B45309` | Chữ trên nền vàng bơ |

### Semantic (dùng trong component — KHÔNG dùng hex trực tiếp)
`bg` · `surface` · `surface-raised` · `fg` · `fg-muted` · `primary` · `primary-soft` ·
`primary-softer` · `primary-strong` · `leaf` · `on-primary` · `accent` · `accent-vivid` ·
`accent-soft` · `accent-strong` · `butter-soft` · `butter-strong` · `line` · `line-strong` · `ring`

### Tương phản đã đo (WCAG)

| Cặp | Tỉ lệ | Chuẩn |
|---|---|---|
| Chữ chính `#14532D` / nền trang | 8.64:1 | ✅ 4.5 |
| Chữ phụ `#44725A` / mint-100 (trường hợp xấu nhất) | 5.03:1 | ✅ 4.5 |
| Chữ nút `#14532D` / nút `#86EFAC` | 6.49:1 | ✅ 4.5 |
| Chữ xanh `#15803D` / mint-50 | 4.79:1 | ✅ 4.5 |
| Chữ hồng `#BE185D` / hồng-100 | 5.14:1 | ✅ 4.5 |
| Chữ `#B45309` / bơ-100 | 4.51:1 | ✅ 4.5 (sát ngưỡng — không làm nhạt thêm) |
| Focus ring `#DB2777` / nền | 4.36:1 | ✅ 3.0 |

**Bẫy pastel — đã loại:**
- Chữ trắng trên `#16A34A` chỉ 3.30:1 → nút dùng **nền pastel + chữ xanh rừng**.
- Chữ `#EC4899` trên trắng chỉ 3.53:1 → chữ hồng dùng `#BE185D`.
- `#86EFAC` làm viền trên trắng chỉ 1.40:1 → không dùng làm viền nhận diện thành phần.
- `primary` (`#22C55E`) chỉ để trang trí, **không bao giờ làm chữ**.
- Không dùng `opacity` để làm mờ chữ; muốn tạo chiều sâu thì thu nhỏ (`scale`).

### Thương hiệu (chỉ hiện khi hover/focus icon social)
| Kênh | Token | Hex | Trên mint-50 |
|---|---|---|---|
| YouTube | `--brand-youtube` | `#FF0000` | 3.82:1 |
| Facebook | `--brand-facebook` | `#1877F2` | 4.04:1 |
| TikTok | `--brand-tiktok` | `#161823` | 16.87:1 — cyan `#25F4EE` chỉ 1.32:1 nên **không dùng** |
| Discord | `--brand-discord` | `#5865F2` | 4.40:1 |
| Zypage | — | chờ logo chính thức (tạm `primary-strong`) | — |
| PlayerDuo | — | chờ logo chính thức (tạm `primary-strong`) | — |

### Độ hiếm gacha
Ba cấp: **R** (`--rarity-blue`), **SR** (`--rarity-purple`), **SSR** (`--rarity-gold`).
Tỷ lệ quay hiện tại: R 80%, SR 17%, SSR 3%; các sticker trong cùng cấp có xác suất bằng nhau.
Màu độ hiếm **luôn đi kèm nhãn chữ** (không truyền thông tin chỉ bằng màu).

## Chế độ sáng / tối

- Chuyển bằng nút mặt trăng / mặt trời cạnh chọn ngôn ngữ, có ở màn chờ, intro và trang chính; trang 404 cũng có nút chuyển.
- Mặc định **sáng**. Lưu lựa chọn bằng `localStorage` (`tuilabis-theme`), đồng bộ giữa các tab.
- Áp dụng `data-theme` trên `<html>` trước lần vẽ đầu để tránh nháy sáng khi đã chọn tối.
- Nếu trình duyệt chặn lưu trữ, nút vẫn hoạt động trong trang hiện tại.
- Giữ font Baloo 2 / Nunito, sticker, bố cục và phong cách claymorphism ở cả hai chế độ.
- Nút 48×48px, tên truy cập VI/EN, `aria-pressed` cho trạng thái tối; điều khiển được bằng bàn phím.
- Đổi chế độ không khởi động lại intro, nhạc hoặc ngôn ngữ.

| Token | Sáng | Tối |
|---|---|---|
| `bg` | `#F3FBF4` | `#11241F` |
| `surface` | `#F0FDF4` | `#19332A` |
| `surface-raised` | `#FFFFFF` | `#234236` |
| `fg` | `#14532D` | `#EDF8EF` |
| `fg-muted` | `#44725A` | `#B2CCBA` |
| `primary-strong` | `#15803D` | `#98E5B5` |
| `accent-strong` | `#BE185D` | `#F6B6D6` |
| `ring` | `#DB2777` | `#F9A8D4` |

Tương phản đo trên nền tối: chữ chính ≥10.12:1, chữ phụ ≥6.43:1 trên các surface/panel;
chữ nút mint 8.58:1, chữ hồng trên badge 7.26:1, chữ vàng bơ 7.42:1.
Nền icon social dùng `social-icon-bg` tối hơn để giữ tương phản icon thương hiệu ≥3:1;
TikTok dùng biểu tượng trắng ngà trên nền tối. Quầng màu nền và bóng đất sét giảm độ sáng.
Nền video dùng `media-backdrop`, không dùng `fg` vì chữ chuyển sang màu sáng ở chế độ tối.

## Typography

| Vai trò | Font | Weight | Tiếng Việt |
|---|---|---|---|
| Display / tiêu đề / nút | **Baloo 2** | 600 · 700 · 800 | ✅ |
| Nội dung | **Nunito** | 400 · 600 · 700 | ✅ |

Load qua `next/font/google` với `subsets: ["latin", "vietnamese"]`, `display: "swap"`.

**Cấm dùng** (đã kiểm tra — không có subset vietnamese): Fredoka, Comic Neue, DM Sans,
Orbitron, Outfit, Russo One.

Body tối thiểu 16px; chữ nhỏ nhất 12px; số liệu dùng `tabular-nums`.

## Claymorphism

Từ `styles.csv/claymorphism`:

```css
/* .clay — panel, toggle */
background: linear-gradient(160deg, #FFFFFF, #F7FDF9);
border: 3px solid #FFFFFF;                       /* spec: viền dày 3–4px */
box-shadow:
  inset -3px -4px 10px rgb(22 101 52 / .08),     /* bóng trong */
  inset 3px 3px 8px rgb(255 255 255 / .9),
  6px 10px 26px -10px rgb(22 101 52 / .2);       /* bóng ngoài */
border-radius: 1.75rem;                          /* panel; phần tử con 16–24px */

/* .clay-button — nảy mềm khi bấm */
transition: transform 220ms cubic-bezier(0.34, 1.56, 0.64, 1);
hover: translateY(-2px) · active: translateY(2px) scale(.97)
```
Checklist style: ☐ bo góc 16–24px ☐ viền dày 3px ☐ bóng kép trong + ngoài ☐ pastel ☐ nảy mềm

Mỗi panel có một màu ô icon riêng: **Goal = vàng bơ**, **Gacha = hồng**, **Social = mint**.

## Bố cục

| Breakpoint | Giao diện chính |
|---|---|
| < 768px | 1 cột: **Gacha → Social → Goal** |
| 768–1023px | Gacha full hàng trên; Social + Goal chia đôi |
| ≥ 1024px | 3 cột `Goal 1 : Gacha 1.35 : Social 1`, 3 panel cao bằng nhau |

Lưới luôn dùng `minmax(0, 1fr)` (`grid-cols-1` ở mobile) — nếu không, dải gacha rộng sẽ kéo
giãn cột và trình duyệt mobile thu nhỏ cả trang.

Thứ tự DOM = thứ tự mobile (Gacha, Social, Goal). Desktop đảo vị trí bằng `order`. Goal
không chứa phần tử focus được → thứ tự Tab luôn khớp thị giác.

Container `max-w-7xl`, gutter 16px (mobile) / 24px. Nhịp khoảng cách 4/8px.

## Nền động

Nền kem mint có chấm bi mờ + 4 quầng màu (mint trái trên, hồng phải trên, mint phải dưới,
vàng bơ trái dưới). Cỏ 4 lá (3 sắc xanh) + hoa hồng nhụy vàng + cánh hoa rơi chậm.
18 hạt desktop, 10 hạt mobile. Cụm cỏ tĩnh ở 2 góc dưới. **Không** dùng vignette tối.

## Sticker nhân vật (mèo & trà sữa)

File: `src/components/art/Stickers.tsx`. Phong cách **sticker bế hình** — ăn theo chủ đề
"Gacha Sticker": lớp nền trắng dày (`--sticker-backing`) → hình tô màu có nét viền xanh rừng
2.5px (`--sticker-line`) → bóng đổ mềm (`.sticker`). Cỏ/hoa ở nền thì phẳng, không viền —
nhờ vậy "nhân vật" tách bạch khỏi "cảnh".

| Sticker | Vị trí | Ghi chú |
|---|---|---|
| `CatFace` cam | rìa trái trên | sọc cam trên trán |
| `CatFace` trắng | rìa phải giữa | ẩn trên mobile |
| `BobaCup` dâu (ống hút mint) | rìa phải trên | dưới nút ngôn ngữ |
| `BobaCup` matcha (ống hút hồng) | rìa trái giữa + vườn góc phải | "Matcha Dâu" = 2 vị trà |
| `CatLoaf` trắng ngủ | vườn cỏ góc trái dưới | nằm TRƯỚC cỏ, SAU hoa |
| `CatPeek` cam | thò đầu lên mép trên bảng Gacha | luôn thấy ở mọi màn hình |
| `PawPrint` hồng | rải rác, opacity 45% | hoạ tiết, không viền |

Quy tắc: chỉ đặt ở **rìa và góc**, không đè vùng chữ. Nghiêng như dán tay (`--rot`),
nhún nhẹ (`motion-float`), đứng yên khi reduced-motion. Toàn bộ `aria-hidden`.
Màu mèo/trà sữa là token riêng (`--cat-*`, `--tea-*`, `--tapioca`, `--straw-*`).

## Chuyển động

- Chỉ animate `transform` + `opacity`.
- Micro-interaction 150–300ms; nút nảy `cubic-bezier(0.34, 1.56, 0.64, 1)`.
- Cỏ 4 lá ở màn chờ / header nhún nhảy nhẹ (`motion-bob`); sticker nhún + nghiêng (`motion-float`).
- Gacha: dải thẻ dấu `?` chuyển động sang phải khi chờ; khi mở hòm, thẻ tiếp tục chạy khoảng 17,5 giây rồi mới lộ sticker trúng. Kết quả có lời chúc mừng và pháo hoa/pháo giấy phủ toàn màn hình, nút `Quay tiếp` đưa về dải thẻ ban đầu.
- `prefers-reduced-motion: reduce` → **tắt toàn bộ** animation nền, hạt nằm yên tại vị trí tĩnh.

## Âm thanh & video

- Nút đầu tiên = cú tương tác mở khóa autoplay có tiếng (video + nhạc nền).
- Video chào mừng: nút **Bỏ qua** + **Tắt tiếng** luôn hiện.
- Video lỗi: nếu lỗi lúc còn ở màn chờ thì **không** bỏ qua màn chờ; khi bấm nút sẽ vào thẳng
  giao diện chính (nhạc vẫn được mở khóa).
- Nhạc nền chỉ phát **sau** video, fade-in 1.5s, âm lượng 35%, lặp; điều khiển âm lượng qua
  Web Audio GainNode (iOS không cho đổi `audio.volume`).
- Nút bật/tắt nhạc luôn hiện ở giao diện chính (WCAG 1.4.2), nhớ lựa chọn trong `localStorage`.

## Icon

Phosphor (`@phosphor-icons/react`), weight `fill` cho logo thương hiệu, `bold` cho UI.
Không dùng emoji làm icon. Zypage & PlayerDuo: tạm dùng `HandHeart` / `GameController`
cho tới khi có logo chính thức.

## Accessibility bắt buộc

- Mọi link social có `aria-label` = tên kênh + handle + "mở trong tab mới"
  (trang tham khảo guns.lol thiếu toàn bộ).
- Vùng bấm từ 44×44px trở lên (guns.lol chỉ 35px).
- Focus ring 3px `--ring` (hồng), offset 3px.
- Nút toggle dùng `aria-pressed`; tên truy cập chứa chữ hiển thị (WCAG 2.5.3).
- `<html lang>` đúng theo ngôn ngữ đang xem.
- Trạng thái "chưa dùng được" dùng màu đặc + viền nét đứt, **không** dùng `opacity`.

## Anti-patterns (tránh)

- Hex trực tiếp trong component
- Màu pastel làm chữ
- `opacity` làm mờ chữ hoặc nút
- Emoji làm icon
- Font không có tiếng Việt
- Animation không tôn trọng reduced-motion
- Âm thanh tự phát không có nút dừng
- Link chỉ có icon mà không có tên truy cập
