"use server";
import "server-only";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/api";
import { buildURL, Query } from "./build-url";

type Opts = Omit<RequestInit, "headers"> & {
  query?: Query;
  headers?: Record<string, string>;
  tokenOverride?: string | null;
};

export async function serverFetchFromAPI(endpoint: string, opts: Opts = {}) {
  const { query, tokenOverride, headers: extraHeaders, ...rest } = opts;

  const cookieStore = await cookies();
  const rawToken =
    tokenOverride ?? cookieStore.get("accessToken")?.value ?? null;
  const auth = rawToken
    ? rawToken.startsWith("Bearer ")
      ? rawToken
      : `Bearer ${rawToken}`
    : undefined;

  const url = buildURL(API_BASE_URL, endpoint, query);

  // ✅ 요청 로그
  console.log("\n==============================");
  console.log("📡 [serverFetchFromAPI] Request");
  console.log("URL:", url);
  console.log("Method:", rest.method ?? "GET");
  console.log("Headers:", {
    ...(extraHeaders ?? {}),
    ...(auth ? { Authorization: auth } : {}),
  });

  if (rest.body) {
    try {
      const bodyStr =
        typeof rest.body === "string"
          ? rest.body
          : JSON.stringify(rest.body, null, 2);
      console.log("Body:", bodyStr);
    } catch {
      console.log("Body: [unserializable]");
    }
  } else {
    console.log("Body: (none)");
  }

  console.log("==============================");

  const res = await fetch(url, {
    ...rest,
    headers: {
      ...(extraHeaders ?? {}),
      ...(auth ? { Authorization: auth } : {}),
    },
    cache: "no-store",
  });

  // ✅ 응답 로그
  const clone = res.clone(); // response body는 스트림이므로 clone 필요
  const text = await clone.text().catch(() => "(no body)");

  console.log("📥 [serverFetchFromAPI] Response");
  console.log("Status:", res.status, res.statusText);
  console.log("Response Body:", text.slice(0, 1000)); // 너무 길면 잘라서
  console.log("==============================\n");

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${text.slice(0, 400)}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
