"use server";

import { API_BASE_URL } from "@/lib/api";
import { CreateTeamFormBody } from "./createTeamForm";
import { cookies } from "next/headers";

/* 팀 생성 요청 */

export async function createTeam(body: CreateTeamFormBody) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;

  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  console.log("📤 [createTeam] Request Body:", body);
  console.log("📤 [createTeam] JSON Body:", JSON.stringify(body, null, 2));

  try {
    const res = await fetch(`${API_BASE_URL}/teams`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("❌ [createTeam] Error Response:", data);
      return {
        ok: false,
        status: res.status,
        detail: data?.detail ?? "요청 중 오류가 발생했습니다.",
      };
    }

    console.log("📥 [createTeam] Response:", data);
    return { ok: true, status: res.status, data };
  } catch (err: any) {
    console.error("💥 [createTeam] Network/Server Error:", err);
    return {
      ok: false,
      status: 500,
      detail: err?.message ?? "서버 연결 중 오류가 발생했습니다.",
    };
  }
}
