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
  finalWinnerGroupId: number;
  finalLoserGroupId: number;
};

export default function CompetitionResultForm({
  teamA,
  teamAMembers,
  teamB,
  teamBMembers,
  competitionId,
  requestOcr,
  registerResult,
}: {
  teamA: string;
  teamAMembers: string[];
  teamB: string;
  teamBMembers: string[];
  competitionId: number;

  requestOcr: (formData: FormData) => Promise<OcrResult>;
  registerResult: (competitionId: number, formData: FormData) => Promise<void>;
}) {
  /* OCR결과 설정 */
  const [ocrResult, setOcrResult] = useState<OcrResult | null>(null);

  /* 벡엔드 서버 제출 폼 */
  const [form, setForm] = useState<any>({});

  /* 세트 수 (1세트~5세트) */
  const [sets, setSets] = useState<Array<{ file: File | null }>>([
    { file: null },
  ]);

  /* 세트 수 설정 */
  const addSet = () => {
    setSets((prev) => (prev.length >= 5 ? prev : [...prev, { file: null }]));
  };

  /* 파일설정 */
  const setFileAt = (idx: number, file: File | null) => {
    setSets((prev) => {
      const next = [...prev];
      next[idx] = { file };
      return next;
    });
  };

  /* 백엔드 제출 폼 설정 */
  const handle =
    (path: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const value = e.target.value;
      setForm((prev: any) => {
        const next: any = structuredClone(prev ?? {});
        const keys = path.split(".");
        let cur = next;
        for (let i = 0; i < keys.length - 1; i++) {
          cur[keys[i]] = cur[keys[i]] ?? {};
          cur = cur[keys[i]];
        }
        cur[keys[keys.length - 1]] = value;
        return next;
      });
    };

  /* 벡엔드 폼 제출 (로직 필요)*/

  const router = useRouter();

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
                setOcrResult(res);
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
          onClick={() => {
            router.replace(`/competitions/me`);
          }}
          className="flex items-center justify-center w-30 h-11 text-white rounded bg-[#FF567933] text-center hover:bg-[#FF5679] transition-colors duration-300 ease-in-out"
        >
          제출하기
        </button>
      </div>
    </>
  );
}
