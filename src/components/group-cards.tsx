"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { GroupCardData } from "@/types";

export default function GroupCards({ data }: { data: GroupCardData[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const draggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const DRAG_THRESHOLD = 6; // px

  const onMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDownRef.current = true;
    draggingRef.current = false;
    setIsDragging(false);
    startXRef.current = e.pageX - el.offsetLeft;
    startScrollLeftRef.current = el.scrollLeft;
    e.preventDefault(); // 이미지 드래그/텍스트 선택 방지
  };

  const onMouseMove = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el || !isDownRef.current) return;

    const x = e.pageX - el.offsetLeft;
    const dx = x - startXRef.current;

    // 임계값을 넘으면 드래그로 간주
    if (!draggingRef.current && Math.abs(dx) > DRAG_THRESHOLD) {
      draggingRef.current = true;
      setIsDragging(true);
    }
    el.scrollLeft = startScrollLeftRef.current - dx;
  };

  const endDrag = () => {
    isDownRef.current = false;
    // 드래그 직후 발생할 수 있는 클릭 이벤트 방지
    setTimeout(() => setIsDragging(false), 0);
    draggingRef.current = false;
  };

  // 내부 요소 클릭 캡처 단계에서 차단
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
        {data.map((item, idx) => {
          const key = (item as any)?.group?.id ?? idx; // id 없을 때 idx fallback
          return (
            <Link key={key} href={`/groups/${item.group.id}`}>
              <div
                className="
                  flex-shrink-0
                  text-white
                  rounded-xl
                  w-[380px]
                  overflow-hidden
                  border-[1.5px] border-solid border-transparent
                  [border-image-slice:1]
                  [border-image-source:linear-gradient(90deg,rgba(255,86,121,0.2)_0%,rgba(255,86,121,0)_100%)]
                  [clip-path:inset(0_round_0.75rem)]
                "
                // 드래그 중에는 내부 인터랙션 차단
                style={{ pointerEvents: isDragging ? "none" : "auto" }}
              >
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${item.group.icon}.png`}
                  alt={item.group.icon}
                  width={380}
                  height={316}
                  className="rounded-t-xl"
                  draggable={false}
                />
                <div className="w-[380px] h-[224px] flex flex-col bg-[#25242A33] p-8">
                  <span className="text-xl">{item.group.name}</span>
                  <span className="text-[#B1ACC1] text-xs my-5">
                    가입일 | {item.createdAt}
                  </span>
                  <span className="block text-sm max-h-24 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {item.description}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
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
