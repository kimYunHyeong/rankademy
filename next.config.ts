import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "ddragon.leagueoflegends.com",
      "raw.communitydragon.org",
      "rankademy.s3.ap-northeast-2.amazonaws.com",
      "static.rankademy.app", //목데이터
    ], // 외부 이미지 도메인 허용
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", //
    },
  },
};

export default nextConfig;
