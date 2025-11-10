"use server";

import { patchToAPI } from "@/utils/patcher";

export async function checkAlarm(alarmId: number) {
  await patchToAPI(`/notifications/${alarmId}/confirm`);
}
