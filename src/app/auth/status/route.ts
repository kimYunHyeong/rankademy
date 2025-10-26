// app/api/auth/status/route.ts
import { NextResponse } from "next/server";
import {
  getAccessTokenFromCookie,
  getSummonerIconFromCookie,
} from "@/lib/auth";

export const dynamic = "force-dynamic"; // SSR 강제 (중요!)

export async function GET(req: Request) {
  // 요청 헤더를 직접 확인 (확인용)
  const cookieHeader = req.headers.get("cookie");

  const accessToken = await getAccessTokenFromCookie();
  const summonerIcon = await getSummonerIconFromCookie();

  const isAuthenticated = !!accessToken;

  // 디버깅용 로그
  console.log("Cookie header:", cookieHeader);
  console.log("Access Token:", accessToken ? "✅ 존재함" : "❌ 없음");

  return NextResponse.json(
    {
      isAuthenticated,
      summonerIcon: summonerIcon ?? null,
    },
    { status: 200, headers: { "Cache-Control": "no-store" } }
  );
}
