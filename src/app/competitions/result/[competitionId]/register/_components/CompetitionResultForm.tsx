"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadCompeitionReusltImage from "./uploadSetResult";
import { ImageUrl, ImageUrlRes, OcrResult } from "@/types";
import Image from "next/image";
import { TeamDetail } from "../../page";

/* 각 세트 결과 */
type SetResult = {
  setNumber: number;
  winnerTeamId: number;
  resultImageKey: string;
};

/* 전체 결과 */
export type RegisterCompeitionResult = {
  team1Id: number;
  team2Id: number;
  totalSets: number;
  setResults: SetResult[];
  memo: string;
  finalWinnerId: number;
  finalWinnerGroupId: number;
  finalLoserGroupId: number;
};

export default function CompetitionResultForm({
  teamA,
  teamB,
  competitionId,
  requestOcr,
  imgUrlAction,
  registerResult,
}: {
  teamA: TeamDetail;
  teamB: TeamDetail;
  competitionId: number;
  imgUrlAction: (payload: ImageUrl[]) => Promise<ImageUrlRes[]>;
  requestOcr: (formData: FormData) => Promise<OcrResult>;
  registerResult: (
    competitionId: number,
    body: RegisterCompeitionResult
  ) => Promise<{ ok: boolean; status: number; detail?: string; data?: any }>;
}) {
  const router = useRouter();

  const teamAMembers = teamA.teamMembers.slice(0, 5).map((m) => m.summonerName);
  const teamBMembers = teamB.teamMembers.slice(0, 5).map((m) => m.summonerName);

  // 전체 세트 결과 (각 세트별 정보 upsert)
  const [setResults, setSetResults] = useState<SetResult[]>([]);

  //메모
  const [memo, setMemo] = useState<string>("");

  // 세트별 결과 갱신 (upsert)
  const updateSetResult = (setNumber: number, data: Partial<SetResult>) => {
    setSetResults((prev) => {
      const exists = prev.find((s) => s.setNumber === setNumber);
      if (exists) {
        // 기존 세트 업데이트
        return prev.map((s) =>
          s.setNumber === setNumber ? { ...s, ...data } : s
        );
      }
      // 새 세트 추가
      return [
        ...prev,
        { setNumber, winnerTeamId: 0, resultImageKey: "", ...data },
      ];
    });
  };

  // 각 세트별 이미지를 설정해 하위 컴포넌트에게 전달
  const setFileAt = (idx: number, file: File | null) => {
    setSets((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], file };
      return next;
    });
  };

  // 세트 추가 (최대 5)
  const addSet = () => {
    setSets((prev) => (prev.length >= 5 ? prev : [...prev, { file: null }]));
  };

  // 개별 세트 상태: 파일 + OCR + 승자ID + 이미지키
  const [sets, setSets] = useState<
    Array<{
      file: File | null;
      ocr?: OcrResult | null;
      winnerTeamId?: number | null;
      resultImageKey?: string | null;
    }>
  >([{ file: null }]);

  //제출하기 버튼 클릭 시
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // winnerTeamId 카운팅
    const winCountMap = new Map<number, number>();

    for (const result of setResults) {
      const current = winCountMap.get(result.winnerTeamId) ?? 0;
      winCountMap.set(result.winnerTeamId, current + 1);
    }

    // 승리가 많은 팀 찾기
    let finalWinnerId: number = 0;
    let maxWins = -1;

    for (const [teamId, count] of winCountMap.entries()) {
      if (count > maxWins) {
        maxWins = count;
        finalWinnerId = teamId;
      }
    }

    /* 이긴 그룹을 설정 */
    let finalWinnerGroupId: number = 0;
    let finalLoserGroupId: number = 0;

    if (finalWinnerId === teamA.teamId) {
      finalWinnerGroupId = teamA.groupId;
      finalLoserGroupId = teamB.groupId;
    } else if (finalWinnerId === teamB.teamId) {
      finalWinnerGroupId = teamB.groupId;
      finalLoserGroupId = teamA.groupId;
    }

    const body: RegisterCompeitionResult = {
      team1Id: teamA.teamId,
      team2Id: teamB.teamId,
      totalSets: setResults.length,
      setResults,
      memo,
      finalWinnerId: finalWinnerId,
      finalWinnerGroupId: finalWinnerGroupId,
      finalLoserGroupId: finalLoserGroupId,
    };

    console.log("📦 최종 제출 데이터:", body);

    //서버에 결과 전송
    try {
      // ✅ 동률 확인 (팀 A, B 승수 비교)
      const teamAWins = winCountMap.get(teamA.teamId) ?? 0;
      const teamBWins = winCountMap.get(teamB.teamId) ?? 0;

      if (teamAWins === teamBWins) {
        alert(`두 팀의 승리 수가 같습니다. 승자를 정해주세요.`);
        return; // ⛔ 동률이면 전송 중단
      }

      const res = await registerResult(competitionId, body);
      if (!res.ok) {
        if (res.status === 409) {
          alert(`409에러`);
        } else {
          alert(`에러코드 [${res.status}]: ${res.detail}`);
        }
        return;
      }

      router.push("/scrims");
    } catch (err: any) {
      console.error("💥 handleSubmit Error:", err);
      alert("요청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
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
              teamA={teamA.teamName}
              teamAMembers={teamAMembers}
              teamB={teamB.teamName}
              teamBMembers={teamBMembers}
              requestOcr={requestOcr}
              onChange={(file) => setFileAt(idx, file)}
              imgUrlAction={imgUrlAction}
              onOcrResult={(res: OcrResult | null) => {
                if (!res) return;
                const winnerId =
                  res.winner === teamA.teamName
                    ? teamA.teamId
                    : res.winner === teamB.teamName
                    ? teamB.teamId
                    : 0;
                updateSetResult(idx + 1, { winnerTeamId: winnerId });
              }}
              onSetImgUrl={(imgUrl: string) => {
                updateSetResult(idx + 1, { resultImageKey: imgUrl });
              }}
            />
            <span className="text-[#B1ACC1] text-xs opacity-70">
              세트 {idx + 1}
            </span>
          </div>

          {/* 팀 정보 */}
          <div className="flex flex-col ml-10 items-center justify-center gap-4">
            <span
              className={
                `text-2xl ` +
                (setResults[idx]?.winnerTeamId === teamA.teamId
                  ? "text-[#FF5679]" // 이긴 팀 색
                  : "text-[#B1ACC1]") // 진 팀 색
              }
            >
              {teamA.teamName}
            </span>
            <span
              className={
                `text-2xl ` +
                (setResults[idx]?.winnerTeamId === teamB.teamId
                  ? "text-[#FF5679]" // 이긴 팀 색
                  : "text-[#B1ACC1]") // 진 팀 색
              }
            >
              {teamB.teamName}
            </span>
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
        <Image src="/images/plus.png" alt={"plus"} width={20} height={20} />
        <span className="ml-5">세트 추가 {sets.length}/5</span>
      </button>

      {/* 메모 */}
      <div className="flex flex-col my-10">
        <textarea
          className="my-4 text-sm leading-relaxed text-left wrap-break-word max-h-[140px] overflow-y-auto scrollbar-none bg-[#323036] border border-[#323036] rounded px-3 py-2 text-white resize-none"
          value={memo}
          onChange={(e) => setMemo(e.target.value)} // ✅ 입력값 변경 시 상태 업데이트
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
        <form
          onClick={handleSubmit}
          className="flex items-center justify-center w-30 h-11 text-white rounded bg-[#FF567933] text-center hover:bg-[#FF5679] transition-colors duration-300 ease-in-out"
        >
          제출하기
        </form>
      </div>
    </>
  );
}
