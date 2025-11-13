"use server";

import { deleteFromAPI, patchToAPI, postToAPI } from "@/utils/patcher";

/* 팀 탈퇴하기 */
export async function withdrawTeam(teamId: number) {
  await deleteFromAPI(`/teams/${teamId}/withdraw`);
}

/* 팀 삭제하기 */
export async function deleteTeam(teamId: number) {
  await deleteFromAPI(`/teams/${teamId}`);
}

/* 대항전 요청 */
export async function sendCompetitionReq(teamId: number, otherTeamId: number) {
  await patchToAPI(
    `/competition-requests/${teamId}/send?otherTeamId=${otherTeamId}`
  );
}

/* 대항전 수락 */
export async function acceptCompetitionReq(teamId: number, requestId: number) {
  await patchToAPI(`/competition-requests/${teamId}/accept/${requestId}`);
}

/* 대항전 거절 */
export async function rejectCompetitionReq(teamId: number, requestId: number) {
  await patchToAPI(`/competition-requests/${teamId}/reject/${requestId}`);
}

/* 대항전 이의제기 */
export async function opposeCompetition(competitionId: number) {
  await postToAPI(`/competitions/${competitionId}/oppose`);
}
