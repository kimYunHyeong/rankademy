"use server";

import { postToAPI } from "@/utils/patcher";
import { OcrResult } from "@/types";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/api";
import { RegisterCompeitionResult } from "./CompetitionResultForm";

/* OCR 결과 요청 */
export async function requestOCRResult(formData: FormData): Promise<OcrResult> {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;

  const headers = new Headers();
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  console.log("📤 [requestOCRResult] Sending FormData entries:");
  for (const [key, value] of formData.entries()) {
    console.log(`   ${key}:`, value);
  }

  try {
    const res = await fetch("https://ocr.rankademy.kr/game-result", {
      method: "POST",
      headers,
      body: formData, // ✅ FormData 그대로 전송
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("❌ [requestOCRResult] Error Response:", data);

      // ✅ HTTP 500 전용 메시지 전달
      if (res.status === 500) {
        throw new Error(
          "이미지와 팀 유저 닉네임들이 매칭되지 않습니다. 캡쳐를 다시 시도해주세요"
        );
      }

      // 그 외 에러는 일반 메시지
      throw new Error(data?.detail ?? `HTTP ${res.status}`);
    }

    console.log("📥 [requestOCRResult] Response:", data);

    return {
      winner: data.winner,
      loser: data.loser,
      gameTime: data.gameTime,
    } as OcrResult;
  } catch (err: any) {
    console.error("💥 [requestOCRResult] Network/Server Error:", err);
    throw new Error(err?.message ?? "서버 연결 중 오류가 발생했습니다.");
  }
}

/* 대항전 결과 등록 요청 */
export async function registerCompetitionResult(
  competitionId: number,
  body: RegisterCompeitionResult
) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;

  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  console.log("📤 [createScrimTeam] Request Body:", body);
  console.log("📤 [createScrimTeam] JSON Body:", JSON.stringify(body, null, 2));

  try {
    const res = await fetch(
      `${API_BASE_URL}/competitions/${competitionId}/results`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }
    );

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("❌ [createScrimTeam] Error Response:", data);
      return {
        ok: false,
        status: res.status,
        detail: data?.detail ?? "요청 중 오류가 발생했습니다.",
      };
    }

    console.log("📥 [createScrimTeam] Response:", data);
    return { ok: true, status: res.status, data };
  } catch (err: any) {
    console.error("💥 [createScrimTeam] Network/Server Error:", err);
    return {
      ok: false,
      status: 500,
      detail: err?.message ?? "서버 연결 중 오류가 발생했습니다.",
    };
  }
}
