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

/* 라이엇 연동 해제 */
export async function DeleteRiotVerify() {
  const res = await deleteFromAPI("/me/rso");
  if (res.ok) {
    await refresher();
  }

  return { ok: true as const, error: null };
}
