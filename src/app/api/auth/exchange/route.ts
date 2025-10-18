import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ACCESS_MAX_AGE = 60 * 15; // 15분 (예시)
const REFRESH_MAX_AGE = 60 * 60 * 24 * 7; // 7일 (예시)

export async function POST(req: Request) {
  try {
    const { accessToken, refreshToken } = await req.json();

    if (!accessToken || !refreshToken) {
      return NextResponse.json({ error: "missing_token" }, { status: 400 });
    }

    // (선택) 여기서 백엔드에 토큰 검증/프로필 조회를 해도 됨.

    const isSecure = process.env.NODE_ENV === "production";
    const cookieStore = cookies();

    (await cookieStore).set("access_token", accessToken, {
      httpOnly: true,
      secure: isSecure,
      sameSite: "lax",
      path: "/",
      maxAge: ACCESS_MAX_AGE,
    });

    (await cookieStore).set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: isSecure,
      sameSite: "lax",
      path: "/",
      maxAge: REFRESH_MAX_AGE,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }
}
