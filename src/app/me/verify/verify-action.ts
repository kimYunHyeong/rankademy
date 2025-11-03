import { postToAPI } from "@/utils/patcher";

/* 그룹 가입 요청 */
export async function sendEmail(email: string) {
  "use server";

  await postToAPI(`/me/univ-email/send`);
  return { ok: true as const, error: null };
}

/* 이메일 코드 확인 */
export async function verifyCode(code: number | string) {
  "use server";

  await postToAPI(`/me/univ-email/certify?code=${code}`);
  return { ok: true as const, error: null };
}
