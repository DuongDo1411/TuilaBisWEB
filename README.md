# TuilaBis — Web PR các kênh của Bí

Next.js 16 · React 19 · Tailwind CSS 4 · Song ngữ Việt/Anh (`/vi`, `/en`)

## Chạy thử trên máy

```bash
npm install      # lần đầu
npm run dev      # mở http://localhost:3000
```

Gacha cần biến môi trường `GACHA_COOKIE_SECRET` dài tối thiểu 32 ký tự để ký cookie.
Tạo `.env.local` theo `.env.example` trước khi chạy local và đặt cùng giá trị bí mật đó
trên môi trường deploy. Giữ nguyên giá trị khi deploy lại để cookie đã cấp tiếp tục hợp lệ.
Để thử quay liên tục, đặt `GACHA_UNLIMITED_SPINS=true` trong `.env.local` hoặc trong
Environment Variables của Vercel cho môi trường muốn thử. Cờ này cũng hoạt động trên bản deploy;
nếu bật cho Production thì mọi khách truy cập đều được quay không giới hạn.
Đổi lại thành `false` (và redeploy trên Vercel) khi muốn dùng giới hạn mỗi ngày;
lượt thử không tiêu tốn lượt miễn phí.

## Sửa nội dung — chỉ cần đụng vào `src/content/`

| Muốn sửa | File |
|---|---|
| Mục tiêu (Goal) | `src/content/goals.ts` |
| Link 6 kênh social, tên kênh | `src/content/socials.ts` |
| Tên hiển thị, avatar, câu chào | `src/content/profile.ts` |
| Video chào mừng, nhạc nền | `src/content/media.ts` |
| Chữ giao diện (nút, tiêu đề...) | `src/i18n/dictionaries.ts` |
| Sticker và tỷ lệ gacha | `src/content/gacha.ts` |

Mỗi file đều có chú thích tiếng Việt ở đầu giải thích cách điền.

### Thêm video / nhạc / avatar

1. Bỏ file vào `public/media/` (ví dụ `public/media/intro.mp4`)
2. Điền đường dẫn bắt đầu bằng `/media/` vào file tương ứng (ví dụ `introVideo: "/media/intro.mp4"`)

Để `null` = chưa có file: video hiện khung tạm 5 giây, nút nhạc tự ẩn, avatar hiện cỏ 4 lá.

### Gacha sticker

20 ảnh trong `public/media/stickers/` được sao từ `assets/VIDEO LEN WEB`:
9 R, 7 SR, 4 SSR (nguồn chưa có SR6). Tỷ lệ hiện tại là R 80%, SR 17%, SSR 3%;
trong mỗi cấp, các sticker có xác suất như nhau. Mỗi trình duyệt có 1 lượt miễn phí/ngày,
đặt lại lúc 00:00 giờ Việt Nam. API `/api/gacha` chọn kết quả trên máy chủ và lưu lượt đã dùng,
sticker trúng cùng số bản sao vào cookie được ký và chỉ máy chủ đọc được.
Trước và trong lúc quay, dải thẻ chỉ hiện dấu `?`; dải chạy sang phải khoảng 17,5 giây,
sau đó mới hiện sticker trúng với lời chúc mừng và hiệu ứng pháo hoa/pháo giấy toàn màn hình.
Nút `Quay tiếp` đưa về dải chờ.

Cookie chỉ nhận diện một trình duyệt còn giữ cookie. Người dùng xóa hoặc khôi phục cookie,
hay dùng trình duyệt/thiết bị khác, có thể quay thêm; không có tài khoản hoặc kho dữ liệu máy chủ
thì không thể bảo đảm giới hạn theo từng người. Phần đánh giá nhận thêm 2 lượt/ngày và giao diện
bộ sưu tập sẽ được xây dựng sau; trường lượt thưởng và dữ liệu sticker đã trúng đã được dành sẵn.

## Kiểm tra trước khi deploy

```bash
npm run lint
npm run build
```

## Thiết kế

Toàn bộ quy tắc màu, font, bố cục, accessibility: `design-system/tuilabis/MASTER.md`.
Màu dùng qua token trong `src/app/globals.css` — không viết mã hex trực tiếp trong component.

Nút mặt trăng / mặt trời cạnh VI/EN chuyển giao diện sáng/tối. Mặc định sáng;
lựa chọn được lưu cho lần truy cập sau và đồng bộ giữa các tab. Hai chế độ dùng chung
font Baloo 2 / Nunito, có bảng màu chữ và nền riêng.

## Còn chờ

- [ ] Video chào mừng (quay ngang) + ảnh poster + phụ đề `.vtt` (tuỳ chọn)
- [x] Nhạc nền: `Couple N - Thousand Stars.mp3` (file được cung cấp trong `assets/`)
- [x] Avatar của Bí
- [x] 6 link: YouTube, TikTok, Facebook, Discord, Zypage, PlayerDuo
- [ ] Logo chính thức Zypage & PlayerDuo (đang dùng icon tạm)
- [x] 3 mốc Goal subscriber của Bí (cập nhật số hiện tại trong `src/content/goals.ts`)
- [x] Gacha sticker với 3 độ hiếm, hoạt ảnh quay, giới hạn theo cookie
- [ ] Đánh giá trang web để nhận thêm 2 lượt/ngày
- [ ] Giao diện bộ sưu tập sticker đã trúng
