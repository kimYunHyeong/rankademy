"use server";
import { patchToAPI, postToAPI } from "@/utils/patcher";

/* 그룹 초대 수락 */
export async function acceptGroupInvite(groupId: number, invitationId: number) {
  await patchToAPI(`/groups/${groupId}/invitation/accept/${invitationId}`);
}

/* 그룹 초대 거절 */
export async function rejectGroupInvite(groupId: number, invitationId: number) {
  await patchToAPI(`/groups/${groupId}/invitation/reject/${invitationId}`);
}

/* 그룹 가입 요청 */
export async function putGroupRecruitmentAction(
  groupId: number,
  formData: FormData
) {
  const payload = Object.fromEntries(formData.entries());
  await postToAPI(`/groups/${groupId}/posts`, {
    body: payload,
  });
}
