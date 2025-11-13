"use server";

import "server-only";
import { API_BASE_URL } from "@/lib/api";
import type { Query } from "@/types";
import { cookies } from "next/headers"; // 서버에서 쿠키 접근 가능
import { redirect } from "next/navigation";

export async function fetchFromAPI(endpoint: string, query?: Query) {
  //URL 직렬화
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

  // 쿠키에서 accessToken 읽기
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;

  // 실제 요청
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken ?? ""}`,
      Accept: "application/json",
    },
    cache: "no-store",
    next: { revalidate: 0 },
  });

  const text = await res
    .clone()
    .text()
    .catch(() => "(no body)");

  // 요청 로그
  console.log("\n==============================");
  console.log("📡 [fetchFromAPI] Request");
  console.log("URL:", url.toString());
  console.log("Method: GET");
  console.log(`Authorization:Bearer ${accessToken}`);
  if (accessToken) {
    console.log(
      "Access Token (first 20 chars):",
      accessToken.slice(0, 20) + "..."
    );
  } else {
    console.log("엑세스토큰이 없습니다.");
  }
  console.log("==============================");

  // 응답 로그
  console.log("📥 [fetchFromAPI] Response");
  console.log("Status:", res.status, res.statusText);
  console.log("Response Body:", text.slice(0, 300));
  console.log("==============================\n");

  // 에러 처리
  if (!res.ok) {
    if (res.status === 401) {
      console.warn(
        "[에러코드]: 401(Unauthorized) — No or invalid access token."
      );
      res.status;
      text;

      redirect("/login");
    }

    if (res.status === 404) {
      console.warn("[에러코드]: 404(Not Found) — Page Does NOT Exists.");
      redirect("/404");
    }

    // 그 외의 에러는 status와 detail 반환
    console.error(`❌ [fetchFromAPI] API Error: ${res.status}`);
    return {
      ok: false as const,
      status: res.status,
      detail:
        text.slice(0, 300) ||
        `[에러코드]: ${res.status} - 서버 응답이 없습니다.`,
    };
  }

  // JSON 파싱
  try {
    const data = JSON.parse(text);
    return {
      ok: true as const,
      status: res.status,
      data,
    };
  } catch {
    return {
      ok: true as const,
      status: res.status,
      data: text,
    };
  }
}
