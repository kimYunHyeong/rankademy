// app/api/auth/status/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

function decodeJwtPayload(token: string) {
  try {
    const [, payload] = token.split(".");
    const json = Buffer.from(
      payload.replace(/-/g, "+").replace(/_/g, "/"),
      "base64"
    ).toString("utf8");
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export async function GET() {
  // 서버 쿠키 기반 확인 (쿠키를 쓰지 않으면 대부분 null)
  const access = (await cookies()).get("access_token")?.value;

  if (!access) {
    // 쿠키 미사용이면 항상 false 반환
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  const payload = decodeJwtPayload(access);
  return NextResponse.json(
    {
      authenticated: true,
      user: payload
        ? {
            id: payload.id,
            email: payload.sub,
            summonerName: payload.summonerName,
            role: payload.role,
          }
        : null,
    },
    { status: 200 }
  );
}
