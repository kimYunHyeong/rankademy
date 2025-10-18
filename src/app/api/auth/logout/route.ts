import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();

  // 즉시 만료
  (await cookieStore).set("access_token", "", { path: "/", maxAge: 0 });
  (await cookieStore).set("refresh_token", "", { path: "/", maxAge: 0 });

  return NextResponse.json({ ok: true });
}
