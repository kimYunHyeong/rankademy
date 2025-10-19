"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { RankingTableProps } from "@/types";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function RankingTable<T>({ data, columns }: RankingTableProps<T>) {
  // 편집 페이지 감지 (/groups/[groupId]/edit/* 포함)
  const pathname = usePathname();
  const isEditPage = /\/groups\/[^/]+\/edit(?:\/.*)?$/.test(pathname ?? "");

  // ✅ 페이지네이션 상태
  const pageSize = 15;
  const [page, setPage] = React.useState(1);

  const total = data.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pageData = data.slice(start, end);

  return (
    <div className="w-full min-h-screen">
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
            {pageData.map((row, i) => {
              const rank = start + i + 1;
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

                    {/* 편집 페이지에서만: 행 전체 오버레이 */}
                    {isEditPage && (
                      <div
                        className="
                        border border-[#FF567980] rounded
                          absolute inset-0 z-10
                          opacity-0 group-hover:opacity-100 transition-opacity
                          pointer-events-none
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
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Link href={`delete`}>
                            {" "}
                            <button
                              onClick={() => console.log("추방하시겠습니까")}
                              className="
                              pointer-events-auto
                              text-white 
                              px-4 py-2 font-medium
                              shadow-sm
                            "
                            >
                              추방하기
                            </button>
                          </Link>
                        </div>
                      </div>
                    )}
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
                        className={`last:rounded-r px-6 py-4 ${
                          col.cellClassName ?? ""
                        } ${
                          gradientOn
                            ? "bg-[linear-gradient(149.06deg,_#FFA1D9_10.49%,_#FF5679_60.64%)] bg-clip-text text-transparent font-bold"
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

      <div className="my-4" />

      {/* 페이지네이션 */}
      <div className="w-full mt-4">
        <Pagination className="w-full">
          <PaginationContent className="flex w-full justify-between items-center">
            {/* 이전 */}
            <div>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className={`rounded-sm w-[28px] h-[28px] px-3 py-1 text-sm font-medium transition-colors
                    border border-[#323036] text-[#B1ACC1]
                    hover:bg-[#FF5679] hover:text-[#110D17] hover:border-none
                    ${page === 1 ? "pointer-events-none opacity-50" : ""}`}
                />
              </PaginationItem>
            </div>

            {/* 페이지 숫자 */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={page === i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`w-[28px] h-[28px] rounded-sm px-3 py-1 text-sm font-medium transition-colors
                      ${
                        page === i + 1
                          ? "bg-[#FF5679] text-[#110D17] border-none"
                          : "border border-[#323036] text-[#B1ACC1] hover:bg-[#FF5679] hover:text-[#110D17] hover:border-none"
                      }`}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </div>

            {/* 다음 */}
            <div>
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className={`rounded-sm w-[28px] h-[28px] px-3 py-1 text-sm font-medium transition-colors
                    border border-[#323036] text-[#B1ACC1]
                    hover:bg-[#FF5679] hover:text-[#110D17] hover:border-none
                    ${
                      page === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }`}
                />
              </PaginationItem>
            </div>
          </PaginationContent>
        </Pagination>
      </div>
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
