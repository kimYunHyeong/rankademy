"use server";

import { API_BASE_URL } from "@/lib/api";
import { cookies } from "next/headers";

type RefreshRes = {
  email: string;
  accessToken: string;
  refreshToken: string;
  summonerIcon: number | null;
};

export async function refresher(searchParams?: { refreshToken?: string }) {
  const cookieStore = cookies();
  const refreshFromCookie = (await cookieStore).get("refreshToken")?.value;
  const accessToken = (await cookieStore).get("accessToken")?.value;
  const refreshToken = searchParams?.refreshToken ?? refreshFromCookie;

  if (!refreshToken) {
    console.error("❌ [refresher] refreshToken이 없습니다.");
    throw new Error("refreshToken이 없습니다.");
  }

  // ✅ 요청 로그
  console.log("✍️ [refresher] Request");
  console.log("URL:", `${API_BASE_URL}/auth/refresh`);
  console.log("Method: GET");
  console.log("Headers:", { Authorization: `Bearer ${accessToken}` });

  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "GET",
    headers: {
      Refresh: `Bearer ${refreshToken}`,
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
    next: { revalidate: 0 },
  });

  // ✅ 응답 상태 로그
  console.log("📥 [refresher] Response status:", res.status, res.statusText);

  const rawText = await res.text(); // JSON 파싱 전 원문 확보
  console.log("📥 [refresher] Raw response text:", rawText);

  if (!res.ok) {
    console.error("❌ [refresher] 토큰 갱신 실패:", res.status, res.statusText);
    throw new Error(`토큰 갱신 실패: ${res.status} ${res.statusText}`);
  }

  let data: RefreshRes;
  try {
    data = JSON.parse(rawText);
  } catch (e) {
    console.error("❌ [refresher] JSON 파싱 실패:", e);
    throw new Error("응답 JSON 파싱 실패");
  }

  console.log("✅ [refresher] Parsed JSON:", data);

  // ✅ 쿠키 저장 로그
  console.log("🍪 [refresher] Setting cookies...");
  (await cookieStore).set("accessToken", data.accessToken);
  (await cookieStore).set("refreshToken", data.refreshToken);

  const iconValue = data.summonerIcon;
  if (iconValue === null || iconValue === undefined) {
    // null이면 쿠키 삭제 (값을 "null"로 저장하는 대신 제거)
    (await cookieStore).delete("summonerIcon");
    console.log("🧹 [refresher] summonerIcon cookie removed (null)");
  } else {
    // 값이 있으면 문자열로 저장
    (await cookieStore).set("summonerIcon", String(iconValue));
  }
}
