"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import FallBackImage from "@/components/fallback-img";
import { Alarm } from "@/app/layout";
import { fetchFromAPI } from "@/utils/fetcher";
import Image from "next/image";

type AlarmRes = {
  content: Alarm[];
  // 필요한 경우 다른 필드도 추가하세요 (pageable, totalElements 등)
};

type AlarmFx = Alarm & { _fading?: boolean };

export default function AlarmSection({
  alarmList,
  checkAction,
}: {
  alarmList: Alarm[];
  checkAction: (alarmId: number) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // 내부에서 갱신 가능한 알람 리스트 상태
  const [list, setList] = useState<AlarmFx[]>(
    () => alarmList.map((a) => ({ ...a, _fading: false })) // 초기화
  );

  // 외부에서 전달된 alarmList가 바뀌면 내부 상태도 동기화 (안전장치)
  useEffect(() => {
    setList(alarmList.map((a) => ({ ...a, _fading: false })));
  }, [alarmList]);

  // 바깥 클릭/ESC로 닫기
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // 클릭 핸들러: 페이드아웃 → 체크 API → 목록 재조회
  const handleItemClick = async (id: number) => {
    // 1) 먼저 해당 항목만 페이드 아웃
    setList((prev) =>
      prev.map((it) =>
        it.notificationId === id ? { ...it, _fading: true } : it
      )
    );

    // 2) 애니메이션 시간만큼 대기(transition duration과 동일)
    await new Promise((r) => setTimeout(r, 300));

    // 3) 읽음 처리
    try {
      await checkAction(id);
    } catch (e) {
      // 실패 시 페이드 상태 되돌리기
      setList((prev) =>
        prev.map((it) =>
          it.notificationId === id ? { ...it, _fading: false } : it
        )
      );
      return;
    }

    // 4) 최신 알림 다시 가져와서 반영
    try {
      const res = (await fetchFromAPI(`/notifications?page=0`))
        .data as AlarmRes;
      setList(res.content.map((a) => ({ ...a, _fading: false })));
    } catch {
      // 재조회 실패 시, 일단 해당 항목만 제거된 상태 유지
      setList((prev) => prev.filter((it) => it.notificationId !== id));
    }
  };

  return (
    <div className="relative" ref={rootRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="알람"
        className="focus:outline-none"
      >
        <Image
          src={`/images/alarm${open ? "-full" : "-empty"}.png`}
          alt="알람"
          width={18}
          height={18}
          className="object-contain transition-transform duration-200 ease-out hover:scale-110"
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-12 top-0 -translate-y-[80%]
                     w-95 h-115 z-50 rounded border border-[#323036] 
                     bg-[#1D1921] shadow-lg p-2 overflow-auto"
        >
          {/* 알람 리스트 */}
          {list.length === 0 ? (
            <div className="text-sm text-[#B1ACC1] px-2 py-3">
              새로운 알림이 없습니다.
            </div>
          ) : (
            list.map((item) => (
              <div
                key={item.notificationId}
                onClick={() => handleItemClick(item.notificationId)}
                className={`flex flex-col bg-[#25242A] w-full h-15 rounded mb-0.5 py-2.5 px-4 cursor-pointer transition-all duration-300 hover:bg-[#323036] ${
                  item._fading ? "opacity-0 scale-95" : "opacity-100 scale-100"
                }`}
              >
                <span className="text-white">{item.message}</span>
                <span className="mt-0.5 text-xs text-[#B1ACC1]">
                  {item.deliveredAt}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
