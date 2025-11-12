"use server";
import { postToAPI } from "@/utils/patcher";
import { refresher } from "@/utils/refresher";
import { redirect } from "next/navigation";

/* 학교 인증 요청 */
export async function sendEmail(univName: string, email: string) {
  await postToAPI(`/me/univ-email/send?univName=${univName}&email=${email}`);
  return { ok: true as const, error: null };
}

/* 이메일 코드 확인 */
export async function verifyCode(email: string, code: number | string) {
  const res = await postToAPI(
    `/me/univ-email/certify?email=${email}&code=${code}`
  );

  console.log(res);

  if (res.ok && res.status === 200) {
    await refresher();
  }

  return { ok: res?.ok ?? false, error: res?.error ?? null };
}
