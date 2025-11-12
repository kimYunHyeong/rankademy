"use server";

import { patchToAPI } from "@/utils/patcher";
import { refresher } from "@/utils/refresher";

export async function checkAlarm(alarmId: number) {
  await patchToAPI(`/notifications/${alarmId}/confirm`);
}
