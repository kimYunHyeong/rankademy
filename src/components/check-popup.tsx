"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type AlarmType =
  | "groupInvite"
  | "groupRequest"
  | "teamCreate"
  | "teamDelete"
  | "competitionRequest";

/** 개별 알람 카드 타입 (alarmId 추가) */
type AlarmItem = {
  alarmId: string; // ✅ 삭제/식별용 고유 ID
  alarm: AlarmType;
  object: string;
  createdAt: string;
};

/** mock + alarmId 부여 */
const mock: AlarmItem[] = [
  {
    alarmId: "a1",
    alarm: "groupInvite",
    object: "서울과기대 컴퓨터공학과1",
    createdAt: "2025.07.23",
  },
  {
    alarmId: "a2",
    alarm: "groupInvite",
    object: "서울과기대 컴퓨터공학과2",
    createdAt: "2025.07.23",
  },
  {
    alarmId: "a3",
    alarm: "groupInvite",
    object: "서울과기대 컴퓨터공학과3",
    createdAt: "2025.07.23",
  },
  {
    alarmId: "a4",
    alarm: "groupInvite",
    object: "서울과기대 컴퓨터공학과4",
    createdAt: "2025.07.23",
  },
  {
    alarmId: "a5",
    alarm: "groupInvite",
    object: "서울과기대 컴퓨터공학과",
    createdAt: "2025.07.23",
  },
  {
    alarmId: "a6",
    alarm: "groupInvite",
    object: "서울과기대 컴퓨터공학과",
    createdAt: "2025.07.23",
  },
  {
    alarmId: "a7",
    alarm: "groupInvite",
    object: "서울과기대 컴퓨터공학과",
    createdAt: "2025.07.23",
  },
  {
    alarmId: "a8",
    alarm: "groupInvite",
    object: "서울과기대 컴퓨터공학과",
    createdAt: "2025.07.23",
  },
  {
    alarmId: "a9",
    alarm: "groupInvite",
    object: "서울과기대 컴퓨터공학과",
    createdAt: "2025.07.23",
  },
  {
    alarmId: "a10",
    alarm: "groupInvite",
    object: "서울과기대 컴퓨터공학과",
    createdAt: "2025.07.23",
  },
  {
    alarmId: "a11",
    alarm: "groupInvite",
    object: "서울과기대 컴퓨터공학과",
    createdAt: "2025.07.23",
  },
];

export default function CheckPopup() {
  /** 드래그 스크롤 refs */
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const draggingRef = useRef(false);

  const [isDragging, setIsDragging] = useState(false);
  const DRAG_THRESHOLD = 6; // px

  /** 렌더링/삭제용 로컬 상태 */
  const [items, setItems] = useState<AlarmItem[]>(mock);

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

  /** 개별 카드 삭제 */
  const removeById = (alarmId: string) =>
    setItems((prev) => prev.filter((it) => it.alarmId !== alarmId));

  const handleAccept = (alarmId: string) => {
    console.log("수락됨", alarmId);
    removeById(alarmId);
  };

  const handleReject = (alarmId: string) => {
    console.log("취소됨", alarmId);
    removeById(alarmId);
  };

  if (items.length === 0) {
    // 전부 처리된 경우 (필요시 UI 변경 가능)
    return null;
  }

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
        {items.map((item) => (
          <div
            key={item.alarmId} // ✅ 고정 key
            className="flex shrink-0 bg-[#25242A] w-[380px] h-[60px] rounded items-center p-2 justify-between"
          >
            {/* 좌측 글 */}
            <div className="flex flex-col justify-center">
              <div>
                <span className="text-[#FF5679]">{item.object}</span>
                <span className="text-white"> {item.alarm}</span>
              </div>
              <span className="text-xs text-[#B1ACC1]">{item.createdAt}</span>
            </div>

            {/* 버튼 */}
            <div className="flex">
              <button
                className="mr-[2px]"
                onClick={() => handleAccept(item.alarmId)}
                disabled={isDragging}
              >
                <Image
                  src="/images/pink-check.png"
                  alt="확인"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </button>

              <button
                onClick={() => handleReject(item.alarmId)}
                disabled={isDragging}
              >
                <Image
                  src="/images/grey-x.png"
                  alt="거절"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </button>
            </div>
          </div>
        ))}
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
