// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  // 서버가 쿠키를 쓰는 경우 대비해서 즉시 만료
  const res = NextResponse.json({ ok: true });

  // 만약 도메인/경로가 있다면 동일하게 맞춰야 함 (예: domain: ".rankademy.kr", path: "/")
  res.cookies.set({
    name: "access_token",
    value: "",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(0), // 즉시 만료
  });

  res.cookies.set({
    name: "refresh_token",
    value: "",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });

  return res;
}
