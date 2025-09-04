// components/RankTable.tsx
"use client";
import { RankingTableProps } from "@/types";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export function RankingTable<T>({
  data,
  columns,
  pageSize = 15,
  initialPage = 1,
  onPageChange,
}: RankingTableProps<T>) {
  const [page, setPage] = React.useState(initialPage);

  // 데이터 길이가 줄어들면 현재 페이지가 유효 범위 내로 들어오도록 보정
  const total = data.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(Math.max(1, page), totalPages);

  // ✅ 현재 페이지 범위 계산 + 슬라이싱
  const start = (current - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pageData = React.useMemo(
    () => data.slice(start, end),
    [data, start, end]
  );

  React.useEffect(() => {
    if (page !== current) {
      setPage(current);
      onPageChange?.(current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]); // totalPages 변할 때만 보정

  const pages = React.useMemo<(number | "...")[]>(() => {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const arr: (number | "...")[] = [1];
    if (current > 3) arr.push("...");
    for (
      let p = Math.max(2, current - 1);
      p <= Math.min(totalPages - 1, current + 1);
      p++
    ) {
      arr.push(p);
    }
    if (current < totalPages - 2) arr.push("...");
    arr.push(totalPages);
    return arr;
  }, [current, totalPages]);

  const go = (n: number) => {
    if (n < 1 || n > totalPages || n === current) return;
    setPage(n);
    onPageChange?.(n);
  };

  return (
    <div className="min-h-screen">
      <table className="table-fixed border-separate border-spacing-y-1 mx-auto">
        {/* 헤더 */}
        <thead>
          <tr className="bg-[#24192F] text-sm font-medium text-gray-300 ">
            {/* rank 헤더는 고정 */}
            <th className="rounded-l px-6 py-4 w-[8%]  text-left">랭킹</th>
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
        <tbody className="text-sm divide-y divide-[#2E223F]">
          {pageData.map((row, i) => {
            const rank = start + i + 1; // ✅ 여기서 rank 정의

            return (
              <tr
                key={rank}
                className={`not-first:hover:bg-gray-700/50 transition-colors ${defaultRowClassName(
                  rank
                )}`}
              >
                {/* rank 셀은 고정 */}
                <td className="rounded-l px-6 py-4 ">
                  <RankBadge rank={rank} />
                </td>

                {/* 나머지 컬럼은 페이지에서 정의 */}
                {columns.map((col, colIndex) => {
                  const content =
                    col.cell?.(row, i) ??
                    (col.accessorKey ? (row as any)[col.accessorKey] : null);

                  const isSecondCol = colIndex === 0;
                  const rank = start + i + 1;
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

      <div className="my-4"></div>

      <Pagination>
        <PaginationContent className="w-full items-center">
          {/* 왼쪽: 이전 */}
          <PaginationItem className="mr-auto">
            <PaginationPrevious
              aria-disabled={current === 1}
              onClick={() => go(current - 1)}
              className={`rounded-sm w-[28px] h-[28px] px-3 py-1 text-sm font-medium transition-colors
          border border-[#323036] text-[#B1ACC1]
          hover:bg-[#FF5679] hover:text-[#110D17] hover:border-none
          ${current === 1 ? "pointer-events-none opacity-50" : ""}`}
            />
          </PaginationItem>

          {/* 가운데: 페이지 번호들 */}
          {pages.map((p, idx) => (
            <PaginationItem key={`${p}-${idx}`}>
              {p === "..." ? (
                <PaginationEllipsis className="text-[#323036]" />
              ) : (
                <PaginationLink
                  isActive={p === current}
                  onClick={() => go(p as number)}
                  className={`w-[28px] h-[28px] rounded-sm px-3 py-1 text-sm font-medium transition-colors
              ${
                p === current
                  ? "bg-[#FF5679] text-[#110D17] border-none"
                  : "border border-[#323036] text-[#B1ACC1] hover:bg-[#FF5679] hover:text-[#110D17] hover:border-none"
              }`}
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* 오른쪽: 다음 */}
          <PaginationItem className="ml-auto">
            <PaginationNext
              aria-disabled={current === totalPages}
              onClick={() => go(current + 1)}
              className={`rounded-sm w-[28px] h-[28px] px-3 py-1 text-sm font-medium transition-colors
          border border-[#323036] text-[#B1ACC1]
          hover:bg-[#FF5679] hover:text-[#110D17] hover:border-none
          ${current === totalPages ? "pointer-events-none opacity-50" : ""}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

/* 1~3등 마름모 뱃지, 그 외는 숫자*/
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

/*행 스타일: 1~3위 그라데이션 + 짝/홀 배경색 */
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
