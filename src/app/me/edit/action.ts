"use server";

import { patchToAPI } from "@/utils/patcher";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData) {
  const payload = Object.fromEntries(formData.entries());

  await patchToAPI("/me", {
    body: payload,
  });

  redirect("/me");
}
