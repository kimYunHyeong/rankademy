"use server";

import { MyGroup } from "@/components/group-cards";
import { fetchFromAPI } from "@/utils/fetcher";
import { patchToAPI, postToAPI } from "@/utils/patcher";

/* 그룹 초대 수락 */
export async function acceptGroupInvite(groupId: number, invitationId: number) {
  await patchToAPI(`/groups/${groupId}/invitation/accept/${invitationId}`);
}

/* 그룹 초대 거절 */
export async function rejectGroupInvite(groupId: number, invitationId: number) {
  await patchToAPI(`/groups/${groupId}/invitation/reject/${invitationId}`);
}

/* 이메일 코드 확인 */
export async function opposeCompetition(competitionId: number) {
  await postToAPI(`/competitions/${competitionId}/oppose`);
}

/* 내 그룹 목록 조회 */
export async function showMyGroupList() {
  const data: MyGroup[] = await fetchFromAPI(`/groups/my`);

  return data;
}
