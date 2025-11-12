import { cookies } from "next/headers";

export const ACCESS_COOKIE = "accessToken";
export const REFRESH_COOKIE = "refreshToken";
export const SUMMONER_ICON_COOKIE = "summonerIcon";
export const USER_ID = "userId";

// 필요 시: JWT exp 확인용
export function parseJwt<T = any>(token: string): T | null {
  try {
    const [, payload] = token.split(".");
    return JSON.parse(Buffer.from(payload, "base64").toString("utf-8"));
  } catch {
    return null;
  }
}

type SetTokensParams = {
  accessToken: string;
  refreshToken: string;
  // 선택: 각각 만료 초 (백엔드에서 내려주면 그대로 쓰는 걸 추천)
  accessMaxAgeSec?: number;
  refreshMaxAgeSec?: number;
};

export async function setTokens({
  accessToken,
  refreshToken,
  accessMaxAgeSec = 60 * 15, // 예: 15분
  refreshMaxAgeSec = 60 * 60 * 24 * 14, // 예: 14일
}: SetTokensParams) {
  const cookieStore = cookies();
  (await cookieStore).set(ACCESS_COOKIE, accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax", // SPA이면 lax 권장
    path: "/",
    maxAge: accessMaxAgeSec,
  });
  (await cookieStore).set(REFRESH_COOKIE, refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: refreshMaxAgeSec,
  });
}

export async function clearTokens() {
  const cookieStore = cookies();
  (await cookieStore).delete(ACCESS_COOKIE);
  (await cookieStore).delete(REFRESH_COOKIE);
}

export async function getAccessTokenFromCookie() {
  return (await cookies()).get(ACCESS_COOKIE)?.value ?? null;
}

export async function getRefreshTokenFromCookie() {
  return (await cookies()).get(REFRESH_COOKIE)?.value ?? null;
}

export async function getSummonerIconFromCookie(): Promise<number | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(SUMMONER_ICON_COOKIE)?.value;

  if (!value) return null; // 쿠키 없음

  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed; // 숫자로 변환 (NaN 방지)
}

export async function getIsAuthenticated() {
  const accessToken = await getAccessTokenFromCookie();

  if (!accessToken) {
    return { isAuthenticated: false, summonerIcon: null };
  }

  const raw = await getSummonerIconFromCookie();
  const cleaned = !raw || raw === null || raw === undefined ? null : raw;

  const num = cleaned === null ? null : Number(cleaned);
  const summonerIcon = Number.isNaN(num) ? null : num;

  return { isAuthenticated: true, summonerIcon };
}
