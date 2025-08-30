import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["ddragon.leagueoflegends.com"], // 외부 이미지 도메인 허용
  },
};

export default nextConfig;
