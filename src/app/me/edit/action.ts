"use server";

import { patchToAPI } from "@/utils/patcher";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData) {
  // FormData -> JSON 변환 (필요한 키만 추출)
  const body = Object.fromEntries(formData);

  await patchToAPI(`/me`, {
    body: {
      username: "김윤형18",
      description: "string",
      mainPosition: "BOTTOM",
      subPosition: "JUNGLE",
    },
  });

  // 필요 시 화면 갱신
  redirect("/me");
}
