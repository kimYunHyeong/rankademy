"use server";
import { deleteFromAPI } from "@/utils/patcher";

export async function deleteMe() {
  await deleteFromAPI(`/me`);
}
