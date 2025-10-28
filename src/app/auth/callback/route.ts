import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const summonerIcon = searchParams.get("summonerIcon");

    if (!accessToken || !refreshToken) {
      return NextResponse.redirect(
        new URL("/login?error=set_cookie_failed", req.url)
      );
    }

    const opts = {
      httpOnly: true,
      secure: true, // 로컬 http라면 false로 테스트 가능. 프로덕션은 true
      sameSite: "lax" as const,
      path: "/",
      // expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 필요시
    };

    (await cookies()).set("accessToken", accessToken, opts);
    (await cookies()).set("refreshToken", refreshToken, opts);

    if (summonerIcon !== null) {
      (await cookies()).set("summonerIcon", String(summonerIcon), opts);
    }

    // 원하는 페이지로
    return NextResponse.redirect(new URL("/", req.url));
  } catch (e) {
    console.error("callback error", e);
    return NextResponse.redirect(
      new URL("/login?error=set_cookie_failed", req.url)
    );
  }
}
