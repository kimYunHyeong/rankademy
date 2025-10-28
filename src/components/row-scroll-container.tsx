"use client";

import { Children, useRef, useState } from "react";
import { ReactNode } from "react";

/** 개별 알람 카드 타입 (alarmId 추가) */
type AlarmItem = {
  alarmId: string; // ✅ 삭제/식별용 고유 ID
  alarm: string;
  object: string;
  createdAt: string;
};

export default function RowScrollContainer({
  children,
}: {
  children: ReactNode;
}) {
  /** 드래그 스크롤 refs */
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const draggingRef = useRef(false);

  const [isDragging, setIsDragging] = useState(false);
  const DRAG_THRESHOLD = 6; // px

  /** 렌더링/삭제용 로컬 상태 */

  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDownRef.current = true;
    draggingRef.current = false;
    setIsDragging(false);
    startXRef.current = e.pageX - el.offsetLeft;
    startScrollLeftRef.current = el.scrollLeft;
    e.preventDefault();
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el || !isDownRef.current) return;
    const x = e.pageX - el.offsetLeft;
    const dx = x - startXRef.current;
    if (!draggingRef.current && Math.abs(dx) > DRAG_THRESHOLD) {
      draggingRef.current = true;
      setIsDragging(true);
    }
    el.scrollLeft = startScrollLeftRef.current - dx;
  };

  const endDrag = () => {
    isDownRef.current = false;
    setTimeout(() => setIsDragging(false), 0);
    draggingRef.current = false;
  };

  /** 드래그 중 클릭 막기 */
  const onClickCapture = (e: React.MouseEvent) => {
    if (draggingRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseLeave={endDrag}
        onMouseUp={endDrag}
        onClickCapture={onClickCapture}
        className="
          w-full flex gap-6
          overflow-x-auto overflow-y-hidden
          cursor-grab active:cursor-grabbing
          select-none
          [scrollbar-width:none] [-ms-overflow-style:none]
          [touch-action:pan-y]
          relative
          [&::-webkit-scrollbar]:hidden
        "
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>

      {/* 오른쪽 페이드(그라데이션) 오버레이 */}
      <div
        className="
          pointer-events-none
          absolute top-0 right-0 h-full w-16
          bg-[linear-gradient(90deg,rgba(17,13,23,0)_0%,#110D17_100%)]
        "
      />
    </div>
  );
}
