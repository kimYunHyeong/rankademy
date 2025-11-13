"use server";

import { deleteFromAPI, patchToAPI } from "@/utils/patcher";

/* 유저 프로필 수정 */
export async function updateProfile(formData: FormData) {
  const payload = Object.fromEntries(formData.entries());

  await patchToAPI("/me", {
    body: payload,
  });
}

export async function deleteUnivInfo() {
  await deleteFromAPI(`/me/univ`);
}
