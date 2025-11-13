"use server";

import { patchToAPI } from "@/utils/patcher";

/* 그룹 게시글 UP요청 */
export async function upGroupRecruitmentAction(groupId: number) {
  const res = await patchToAPI(`/groups/${groupId}/posts/up`);
  return res.status;
}

/* 그룹 가입요청 수락 */
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
