"use server";

import { postToAPI, patchToAPI } from "@/utils/patcher";

/* 초대 수락 */
export async function acceptGroupJoinRequest(
  groupId: number,
  requestorId: number
) {
  await patchToAPI(`/groups/${groupId}/join-requests/${requestorId}/accept`);
}

/* 초대 거절 */
export async function rejectGroupJoinRequest(
  groupId: number,
  requestorId: number
) {
  await patchToAPI(`/groups/${groupId}/join-requests/${requestorId}/reject`);
}

/* 그룹 가입 요청 */
export async function groupJoinAction(groupId: number) {
  await postToAPI(`/groups/${groupId}/join-requests`);
}
