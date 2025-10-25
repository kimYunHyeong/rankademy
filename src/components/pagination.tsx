"use client";

import React, { useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { paginationData } from "@/types";

type Props = {
  pageData: paginationData; // number: 0-based 가정
  onPageChange?: (queryString: string) => void; // "page=0" 형식
};

export default function PaginationComponent({ pageData, onPageChange }: Props) {
  const { number = 0, totalPages = 1 } = pageData;

  // ✅ 내부는 항상 0-based로 유지
  const [pageIndex, setPageIndex] = React.useState(number);
  const [loading, setLoading] = React.useState(false);

  // 부모에서 number가 바뀌면 동기화 (여기서도 0-based 유지)
  useEffect(() => {
    setPageIndex(number ?? 0);
  }, [number]);

  // newIndex는 0-based로 받음
  const handlePageChange = (newIndex: number) => {
    if (loading) return;
    if (newIndex === pageIndex) return;
    if (newIndex < 0 || newIndex > totalPages - 1) return;

    setPageIndex(newIndex);
    setLoading(true);

    // 상위로는 0-based 그대로 전달
    const queryString = `page=${newIndex}`;
    console.log("페이지 클릭됨:", queryString);
    onPageChange?.(queryString);
    setLoading(false);
  };

  return (
    <div className="w-full mt-4">
      <Pagination className="w-full">
        <PaginationContent className="flex w-full justify-between items-center">
          {/* 이전 (0-based) */}
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePageChange(pageIndex - 1)}
              className={`rounded-sm w-7 h-7 px-3 py-1 text-sm font-medium transition-colors
                border border-[#323036] text-[#B1ACC1]
                hover:bg-[#FF5679] hover:text-[#110D17] hover:border-none
                ${
                  pageIndex === 0 || loading
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
            />
          </PaginationItem>

          {/* 페이지 숫자 (표시는 1-based, 로직은 0-based) */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => {
              const label = i + 1; // 표시용 1-based
              const isActive = pageIndex === i; // 비교는 0-based
              return (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={isActive}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(i); // 0-based로 전달
                    }}
                    className={`w-7 h-7 rounded-sm px-3 py-1 text-sm font-medium transition-colors
                      ${
                        isActive
                          ? "bg-[#FF5679] text-[#110D17] border-none"
                          : "border border-[#323036] text-[#B1ACC1] hover:bg-[#FF5679] hover:text-[#110D17] hover:border-none"
                      }`}
                  >
                    {label}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
          </div>

          {/* 다음 (0-based) */}
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(pageIndex + 1)}
              className={`rounded-sm w-7 h-7 px-3 py-1 text-sm font-medium transition-colors
                border border-[#323036] text-[#B1ACC1]
                hover:bg-[#FF5679] hover:text-[#110D17] hover:border-none
                ${
                  pageIndex === totalPages - 1 || loading
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
