"use server";

import { postToAPI } from "@/utils/patcher";

/*  그룹 가입 요청 시작 */
export async function sendGroupInvitation(groupId: number, userId: number) {
  await postToAPI(`/groups/${groupId}/invitation/send?userId=${userId}`);
}
