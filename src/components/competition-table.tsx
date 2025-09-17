"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type RowData = {
  id: string;
  groupName: string;
  school: string;
  date: string;
  result: "win" | "lose"; // win/lose로 내려옴
  details: React.ReactNode;
};

export function CompetitionTable({ data }: { data: RowData[] }) {
  const [openIds, setOpenIds] = React.useState<Set<string>>(new Set());
  const toggleRow = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  // ✅ 페이지네이션 상태
  const pageSize = 15; // 한 페이지에 보여줄 행 수
  const [page, setPage] = React.useState(1);

  const total = data.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pageData = data.slice(start, end);

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
          {pageData.map((row) => {
            const isOpen = openIds.has(row.id);
            const isWin = row.result === "win";
            const rowClassName = isWin
              ? "bg-[#2E223F] bg-gradient-to-r from-[#FF5679]/20 to-[#2E223F]"
              : "bg-[#24192F]";

            return (
              <React.Fragment key={row.id}>
                <TableRow
                  className={`${rowClassName} [&>td]:py-4 cursor-pointer group border-none hover:bg-gray-700/50 transition-colors`}
                  onClick={() => toggleRow(row.id)}
                >
                  <TableCell className="rounded-l text-center border-none">
                    VS
                  </TableCell>
                  <TableCell className="border-none">{row.groupName}</TableCell>
                  <TableCell className="border-none">{row.school}</TableCell>
                  <TableCell className="border-none">{row.date}</TableCell>
                  <TableCell
                    className={`rounded-r border-none ${
                      isWin ? "text-[#FF5679]" : "text-white"
                    }`}
                  >
                    {isWin ? "승리" : "패배"}
                  </TableCell>
                </TableRow>

                {isOpen && (
                  <TableRow className="border-none">
                    <TableCell colSpan={5} className="p-0 border-none">
                      <div className="bg-[#1B1227] p-4 md:p-6 text-xs">
                        {row.details}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>

      {/* 페이지네이션 */}
      <div className="w-full mt-4">
        <Pagination className="w-full">
          <PaginationContent className="flex w-full justify-between items-center">
            {/* 왼쪽: 이전 버튼 */}
            <div>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className={`rounded-sm w-[28px] h-[28px] px-3 py-1 text-xs font-medium transition-colors
              border border-[#323036] text-[#B1ACC1]
              hover:bg-[#FF5679] hover:text-[#110D17] hover:border-none
              ${page === 1 ? "pointer-events-none opacity-50" : ""}`}
                />
              </PaginationItem>
            </div>

            {/* 가운데: 페이지 숫자 */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={page === i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`w-[28px] h-[28px] rounded-sm px-3 py-1 text-xs font-medium transition-colors
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

            {/* 오른쪽: 다음 버튼 */}
            <div>
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className={`rounded-sm w-[28px] h-[28px] px-3 py-1 text-xs font-medium transition-colors
              border border-[#323036] text-[#B1ACC1]
              hover:bg-[#FF5679] hover:text-[#110D17] hover:border-none
              ${page === totalPages ? "pointer-events-none opacity-50" : ""}`}
                />
              </PaginationItem>
            </div>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
