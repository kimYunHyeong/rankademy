"use client";

import { useState } from "react";
import FallBackImage from "@/components/fallback-img";
import { CompetitionRequestMsg } from "@/types";
import { formatDate } from "@/utils/format-date";

type CallbackType = (teamId: number, requestId: number) => Promise<void>;

export default function CheckPopupCompetitionRequest({
  data,
  checkAction,
  xAction,
  teamId,
}: {
  data: CompetitionRequestMsg[];
  checkAction: CallbackType;
  xAction: CallbackType;
  teamId: number;
}) {
  // 로컬 상태(페이드 아웃 플래그 포함)
  const [items, setItems] = useState<
    (CompetitionRequestMsg & { fading: boolean })[]
  >(data.map((item) => ({ ...item, fading: false })));

  // 각 아이템의 고유 키: requestId를 사용하는 것이 안전
  const keyOf = (item: { requestId: number }) => String(item.requestId);

  // 버튼 클릭 처리 (JSX 반환 X)
  const handleSubmit = async (
    item: CompetitionRequestMsg,
    callback: CallbackType
  ) => {
    // 페이드 아웃 시작
    setItems((prev) =>
      prev.map((it) =>
        keyOf(it) === keyOf(item) ? { ...it, fading: true } : it
      )
    );

    try {
      await callback(teamId, item.requestId);
    } finally {
      // 애니메이션 시간 후 목록에서 제거
      setTimeout(() => {
        setItems((prev) => prev.filter((it) => keyOf(it) !== keyOf(item)));
      }, 300);
    }
  };

  return (
    <>
      {items.map((item) => {
        const key = keyOf(item);
        return (
          <div
            key={key}
            className={`flex shrink-0 bg-[#25242A] w-[380px] h-[60px] rounded items-center p-3 justify-between transition-all duration-300 ease-in-out ${
              item.fading ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {/* 좌측 텍스트 */}
            <div className="flex flex-col justify-center">
              <div className="mb-0.5">
                <span className="text-[#FF5679]">{item.fromTeamName}</span>
                <span className="text-white"> 팀의 결투 요청</span>
              </div>
              <span className="text-xs text-[#B1ACC1]">
                {formatDate(item.requestedAt)}
              </span>
            </div>

            {/* 버튼 영역 */}
            <div className="flex">
              <button
                className="mr-0.5"
                onClick={() => handleSubmit(item, checkAction)}
                aria-label="초대 수락"
              >
                <FallBackImage
                  src="/images/pink-check.png"
                  alt="확인"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </button>

              <button
                onClick={() => handleSubmit(item, xAction)}
                aria-label="초대 거절"
              >
                <FallBackImage
                  src="/images/grey-x.png"
                  alt="거절"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </button>
            </div>
          </div>
        );
      })}
    </>
  );
}
