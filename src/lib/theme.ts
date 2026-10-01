export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "tuilabis-theme";

// Chạy trước lần vẽ đầu tiên; mặc định sáng để giữ phong cách Matcha Dâu.
// Chỉ nhận hai giá trị cố định, kể cả khi localStorage chứa dữ liệu không hợp lệ.
export const themeInitScript = `(()=>{try{document.documentElement.dataset.theme=localStorage.getItem("${THEME_STORAGE_KEY}")==="dark"?"dark":"light"}catch{}})()`;
