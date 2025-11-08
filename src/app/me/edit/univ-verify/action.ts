import { postToAPI } from "@/utils/patcher";

/* 학교 인증 요청 */
export async function sendEmail(univName: string, email: string) {
  "use server";

  await postToAPI(`/me/univ-email/send?univName=${univName}&email=${email}`);
  return { ok: true as const, error: null };
}

/* 이메일 코드 확인 */
export async function verifyCode(email: string, code: number | string) {
  "use server";

  await postToAPI(`/me/univ-email/certify?email=${email}&code=${code}`);
  return { ok: true as const, error: null };
}
