import { NextRequest, NextResponse } from "next/server";

const LOG = true; // 필요 시 환경변수로 제어

export async function POST(req: NextRequest) {
  const headersIn: Record<string, string> = {};
  req.headers.forEach((v, k) => (headersIn[k] = v));

  let payload: any = {};
  try {
    payload = await req.json();
  } catch {}

  const { accessToken, refreshToken, summonerIcon, userId } = payload ?? {};

  if (LOG) {
    console.log("\n[set-cookie] incoming");
    console.log("headers:", headersIn);
    console.log("body:", {
      hasAccessToken: !!accessToken,
      accessHead: accessToken?.slice(0, 12),
      hasRefreshToken: !!refreshToken,
      refreshHead: refreshToken?.slice(0, 12),
      summonerIcon,
    });
  }

  if (!accessToken || !refreshToken) {
    return NextResponse.json(
      { ok: false, error: "missing_token" },
      { status: 400 }
    );
  }

  const isProd = process.env.NODE_ENV === "production";
  const secure = isProd; // dev=false, prod=true

  const res = NextResponse.json({ ok: true });

  res.cookies.set({
    name: "accessToken",
    value: accessToken,
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 15,
  });

  res.cookies.set({
    name: "refreshToken",
    value: refreshToken,
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });

  if (summonerIcon) {
    res.cookies.set({
      name: "summonerIcon",
      value: String(summonerIcon),
      httpOnly: false,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  if (userId) {
    res.cookies.set({
      name: "userId",
      value: String(userId),
      httpOnly: false,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  if (LOG) {
    console.log("[set-cookie] cookies set. secure:", secure);
  }

  return res;
}
