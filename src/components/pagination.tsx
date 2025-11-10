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
import { PaginationData } from "@/types";

type Props = {
  pageData: PaginationData;
  onPageChange?: (queryString: string) => void;
};

const WINDOW_SIZE = 25;

export default function PaginationComponent({ pageData, onPageChange }: Props) {
  const { number = 0, totalPages = 1 } = pageData;

  // 내부는 0-based 유지
  const [pageIndex, setPageIndex] = React.useState(number);
  const [loading, setLoading] = React.useState(false);

  // 현재 보이는 "페이지 묶음"의 시작 index (0, 25, 50, ...)
  const [windowStart, setWindowStart] = React.useState(
    Math.floor((number ?? 0) / WINDOW_SIZE) * WINDOW_SIZE
  );

  // 부모에서 number가 바뀌면 동기화
  useEffect(() => {
    const nextIndex = number ?? 0;
    setPageIndex(nextIndex);
    // 선택된 페이지가 다른 묶음이면 윈도우도 맞춰 이동
    const nextWindowStart = Math.floor(nextIndex / WINDOW_SIZE) * WINDOW_SIZE;
    if (nextWindowStart !== windowStart) {
      setWindowStart(nextWindowStart);
    }
  }, [number]);

  const windowEnd = Math.min(windowStart + WINDOW_SIZE, totalPages);
  const hasPrevWindow = windowStart > 0;
  const hasNextWindow = windowEnd < totalPages;

  // 페이지 이동(0-based index)
  const handlePageChange = (newIndex: number) => {
    if (loading) return;
    if (newIndex < 0 || newIndex > totalPages - 1) return;

    setLoading(true);

    // 같은 페이지를 눌러도 상위에 알림은 보내도록 변경
    if (newIndex !== pageIndex) setPageIndex(newIndex);

    const queryString = `page=${newIndex}`;
    onPageChange?.(queryString);

    setLoading(false);
  };

  // 묶음 이동(화살표)
  const goPrevWindow = () => {
    if (!hasPrevWindow || loading) return;
    const nextStart = Math.max(windowStart - WINDOW_SIZE, 0);
    setWindowStart(nextStart);
  };

  const goNextWindow = () => {
    if (!hasNextWindow || loading) return;
    const nextStart = Math.min(
      windowStart + WINDOW_SIZE,
      Math.max(totalPages - 1, 0)
    );
    setWindowStart(nextStart);
  };

  return (
    <div className="w-full mt-4">
      <Pagination className="w-full">
        <PaginationContent className="flex w-full justify-between items-center">
          {/* 이전 25개 묶음 보기 */}
          <PaginationItem>
            <PaginationPrevious
              onClick={goPrevWindow}
              className={`rounded-sm w-7 h-7 px-3 py-1 text-sm font-medium transition-colors
                border border-[#323036] text-[#B1ACC1]
                hover:bg-[#FF5679] hover:text-[#110D17] hover:border-none
                ${
                  !hasPrevWindow || loading
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
            />
          </PaginationItem>

          {/* 현재 묶음의 페이지 숫자 (표시는 1-based, 로직은 0-based) */}
          <div className="flex gap-2">
            {Array.from({ length: windowEnd - windowStart }).map((_, idx) => {
              const i = windowStart + idx; // 실제 0-based 페이지
              const label = i + 1; // UI 표시는 1-based
              const isActive = pageIndex === i;
              return (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={isActive}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(i);
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

          {/* 다음 25개 묶음 보기 */}
          <PaginationItem>
            <PaginationNext
              onClick={goNextWindow}
              className={`rounded-sm w-7 h-7 px-3 py-1 text-sm font-medium transition-colors
                border border-[#323036] text-[#B1ACC1]
                hover:bg-[#FF5679] hover:text-[#110D17] hover:border-none
                ${
                  !hasNextWindow || loading
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
