"use server";

import { deleteFromAPI } from "@/utils/patcher";
import { revalidatePath } from "next/cache";

/*  그룹원 추방 */
export async function deleteGruopMember(groupId: number, memberId: number) {
  await deleteFromAPI(`/groups/${groupId}/members/${memberId}`);
  revalidatePath(`/groups/${groupId}/edit`);
}
