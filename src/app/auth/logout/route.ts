import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  SUMMONER_ICON_COOKIE,
} from "@/lib/auth";

export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    console.log("✅ [/api/auth/logout] 호출됨"); // ✅ 로그 추가

    const cookieStore = cookies();

    // (선택) 백엔드에 리프레시 토큰 무효화
    const refreshToken = (await cookieStore).get(REFRESH_COOKIE)?.value ?? null;
    console.log("✅ refreshToken:", refreshToken ? "있음" : "없음"); // ✅ 로그 추가

    if (refreshToken && process.env.NEXT_PUBLIC_API_URL) {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        });
        console.log("✅ 백엔드 로그아웃 요청 성공");
      } catch (e) {
        console.warn("⚠️ 백엔드 로그아웃 요청 실패:", e);
      }
    }

    // 응답 객체 생성
    const res = NextResponse.json(
      { ok: true },
      { status: 200, headers: { "Cache-Control": "no-store" } }
    );

    // 쿠키 삭제 설정
    const secure = process.env.NODE_ENV === "production";
    const domain = process.env.COOKIE_DOMAIN || undefined;
    const base = {
      httpOnly: true,
      secure,
      sameSite: "lax" as const,
      path: "/",
      ...(domain ? { domain } : {}),
      expires: new Date(0),
      maxAge: 0,
    };

    // ✅ 삭제 로그 출력
    console.log("🧹 쿠키 삭제 중...");
    res.cookies.set(ACCESS_COOKIE, "", base);
    res.cookies.set(REFRESH_COOKIE, "", base);
    res.cookies.set(SUMMONER_ICON_COOKIE, "", base);

    (await cookieStore).delete(ACCESS_COOKIE);
    (await cookieStore).delete(REFRESH_COOKIE);
    (await cookieStore).delete(SUMMONER_ICON_COOKIE);
    console.log("✅ 쿠키 삭제 완료");

    return res;
  } catch (e) {
    console.error("❌ 로그아웃 처리 중 오류:", e);
    return NextResponse.json(
      { ok: false },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
