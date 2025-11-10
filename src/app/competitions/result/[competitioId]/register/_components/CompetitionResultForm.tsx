"use client";

import { useState } from "react";
import FallBackImage from "@/components/fallback-img";
import { useRouter } from "next/navigation";
import UploadCompeitionReusltImage from "./uploadSetResult";
import { OcrResult } from "@/types";

type SetResult = {
  setNumber: number;
  winnerTeamId: number;
  resultImageKey: string;
};

type RegisterCompeitionResult = {
  team1Id: number;
  team2Id: number;
  totalSets: number;
  setResults: SetResult[];
  memo: string;
  finalWinnerId: number;
  finalWinnerGroupId: number; // ⚠️ 확실하지 않음(현재 props에 그룹ID 없음)
  finalLoserGroupId: number; // ⚠️ 확실하지 않음(현재 props에 그룹ID 없음)
};

export default function CompetitionResultForm({
  teamA,
  teamAId,
  teamAGroup,
  teamAMembers,
  teamB,
  teamBId,
  teamBGroup,
  teamBMembers,
  competitionId,
  requestOcr,
  registerResult,
}: {
  teamA: string;
  teamAId: number;
  teamAGroup: number;
  teamAMembers: string[];
  teamB: string;
  teamBId: number;
  teamBGroup: number;
  teamBMembers: string[];
  competitionId: number;

  requestOcr: (formData: FormData) => Promise<OcrResult>;
  registerResult: (competitionId: number, formData: FormData) => Promise<void>;
}) {
  // 개별 세트 상태: 파일 + OCR + 승자ID + 이미지키
  const [sets, setSets] = useState<
    Array<{
      file: File | null;
      ocr?: OcrResult | null;
      winnerTeamId?: number | null;
      resultImageKey?: string | null;
    }>
  >([{ file: null }]);

  // 메모 등 폼 상태
  const [form, setForm] = useState<{ description?: string }>({});

  const router = useRouter();

  // 세트 추가 (최대 5)
  const addSet = () => {
    setSets((prev) => (prev.length >= 5 ? prev : [...prev, { file: null }]));
  };

  // 파일 설정
  const setFileAt = (idx: number, file: File | null) => {
    setSets((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], file };
      return next;
    });
  };

  // 입력 핸들러
  const handle =
    (path: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
      >
    ) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [path]: value }));
    };

  // 승자 이름 → 팀ID 매핑
  const resolveWinnerTeamId = (winnerName?: string | null): number | null => {
    if (!winnerName) return null;
    const w = winnerName.trim();
    if (w === teamA) return teamAId;
    if (w === teamB) return teamBId;
    return null;
  };

  // OCR 결과를 세트에 반영
  const handleOcrAt = (idx: number, res: OcrResult | null) => {
    setSets((prev) => {
      const next = [...prev];

      // OcrResult 안의 승자를 판별
      const winnerName = (res as any)?.winner ?? null;

      const imageKey =
        (res as any)?.resultImageKey ??
        (res as any)?.imageKey ??
        (res as any)?.fileKey ??
        null;

      const winnerTeamId = resolveWinnerTeamId(winnerName);

      next[idx] = {
        ...next[idx],
        ocr: res,
        winnerTeamId, // 일치하는 팀명일 때만 설정됨
        resultImageKey: imageKey,
      };
      return next;
    });
  };

  // 제출 로직
  const submitAll = async () => {
    // 검증: 각 세트에 승자/이미지키가 있는지
    for (let i = 0; i < sets.length; i++) {
      const s = sets[i];
      if (!s.winnerTeamId) {
        alert(
          `세트 ${
            i + 1
          }: 승자 정보가 없습니다. (OCR 결과의 winner가 팀명과 일치해야 함)`
        );
        return;
      }
      if (!s.resultImageKey) {
        alert(
          `세트 ${
            i + 1
          }: resultImageKey가 없습니다. (OCR 결과에서 이미지 키를 반환해야 함)`
        );
        return;
      }
    }

    // 집계
    const setResults: SetResult[] = sets.map((s, i) => ({
      setNumber: i + 1,
      winnerTeamId: s.winnerTeamId!, // 위에서 검증됨
      resultImageKey: s.resultImageKey!,
    }));

    const totalSets = sets.length;
    const aWins = setResults.filter((r) => r.winnerTeamId === teamAId).length;
    const bWins = setResults.filter((r) => r.winnerTeamId === teamBId).length;

    if (aWins === bWins) {
      alert("최종 승패를 결정할 수 없습니다. (동률) 세트 입력을 확인하세요.");
      return;
    }

    const finalWinnerId = aWins > bWins ? teamAGroup : teamBGroup;
    const finalLoserId = aWins > bWins ? teamAGroup : teamBGroup;

    /* 최종 승자 */
    const finalWinnerGroupId = finalWinnerId; // 추측입니다
    const finalLoserGroupId = finalLoserId; // 추측입니다

    const payload: RegisterCompeitionResult = {
      team1Id: teamAId,
      team2Id: teamBId,
      totalSets,
      setResults,
      memo: form.description ?? "",
      finalWinnerId,
      finalWinnerGroupId,
      finalLoserGroupId,
    };

    // FormData 직렬화
    const fd = new FormData();
    fd.append("team1Id", String(payload.team1Id));
    fd.append("team2Id", String(payload.team2Id));
    fd.append("totalSets", String(payload.totalSets));
    fd.append("setResults", JSON.stringify(payload.setResults));
    fd.append("memo", payload.memo);
    fd.append("finalWinnerId", String(payload.finalWinnerId));
    fd.append("finalWinnerGroupId", String(payload.finalWinnerGroupId));
    fd.append("finalLoserGroupId", String(payload.finalLoserGroupId));

    // (선택) 원본 이미지 파일도 같이 보낼 필요가 있다면 아래 주석 해제
    // sets.forEach((s, i) => {
    //   if (s.file) fd.append(`resultImageFiles[${i}]`, s.file);
    // });

    await registerResult(competitionId, fd);
    // 성공 시 이동
    router.replace(`/competitions/me`);
  };

  return (
    <>
      {/* 세트 결과 업로드 섹션들 */}
      {sets.map((s, idx) => (
        <div
          key={idx}
          className="p-8 flex border-2 border-[#25242A] rounded bg-[#25242A33] w-full h-auto mb-5"
        >
          {/* 결과 이미지 업로드 */}
          <div className="flex flex-col w-[260px]">
            <UploadCompeitionReusltImage
              teamA={teamA}
              teamAMembers={teamAMembers}
              teamB={teamB}
              teamBMembers={teamBMembers}
              requestOcr={requestOcr}
              onChange={(file) => setFileAt(idx, file)}
              onOcrResult={(res: OcrResult | null) => {
                handleOcrAt(idx, res);
              }}
            />
            <span className="text-[#B1ACC1] text-xs opacity-70">
              세트 {idx + 1}
            </span>
          </div>

          {/* 팀 정보 */}
          <div className="flex flex-col ml-10 items-center justify-center">
            <span className="text-[#B1ACC1] text-2xl">{teamA}</span>
            <div className="my-4" />
            <span className="text-[#B1ACC1] text-2xl">{teamB}</span>
          </div>
        </div>
      ))}

      {/* 세트 추가 버튼 (최대 5개) */}
      <button
        type="button"
        onClick={addSet}
        disabled={sets.length >= 5}
        className={[
          "p-8 flex items-center border-2 border-[#25242A] rounded bg-[#25242A33] text-[#B1ACC1] w-full h-auto",
          sets.length >= 5
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[#2b2830]",
        ].join(" ")}
      >
        <FallBackImage
          src="/images/plus.png"
          alt={"plus"}
          width={20}
          height={20}
        />
        <span className="ml-5">세트 추가 {sets.length}/5</span>
      </button>

      {/* 메모 */}
      <div className="flex flex-col my-10">
        <textarea
          className="my-4 text-sm leading-relaxed text-left wrap-break-word max-h-[140px] overflow-y-auto scrollbar-none bg-[#323036] border border-[#323036] rounded px-3 py-2 text-white resize-none"
          onChange={handle("description")}
          rows={5}
          placeholder="메모"
        />
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-end mt-5">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center border border-[#323036] w-30 h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-3 hover:bg-[#24192F] transition-colors duration-300 ease-in-out"
        >
          취소
        </button>
        <button
          onClick={submitAll}
          className="flex items-center justify-center w-30 h-11 text-white rounded bg-[#FF567933] text-center hover:bg-[#FF5679] transition-colors duration-300 ease-in-out"
        >
          제출하기
        </button>
      </div>
    </>
  );
}
