// fetcher.server.ts
"use server";
import "server-only";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/api";
import { redirect } from "next/navigation";
import type { Query } from "@/types";

export async function fetchFromAPI(endpoint: string, query?: Query) {
  // 🔐 accessToken (쿠키에서)
  const cookieStore = await cookies();
  const rawToken = cookieStore.get("accessToken")?.value ?? null;

  const auth = rawToken
    ? rawToken.startsWith("Bearer ")
      ? rawToken
      : `Bearer ${rawToken}`
    : undefined;

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

  console.log("\n==============================");
  console.log("📡 [fetchFromAPI] Request");
  console.log("URL:", url.toString());
  console.log("==============================");

  const res = await fetch(url, {
    method: "GET",
    headers: {
      ...(auth ? { Authorization: auth } : {}),
    },
    cache: "no-store",
  });

  const clone = res.clone();
  const text = await clone.text().catch(() => "(no body)");

  console.log("📥 [fetchFromAPI] Response");
  console.log("Status:", res.status, res.statusText);
  console.log("Response Body:", text.slice(0, 500));
  console.log("==============================\n");

  if (!res.ok) {
    if (res.status === 401) {
      redirect("/login");
    }
    throw new Error(`API Error: ${res.status} ${text.slice(0, 400)}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
