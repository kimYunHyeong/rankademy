import { NextResponse } from "next/server";
import {
  getAccessTokenFromCookie,
  getSummonerIconFromCookie,
} from "@/lib/auth";

export const dynamic = "force-dynamic"; // SSR 강제 (중요!)

export async function GET(req: Request) {
  const accessToken = await getAccessTokenFromCookie();
  const summonerIcon = await getSummonerIconFromCookie();
  const isAuthenticated = !!accessToken;

  return NextResponse.json(
    {
      isAuthenticated,
      summonerIcon: summonerIcon ?? null,
    },
    { status: 200, headers: { "Cache-Control": "no-store" } }
  );
}
