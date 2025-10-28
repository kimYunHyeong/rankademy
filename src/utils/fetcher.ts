"use server";

import "server-only";
import { API_BASE_URL } from "@/lib/api";
import type { Query } from "@/types";
import { cookies } from "next/headers"; // 서버에서 쿠키 접근 가능
import { redirect } from "next/navigation";

export async function fetchFromAPI(endpoint: string, query?: Query) {
  // 1️⃣ URL 직렬화
  const url = new URL(`${API_BASE_URL}${endpoint}`);

  /* 쿼리 파라미터 변경 */
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

  // 2️⃣ 쿠키에서 accessToken 읽기 (httpOnly 쿠키)
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;

  // 3️⃣ 요청 헤더 구성
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  // 4️⃣ 요청 로그
  console.log("\n==============================");
  console.log("📡 [fetchFromAPI] Request");
  console.log("URL:", url.toString());
  console.log("Method: GET");
  console.log("Headers:", headers);
  if (accessToken) {
    console.log(
      "Access Token (first 20 chars):",
      accessToken.slice(0, 20) + "..."
    );
  } else {
    console.log("엑세스토큰이 없습니다.");
  }
  console.log("==============================");

  // 5️⃣ 실제 요청
  const res = await fetch(url.toString(), {
    headers,
    cache: "no-store",
  });

  const text = await res
    .clone()
    .text()
    .catch(() => "(no body)");

  // 6️⃣ 응답 로그
  console.log("📥 [fetchFromAPI] Response");
  console.log("Status:", res.status, res.statusText);
  console.log("Response Body:", text.slice(0, 300));
  console.log("==============================\n");

  // 7️⃣ 에러 처리
  if (!res.ok) {
    if (res.status === 401) {
      console.warn("❌ Unauthorized (401) — No or invalid access token.");
      redirect("/login");
    }
    throw new Error(`API Error: ${res.status} ${text.slice(0, 200)}`);
  }

  // 8️⃣ JSON 파싱
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
