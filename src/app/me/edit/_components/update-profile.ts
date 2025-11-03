import { patchToAPI } from "@/utils/patcher";

/* 폼 수정 */
export async function updateProfile(formData: FormData) {
  const payload = Object.fromEntries(formData.entries());

  await patchToAPI("/me", {
    body: payload,
  });
}
