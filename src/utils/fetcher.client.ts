"use client";
import { API_BASE_URL } from "@/lib/api";
import { buildURL, Query } from "./build-url";

type Opts = Omit<RequestInit, "headers"> & {
  query?: Query;
  headers?: Record<string, string>;
  tokenOverride?: string | null;
};

export async function clientFetchFromAPI(endpoint: string, opts: Opts = {}) {
  const { query, tokenOverride, headers: extraHeaders, ...rest } = opts;

  // ✅ 로컬스토리지 토큰 확인
  const lsToken =
    typeof window !== "undefined"
      ? (() => {
          try {
            return localStorage.getItem("accessToken");
          } catch {
            return null;
          }
        })()
      : null;

  const auth = (tokenOverride ?? lsToken) || undefined;
  const url = buildURL(API_BASE_URL, endpoint, query);

  // ✅ 요청 로깅
  console.groupCollapsed(
    `%c📡 [clientFetchFromAPI] Request → ${url}`,
    "color:#FF5679;font-weight:bold"
  );
  console.log("🔹 Method:", rest.method ?? "GET");
  if (query) console.log("🔹 Query:", query);
  if (extraHeaders) console.log("🔹 Extra Headers:", extraHeaders);
  if (auth) console.log("🔹 Authorization:", auth);
  if (rest.body) {
    try {
      const bodyStr =
        typeof rest.body === "string"
          ? rest.body
          : JSON.stringify(rest.body, null, 2);
      console.log("🔹 Body:", bodyStr);
    } catch {
      console.log("🔹 Body: [unserializable]");
    }
  } else {
    console.log("🔹 Body: (none)");
  }
  console.groupEnd();

  const started = performance.now();

  const res = await fetch(url, {
    ...rest,
    headers: {
      ...(extraHeaders ?? {}),
      ...(auth ? { Authorization: auth } : {}),
    },
    credentials: "include",
  });

  const elapsed = (performance.now() - started).toFixed(1);

  // ✅ 응답 로깅
  const clone = res.clone();
  let text = "";
  try {
    text = await clone.text();
  } catch {
    text = "(no body)";
  }

  console.groupCollapsed(
    `%c📥 [clientFetchFromAPI] Response (${res.status}) [${elapsed}ms]`,
    res.ok ? "color:lightgreen;font-weight:bold" : "color:red;font-weight:bold"
  );
  console.log("🔸 Status Text:", res.statusText);
  console.log("🔸 Response Body (preview):", text.slice(0, 1000));
  console.groupEnd();

  // ✅ 에러 처리
  if (!res.ok) {
    console.error(
      "%c❌ [clientFetchFromAPI] API Error:",
      "color:red;font-weight:bold",
      { status: res.status, body: text.slice(0, 400) }
    );
    throw new Error(`API Error: ${res.status} ${text.slice(0, 400)}`);
  }

  // ✅ JSON 파싱
  let json: any;
  try {
    json = JSON.parse(text);
  } catch {
    json = text;
  }

  // ✅ 결과 로그
  console.log(
    "%c✅ [clientFetchFromAPI] Parsed JSON:",
    "color:#FF5679;font-weight:bold",
    json
  );

  return json;
}
