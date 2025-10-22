// src/utils/fetcher.ts
import { API_BASE_URL } from "@/lib/api";
import { cookies } from "next/headers";

/**
 * 서버 전용 fetcher
 * - 쿠키에서 accessToken을 읽어서 Authorization 헤더 자동 추가
 * - 요청/응답 콘솔 출력 포함
 */
export async function fetchFromAPI<T = unknown>(endpoint: string): Promise<T> {
  // ✅ 쿠키에서 accessToken 읽기
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = accessToken.startsWith("Bearer ")
      ? accessToken
      : `Bearer ${accessToken}`;
  }

  // ✅ URL 생성
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint}`;

  // ✅ 요청 로그 출력
  console.log("📤 [API Request]");
  console.log("URL:", url);
  console.log("Headers:", headers);

  const res = await fetch(url, {
    headers,
    cache: "no-store", // SSR 시 최신 데이터 보장
    credentials: "include", // 쿠키 포함
  });

  // ✅ 응답 로그 출력
  console.log("📥 [API Response]");
  console.log("Status:", res.status, res.statusText);

  const cloned = res.clone();
  let bodyText = "";
  try {
    bodyText = await cloned.text();
    console.log("Response Body:", bodyText);
  } catch (e) {
    console.warn("⚠️ 응답 본문을 읽을 수 없음:", e);
  }

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} - ${bodyText.slice(0, 300)}`);
  }

  try {
    return JSON.parse(bodyText) as T;
  } catch {
    return bodyText as unknown as T;
  }
}
