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
  /** 렌더링/삭제용 로컬 상태 */
  const [items, setItems] = useState<AlarmItem[]>(mock);

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

  return items.map((item) => (
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
        <button className="mr-0.5" onClick={() => handleAccept(item.alarmId)}>
          <Image
            src="/images/pink-check.png"
            alt="확인"
            width={32}
            height={32}
            className="object-contain"
          />
        </button>

        <button onClick={() => handleReject(item.alarmId)}>
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
  ));
}
