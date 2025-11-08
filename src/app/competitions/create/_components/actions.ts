"use server";

import { postToAPI } from "@/utils/patcher";

/* 팀 생성 요청 */
export async function createTeam(formData: FormData) {
  const payload = Object.fromEntries(formData.entries());
  await postToAPI(`/teams`, {
    body: payload,
  });
}
