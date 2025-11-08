"use server";

import { postToAPI } from "@/utils/patcher";

/* 스크림 팀 생성 요청 */
export async function createScrimTeam(formData: FormData) {
  const payload = Object.fromEntries(formData.entries());

  await postToAPI(`/scrim-teams`, {
    body: payload,
  });
}
