// src/utils/fetcher.ts
import { API_BASE_URL } from "@/lib/api";
import type { Query } from "@/types";

export async function fetchFromAPI(endpoint: string, query?: Query) {
  // 1) URL + 쿼리 직렬화
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  if (query) {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(query)) {
      if (v === undefined || v === null) continue;
      if (typeof v === "number" && Number.isNaN(v)) continue;
      const val = String(v);
      if (val.length === 0) continue;
      sp.set(k, val);
    }
    const qs = sp.toString();
    if (qs) url.search = qs;
  }

  // 2) 브라우저에서만 accessToken 읽기
  let accessToken: string | null = null;
  if (typeof window !== "undefined") {
    try {
      accessToken = window.localStorage.getItem("accessToken");
    } catch {
      // storage 접근 실패는 무시
    }
  }

  // 3) 로깅
  console.log("\n==============================");
  console.log("📡 [fetchFromAPI] Request");
  console.log("URL:", url.toString());
  console.log("With Authorization:", Boolean(accessToken));
  console.log("==============================");

  // 4) 요청
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

  const res = await fetch(url.toString(), {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const text = await res
    .clone()
    .text()
    .catch(() => "(no body)");

  console.log("📥 [fetchFromAPI] Response");
  console.log("Status:", res.status, res.statusText);
  console.log("Response Body:", text.slice(0, 500));
  console.log("==============================\n");

  // 5) 에러 처리
  if (!res.ok) {
    if (res.status === 401 && typeof window !== "undefined") {
      window.location.assign("/login");
    }
    throw new Error(`API Error: ${res.status} ${text.slice(0, 400)}`);
  }

  // 6) JSON 우선 파싱
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
