import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// (선택) JWT payload만 슬쩍 읽고 싶을 때 — 서명 검증은 하지 않음
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
  const access = (await cookies()).get("access_token")?.value;

  if (!access) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  const payload = decodeJwtPayload(access); // { sub, id, summonerName, ... } 일 수 있음
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
