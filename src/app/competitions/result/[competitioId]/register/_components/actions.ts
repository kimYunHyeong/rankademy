"use server";

import { postToAPI } from "@/utils/patcher";
import { OcrResult } from "@/types";

/* OCR 결과 요청 */
export async function requestOCRResult(formData: FormData): Promise<OcrResult> {
  const payload = Object.fromEntries(formData.entries());

  const res = await postToAPI(`https://ocr.rankademy.kr/game-result`, {
    body: payload,
  });

  // postToAPI가 JSON을 반환한다고 가정
  const data = (await res.json()) as OcrResult;
  return data;
}

/* 대항전 결과 등록 요청 */
export async function registerCompetitionResult(
  competitionId: number,
  formData: FormData
) {
  const payload = Object.fromEntries(formData.entries());
  await postToAPI(`/competitions/${competitionId}/results`, {
    body: payload,
  });
}
