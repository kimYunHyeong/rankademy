"use server";

import { ImageUrl, ImageUrlRes } from "@/types";
import { postToAPI } from "@/utils/patcher";

export type CreateGroupResult =
  | { ok: true; error: null }
  | {
      ok: false;
      error: {
        status?: number;
        title?: string;
      };
    };

/* 그룹 생성 요청 */
export async function createGroup(
  formData: FormData
): Promise<CreateGroupResult> {
  const payload = Object.fromEntries(formData.entries());

  try {
    await postToAPI("/groups", { body: payload });
    return { ok: true, error: null };
  } catch (e: any) {
    // 서버에서 alert 금지: 에러 정보만 묶어서 반환
    return {
      ok: false,
      error: {
        status: e?.status,
        title: e?.title,
      },
    };
  }
}

/* 그룹 이미지 업로드 URL 받기 */
export async function uploadGroupLogo(payload: ImageUrl[]) {
  const data = await postToAPI("/storage/pre-signed/batch", { body: payload });
  return data as ImageUrlRes[];
}
