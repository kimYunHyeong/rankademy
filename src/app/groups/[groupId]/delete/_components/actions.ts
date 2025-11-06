"use server";

import { deleteFromAPI } from "@/utils/patcher";
/*  그룹원 추방 */
export async function deleteGruopMember(groupId: number, memberId: number) {
  await deleteFromAPI(`/groups/${groupId}/members/${memberId}`);
}
