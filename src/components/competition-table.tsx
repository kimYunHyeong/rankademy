"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CompetitionStatus, PaginationData } from "@/types";
import FallBackImage from "@/components/fallback-img";
import { fetchFromAPI } from "@/utils/fetcher";
import { GroupCompetitionResult } from "@/types";
import { formatDate } from "@/utils/format-date";
import { useRouter } from "next/navigation";
import CompetitionResultDetail from "./competition-result-detail";

/* 목데이터 */
import { mockGroupCompetitionResult } from "@/mock/groupCompetitionResult";
import { mockPaginationData } from "@/mock/mockPaginationData";
import PaginationComponent from "./pagination";

/* API 응답 타입 */
type CompetitionResultAPIres = {
  content: GroupCompetitionResult[];
  page: PaginationData;
};

export default function CompetitionTable({
  APIURL,
  isJoined,
}: {
  APIURL: string;
  isJoined: boolean;
}) {
  const router = useRouter();

  // ✅ 데이터/페이지 상태
  const [rows, setRows] = useState<GroupCompetitionResult[]>([]);
  const [pageState, setPageData] = useState<PaginationData>(mockPaginationData);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  // ✅ 상세 아코디언 상태
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());
  const toggleRow = (id: number) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  // ✅ 데이터 로드 (page 변경 포함)
  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = (await fetchFromAPI(APIURL, {
          page: currentPage,
        })) as CompetitionResultAPIres;

        if (!alive) return;

        setRows(Array.isArray(res?.content) ? res.content : []);
        setPageData(res?.page ?? mockPaginationData);

        // 서버가 보정한 페이지 번호 동기화
        if (
          typeof res?.page?.number === "number" &&
          res.page.number !== currentPage
        ) {
          setCurrentPage(res.page.number);
        }
      } catch (e) {
        if (!alive) return;
        setError(e);
        // 실패 시 목데이터로 폴백
        setRows(mockGroupCompetitionResult);
        setPageData(mockPaginationData);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [APIURL, currentPage]);

  const statusTextMap: Record<CompetitionStatus, string> = {
    SCHEDULED: "진행중",
    COMPLETED: "완료", // 실제 표시 시 승패 반영 아래에서 재계산
    OPPOSED: "대기중",
    EXPIRED: "만료됨",
  };

  if (loading && rows.length === 0) {
    return <div className="text-xs text-[#B1ACC1]">불러오는 중…</div>;
  }

  if (error && rows.length === 0) {
    return (
      <div className="text-xs text-red-400">데이터를 불러오지 못했습니다.</div>
    );
  }

  return (
    <>
      <Table className="w-full border-none border-separate border-spacing-y-1 text-white text-xs">
        {/* 헤더 */}
        <TableHeader>
          <TableRow className=" bg-[#24192F] border-none pointer-events-none">
            <TableHead className="rounded-l w-[5%] text-center text-white text-xs"></TableHead>
            <TableHead className="w-[35%] text-white text-xs">그룹명</TableHead>
            <TableHead className="w-[25%] text-white text-xs">학교</TableHead>
            <TableHead className="w-[20%] text-white text-xs">
              진행일자
            </TableHead>
            <TableHead className="rounded-r w-[10%] text-white text-xs">
              결과
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => {
            const isOpen = openIds.has(row.competitionId);

            // 상태/승패
            const status = row.status as CompetitionStatus;
            const isWin = row.isWin === true;
            const clickable = status === "SCHEDULED" || status === "COMPLETED"; // ✅ 버그 수정

            // 상태 텍스트
            const statusText =
              status === "COMPLETED"
                ? isWin
                  ? "승리"
                  : "패배"
                : statusTextMap[status] ?? "-";

            // 클릭 동작
            const handleRowClick = () => {
              if (status === "SCHEDULED") {
                router.push(`/competitions/result/${row.competitionId}`);
              } else if (status === "COMPLETED") {
                toggleRow(row.competitionId);
              }
            };

            const handleKeyDown: React.KeyboardEventHandler<
              HTMLTableRowElement
            > = (e) => {
              if (!clickable) return;
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleRowClick();
              }
            };

            // 상태별 텍스트 색상
            const statusClass =
              status === "SCHEDULED"
                ? "text-[#B1ACC1]" // 진행중
                : status === "COMPLETED" && isWin
                ? "text-[#FF5679]" // 승리
                : "text-white"; // 패배/기타

            // 상태별 행 배경색
            let rowClassName = "";
            switch (status) {
              case "SCHEDULED":
                rowClassName = "bg-[#323036] text-[#B1ACC1] hover:bg-muted/50";
                break;
              case "COMPLETED":
                rowClassName = isWin
                  ? "bg-[#2E223F] bg-gradient-to-r from-[#FF5679]/20 to-[#2E223F] hover:bg-muted/50"
                  : "bg-[#24192F] hover:bg-muted/50";
                break;
              default:
                rowClassName = "bg-[#323036] text-[#B1ACC1]";
                break;
            }

            return (
              <React.Fragment key={row.competitionId}>
                <TableRow
                  className={`${rowClassName} w-full h-18 [&>td]:py-4 ${
                    clickable ? "cursor-pointer" : "cursor-default"
                  } group border-none`}
                  onClick={clickable ? handleRowClick : undefined}
                  onKeyDown={handleKeyDown}
                  role={clickable ? "button" : undefined}
                  tabIndex={clickable ? 0 : -1}
                  aria-label={
                    status === "SCHEDULED"
                      ? "대항전 결과 페이지로 이동"
                      : status === "COMPLETED"
                      ? "대항전 전적 펼치기"
                      : undefined
                  }
                >
                  <TableCell className="rounded-l text-center border-none">
                    VS
                  </TableCell>

                  <TableCell className="border-none">
                    <div className="flex items-center">
                      <FallBackImage
                        src={row.otherTeam.groupLogo ?? ""} // FallBackImage가 유효성 검사
                        alt={row.otherTeam.groupLogo ?? "otherTeamLogo"}
                        width={40}
                        height={40}
                      />
                      <span className="ml-3 justify-center">
                        {row.otherTeam.groupName}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="border-none">
                    {row.otherTeamUnivName}
                  </TableCell>

                  <TableCell className="border-none">
                    {formatDate(row.submittedAt)}
                  </TableCell>

                  <TableCell className={`rounded-r border-none ${statusClass}`}>
                    {statusText}
                  </TableCell>
                </TableRow>

                {isOpen && (
                  <CompetitionResultDetail data={row} isJoined={isJoined} />
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>

      <PaginationComponent
        pageData={pageState}
        onPageChange={(qs) => {
          const m = qs.match(/page=(\d+)/);
          const p = m ? Number(m[1]) : 0;
          if (!Number.isFinite(p) || p < 0) return;
          setCurrentPage(p);
        }}
      />
    </>
  );
}
