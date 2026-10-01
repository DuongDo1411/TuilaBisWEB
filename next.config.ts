import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Layout gốc nằm trong app/[lang] → cần trang 404 toàn cục riêng
    globalNotFound: true,
  },
  async redirects() {
    // Trang chủ mặc định tiếng Việt
    return [{ source: "/", destination: "/vi", permanent: false }];
  },
};

export default nextConfig;
