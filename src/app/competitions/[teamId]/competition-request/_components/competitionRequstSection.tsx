"use client";
import { Query, PaginationData } from "@/types";
import { useRouter } from "next/navigation";
import PaginationComponent from "@/components/pagination";
import { useState } from "react";
import { TeamInfo } from "../page";

export default function CompetitionRequestSection({
  otherTeamId,
  data,
  pageData,
  submitAction,
}: {
  otherTeamId: number;
  data: TeamInfo[];
  pageData: PaginationData;
  submitAction: (teamId: number, otherTeamId: number) => Promise<void>;
}) {
  const router = useRouter();
  const [pageState, setPageData] = useState<PaginationData>(pageData);
  const [query, setQuery] = useState<Query>({ page: 0 });

  return (
    <>
      {/* 헤더 */}
      <div
        className="flex flex-col
                     w-[500px] h-100 
                     border border-[#323036] rounded 
                     bg-[#25242A] text-white 
                     p-4"
      >
        <span className="text-white text-2xl my-3">결투 신청하기</span>
        <span className="text-sm text-[#B1ACC1]">
          결투를 신청할 나의 팀을 선택해주세요
        </span>

        {/* 테이블 */}
        <div className="mt-4 mb-2">
          {data.slice(0, pageData.size).map((team) => (
            <div
              key={team.teamId}
              onClick={() => {
                submitAction(team.teamId, otherTeamId);
                router.replace(`competition-request/ok`);
              }}
              className="flex justify-between items-center
                        p-2 rounded h-16
                        cursor-pointer hover:bg-[#2E223F] transition-colors"
            >
              <span className="text-white">{team.teamName}</span>
              <span className="text-[#B1ACC1] text-xs">{team.groupName}</span>
            </div>
          ))}
        </div>
        {/* 페이지네이션 */}
        <PaginationComponent
          pageData={pageState}
          onPageChange={(qs) => {
            const p = Number((qs.split("=").pop() || "1").trim());
            if (!Number.isFinite(p) || p < 1) return;
            setQuery((prev) => ({ ...prev, page: p }));
          }}
        />

        {/* 닫기 버튼 */}
        <button
          onClick={() => {
            router.back();

            setTimeout(() => {
              window.location.reload();
            }, 100);
          }}
          className="h-[10%] text-xs text-[#B1ACC1] mt-5"
        >
          닫기
        </button>
      </div>
    </>
  );
}
