/**
 * File media — bỏ file vào thư mục public/media/ rồi điền đường dẫn bắt đầu bằng "/media/".
 * Để null = chưa có file.
 *
 * introVideo    video chào mừng (quay ngang 16:9), gồm hai cảnh nối liền trong một file.
 *               Cảnh hai bỏ tiếng gốc và dùng nhạc Please Tell Me Why từ 0:28 đến 0:40.
 *               null → hiện khung tạm vài giây.
 * introPoster   ảnh hiện trong lúc video đang tải (nên là 1 khung hình của video).
 * introCaptions phụ đề WebVTT (.vtt) tiếng Việt — tuỳ chọn nhưng nên có.
 * music         nhạc nền (.mp3), phát lặp sau khi video kết thúc. null → ẩn nút nhạc.
 */
export const media: {
  introVideo: string | null;
  introPoster: string | null;
  introCaptions: string | null;
  music: string | null;
} = {
  introVideo: "/media/bis-welcome.mp4",
  introPoster: null,
  introCaptions: null,
  music: "/media/couple-n-thousand-stars.mp3",
};

/** Thời lượng khung tạm khi chưa có video (giây) */
export const INTRO_PLACEHOLDER_SECONDS = 5;
