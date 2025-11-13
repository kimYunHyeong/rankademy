"use client";

import React, { useEffect, useState } from "react";
import { PaginationData, RankingTableProps } from "@/types";
import { fetchFromAPI } from "@/utils/fetcher";
import { Query } from "@/types";
import PaginationComponent from "@/components/pagination";
import { mockPaginationData } from "@/mock/mockPaginationData";
import { useRouter } from "next/navigation";

type Props<T> = RankingTableProps<T> & {
  groupId: number;
  query?: Query;
};

/* 테이블 데이터 추출  */
function extractRows<T>(res: any): T[] {
  if (Array.isArray(res)) return res as T[];
  if (Array.isArray(res?.content)) return res.content as T[];
  if (Array.isArray(res?.data)) return res.data as T[];
  return [];
}

/* 페이지 정보 추출 */
function extractPage(res: any): PaginationData {
  const p = res?.page;
  return {
    size: p.size ?? 10,
    number: p.number ?? 0,
    totalElements: p.totalElements ?? 0,
    totalPages: p.totalPages ?? 1,
  };
}

export default function GroupMemberTable<T>({
  columns,
  groupId,
  query,
}: Props<T>) {
  const router = useRouter();

  /* 페이지네이션 설정 */
  const [pageState, setPageData] = useState<PaginationData>(mockPaginationData);
  const [currentPage, setCurrentPage] = useState<number>(0);

  // ✅ query가 변경될 때마다 첫 페이지로 초기화
  useEffect(() => {
    if (query) setCurrentPage(0);
  }, [JSON.stringify(query)]);

  // 내부 표시용 데이터 상태 (초기값은 props.data)
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  /* query(단, page 제외)나 apiurl, currentPage 변경 시 재요청  */
  useEffect(() => {
    let alive = true;

    const run = async () => {
      setLoading(true);
      setError(null);
      try {
        // page는 내부 상태로 일원화
        const mergedQuery = { ...(query ?? {}), page: currentPage };
        const res = (
          await fetchFromAPI(`/groups/${groupId}/members/manage`, mergedQuery)
        ).data;

        if (!alive) return;

        const nextRows = extractRows<T>(res);
        const nextPage = extractPage(res);

        setRows(nextRows);
        setPageData(nextPage);

        // 서버가 강제로 페이지를 보정할 수 있으니 동기화(선택)
        if (
          typeof nextPage.number === "number" &&
          nextPage.number !== currentPage
        ) {
          setCurrentPage(nextPage.number);
        }
      } catch (e) {
        if (!alive) return;
        setError(e);
        console.error("RankingTable fetch failed:", e);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    };

    run();
    return () => {
      alive = false;
    };
  }, [currentPage, JSON.stringify({ ...(query ?? {}), page: undefined })]);

  return (
    <div className="w-full">
      {/* 가로 스크롤 보호 래퍼 */}
      <div className="w-full overflow-x-auto">
        <table className="w-full table-fixed border-separate border-spacing-y-1">
          {/* 헤더 */}
          <thead>
            <tr className="bg-[#24192F] text-xs text-gray-300">
              <th className="rounded-l px-6 py-4 w-[10%] text-left">랭킹</th>
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={`last:rounded-r px-6 py-4 text-left ${
                    col.headerClassName ?? ""
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* 바디 */}
          <tbody className="text-xs divide-y divide-[#2E223F]">
            {rows.map((row, i) => {
              const rank = i + 1;
              return (
                <tr
                  key={rank}
                  className={`group relative transition-colors ${defaultRowClassName(
                    rank
                  )}`}
                >
                  {/* 첫 번째 셀 */}
                  <td className="rounded-l px-6 py-4">
                    <RankBadge rank={rank} />

                    <div
                      className="
                          absolute inset-0 z-20 rounded
        opacity-0 group-hover:opacity-100 transition-opacity
        pointer-events-none group-hover:pointer-events-auto
        border border-[#FF567980]
                        "
                    >
                      {/* 어둡게 + 살짝 블러 */}
                      <div
                        className="
                            absolute inset-0 rounded-[6px]
                            bg-black/60 backdrop-blur-[2px]
                          "
                      />
                      {/* 중앙 버튼 */}
                      <button
                        onClick={() =>
                          router.push(
                            `/groups/${groupId}/delete?userId=${
                              (row as any).userId
                            }&summonerName=${
                              (row as any).summonerName
                            }&summonerTag=${(row as any).summonerTag}`
                          )
                        }
                        className="absolute inset-0 flex items-center justify-center text-white"
                      >
                        추방하기
                      </button>
                    </div>
                  </td>

                  {/* 나머지 셀들 */}
                  {columns.map((col, colIndex) => {
                    const content =
                      col.cell?.(row, i) ??
                      (col.accessorKey ? (row as any)[col.accessorKey] : null);

                    const isSecondCol = colIndex === 0;
                    const gradientOn = isSecondCol && rank <= 3;

                    return (
                      <td
                        key={col.id}
                        className={`last:rounded-r px-6 py-4  ${
                          gradientOn
                            ? "bg-[linear-gradient(149.06deg,#FFA1D9_10.49%,#FF5679_60.64%)] bg-clip-text text-transparent font-bold"
                            : "text-white"
                        }`}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      <PaginationComponent
        pageData={pageState}
        onPageChange={(qs) => {
          // qs 예: "page=0"
          const m = qs.match(/page=(\d+)/);
          const p = m ? Number(m[1]) : 0;
          if (!Number.isFinite(p) || p < 0) return; // 0-base 허용
          setCurrentPage(p);
        }}
      />
    </div>
  );
}

/* 1~3등 마름모 뱃지, 그 외는 숫자 */
function RankBadge({ rank }: { rank: number }) {
  if (rank <= 3) {
    return (
      <div
        className="w-6 h-6 rotate-45 flex items-center justify-center"
        style={{
          backgroundColor: "#1D1921",
          border: "2px solid transparent",
          borderImage: "linear-gradient(135deg, #FFA1D9, #FF5679) 1",
          borderImageSlice: 1,
        }}
      >
        <span className="-rotate-45 text-[#FFA1D9] text-sm font-medium leading-none">
          {rank}
        </span>
      </div>
    );
  }
  return <span className="text-white font-medium ml-2">{rank}</span>;
}

/* 행 스타일: 1~3위 그라데이션 + 짝/홀 배경색 */
function defaultRowClassName(rank: number) {
  const isTop3 = rank <= 3;
  const even = rank % 2 === 0;

  if (even) {
    return isTop3
      ? "bg-[#24192F] bg-gradient-to-r from-[#FF5679]/20 to-transparent"
      : "bg-[#24192F]";
  } else {
    return isTop3
      ? "bg-[#2E223F] bg-gradient-to-r from-[#FF5679]/20 to-transparent"
      : "bg-[#2E223F]";
  }
}
