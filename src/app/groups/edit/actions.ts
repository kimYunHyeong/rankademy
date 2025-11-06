// app/groups/edit/actions.ts
"use server";

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
