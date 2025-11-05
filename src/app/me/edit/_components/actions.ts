"use server";

import { patchToAPI } from "@/utils/patcher";

/* 유저 프로필 수정 */
export async function updateProfile(formData: FormData) {
  const payload = Object.fromEntries(formData.entries());

  await patchToAPI("/me", {
    body: payload,
  });
}
