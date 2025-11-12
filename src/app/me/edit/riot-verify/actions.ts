"use server";

import { deleteFromAPI, postToAPI } from "@/utils/patcher";
import { refresher } from "@/utils/refresher";

/* 라이엇 연동 요청 */
export async function RiotVerify(formData: FormData) {
  const payload = Object.fromEntries(formData.entries());

  const res = await postToAPI("/me/rso", {
    body: payload,
  });

  if (res.ok) {
    await refresher();
  }

  if (!res.ok) {
    await refresher();
  }
  return { ok: true as const, error: null };
}

export type DeleteRiotVerifyResult =
  | { ok: true; status: number; data: any }
  | { ok: false; status: number; detail: string };

/* 라이엇 연동 해제 */
export async function DeleteRiotVerify() {
  const hit = async () => {
    const res = await deleteFromAPI("/me/rso");
    const data = await res.json().catch(() => null);
    return { res, data };
  };

  try {
    let { res, data } = await hit();
    // 성공 처리
    if (res.ok) {
      // 토큰/세션 상태 최신화
      await refresher();
      return {
        ok: true as const,
        status: res.status,
        data,
      };
    }

    // 실패 처리
    console.error("❌ [DeleteRiotVerify] Error Response:", {
      status: res.status,
      body: data,
    });
    return {
      ok: false as const,
      status: res.status,
      detail: data?.detail ?? "연동 해제에 실패했습니다.",
    };
  } catch (err) {
    console.error("❌ [DeleteRiotVerify] Unexpected Error:", err);
    return {
      ok: false as const,
      status: 0,
      detail: "네트워크 또는 알 수 없는 오류입니다.",
    };
  }
}
