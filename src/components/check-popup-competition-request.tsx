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
  // 애니메이션 플래그 포함한 로컬 상태
  const [items, setItems] = useState<
    (CompetitionRequestMsg & { fading: boolean })[]
  >(data.map((item) => ({ ...item, fading: false })));

  // 각 아이템을 고유하게 식별할 키
  const keyOf = (item: CompetitionRequestMsg) => `${item.fromTeamId}:${teamId}`;

  const handleSubmit = (
    item: CompetitionRequestMsg,
    callback: CallbackType
  ) => {
    setItems((prev) =>
      prev.map((it) =>
        keyOf(it) === keyOf(item) ? { ...it, fading: true } : it
      )
    );

    setTimeout(() => {
      setItems((prev) => prev.filter((it) => keyOf(it) !== keyOf(item)));
    }, 300);

    callback(item.fromTeamId, teamId);

    return (
      <>
        {items.map((item, i) => {
          const key = keyOf(item) || String(i);
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
                  <span className="text-[#73D8FF]">{item.fromTeamName}</span>
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
  };
}
