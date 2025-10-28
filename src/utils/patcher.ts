import { API_BASE_URL } from "@/lib/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type MutateMethod = "POST" | "PATCH" | "DELETE";

interface MutateOptions {
  method?: MutateMethod;
  body?: unknown | FormData; // 객체/배열/원시값 or FormData
  headers?: HeadersInit; // 들어오는 건 HeadersInit
}

/* 응답 본문 파싱 */
async function safeParse(res: Response) {
  const text = await res
    .clone()
    .text()
    .catch(() => "(no body)");
  try {
    return { parsed: JSON.parse(text), raw: text };
  } catch {
    return { parsed: text, raw: text };
  }
}

/**
 * 쓰기 계열 요청 공통 유틸 (PATCH 기본)
 * - 서버 전용
 * - httpOnly accessToken 쿠키를 Authorization 헤더로 첨부
 * - 401이면 /login 으로 redirect
 * - FormData면 Content-Type 자동 처리(명시 X)
 */
export async function mutateAPI(
  endpoint: string,
  { method = "PATCH", body, headers: extraHeaders }: MutateOptions = {}
) {
  // 1) URL
  const url = new URL(`${API_BASE_URL}${endpoint}`);

  // 2) accessToken
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;

  // 3) 헤더: 항상 Headers 인스턴스로 승격해서 조작
  const headers = new Headers(extraHeaders);

  // 4) 바디 구성 & Content-Type
  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;

  let payload: BodyInit | undefined;
  if (isFormData) {
    // FormData는 경계값 자동 → Content-Type 설정 금지
    payload = body as FormData;
  } else if (body !== undefined) {
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    payload = JSON.stringify(body);
  }

  // 5) 인증 헤더
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  // 6) 요청 로그
  console.log("\n==============================");
  console.log("✍️ [mutateAPI] Request");
  console.log("URL:", url.toString());
  console.log("Method:", method);
  console.log("Headers:", Object.fromEntries(headers.entries()));

  if (!isFormData && payload) {
    console.log("Body (preview):", String(payload).slice(0, 300));
  } else if (isFormData) {
    console.log("Body: [FormData]");
  }
  console.log("==============================");

  // 7) 실제 요청
  const res = await fetch(url.toString(), {
    method,
    headers, // Headers 인스턴스 그대로 전달
    body: payload,
    cache: "no-store",
  });

  // 8) 응답 파싱 + 로그
  const { parsed, raw } = await safeParse(res);
  console.log("📥 [mutateAPI] Response");
  console.log("Status:", res.status, res.statusText);
  console.log("Response Body:", String(raw).slice(0, 300));
  console.log("==============================\n");

  // 9) 에러 처리
  if (!res.ok) {
    if (res.status === 401) {
      console.warn("❌ Unauthorized (401) — No or invalid access token.");
      redirect("/login");
    }
    throw new Error(`API Error: ${res.status} ${String(raw).slice(0, 500)}`);
  }

  return parsed;
}

/** 편의 래퍼들 */
export const postToAPI = (
  endpoint: string,
  opts: Omit<MutateOptions, "method"> = {}
) => mutateAPI(endpoint, { ...opts, method: "POST" });

export const patchToAPI = (
  endpoint: string,
  opts: Omit<MutateOptions, "method"> = {}
) => mutateAPI(endpoint, { ...opts, method: "PATCH" });

export const deleteFromAPI = (
  endpoint: string,
  opts: Omit<MutateOptions, "method" | "body"> = {}
) => mutateAPI(endpoint, { ...opts, method: "DELETE" });
