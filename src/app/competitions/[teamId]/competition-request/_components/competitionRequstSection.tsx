"use client";
import { PaginationData } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchFromAPI } from "@/utils/fetcher";
import { mockPaginationData } from "@/mock/mockPaginationData";
import PaginationComponent from "@/components/pagination";

export type TeamInfo = {
  teamId: number;
  teamName: string;
  groupId: number;
  groupName: string;
};

type MyTeamList = {
  content: TeamInfo[];
  page: PaginationData;
};

const mock = {
  content: [
    {
      teamId: 1,
      teamName: "컴퓨터공학과",
      groupId: 1,
      groupName: "서울과학기술대학교",
    },
    {
      teamId: 2,
      teamName: "컴퓨터공학과",
      groupId: 2,
      groupName: "서울과학기술대학교",
    },
    {
      teamId: 3,
      teamName: "컴퓨터공학과",
      groupId: 1,
      groupName: "서울과학기술대학교",
    },
  ],
  page: {
    size: 3,
    number: 0,
    totalElements: 3,
    totalPages: 1,
  },
};

export default function CompetitionRequestSection({
  otherTeamId,
  submitAction,
}: {
  otherTeamId: number;
  submitAction: (teamId: number, otherTeamId: number) => Promise<void>;
}) {
  const router = useRouter();
  /* 페이지네이션 설정 */
  const [pageState, setPageState] = useState<PaginationData>(
    mockPaginationData ?? mock.page
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rows, setRows] = useState<TeamInfo[]>(mock.content);

  useEffect(() => {
    let alive = true;

    const run = async () => {
      try {
        const res = (await fetchFromAPI(`/teams/my`, {
          page: currentPage,
        })) as MyTeamList | { data: MyTeamList };

        // fetchFromAPI 구현 따라 data 래핑 여부 처리
        const MyTeamList: MyTeamList =
          "content" in res ? res : (res as any).data;

        if (!alive) return;

        setRows(MyTeamList.content ?? []);
        setPageState(MyTeamList.page ?? mockPaginationData);
      } catch (e) {
        console.error("❌ [RecruitListSection] fetch error:", e);
        if (!alive) return;

        // 실패 시 목데이터로 fallback
        setRows(mock.content);
        setPageState(mock.page);
      }
    };

    run();

    return () => {
      alive = false;
    };
  }, [currentPage]);

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
          {rows.slice(0, pageState.size).map((team) => (
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
          windowSize={5}
          onPageChange={(qs) => {
            const m = qs.match(/page=(\d+)/);
            const p = m ? Number(m[1]) : 0;
            if (!Number.isFinite(p) || p < 0) return;
            setCurrentPage(p);
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
