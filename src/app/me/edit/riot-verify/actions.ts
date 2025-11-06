"use server";

import { deleteFromAPI, postToAPI } from "@/utils/patcher";

/* 라이엇 인증 요청 */
export async function RiotVerify(formData: FormData) {
  const payload = Object.fromEntries(formData.entries());

  await postToAPI("/me/rso", {
    body: payload,
  });

  return { ok: true as const, error: null };
}

/* 라이엇 인증 해제 */
export async function DeleteRiotVerify() {
  await deleteFromAPI("/me/rso");
}
