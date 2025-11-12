"use client";

import { useEffect, useState } from "react";
import FallBackImage from "@/components/fallback-img";
import { GroupInviteMsg, PaginationData } from "@/types";
import { formatDate } from "@/utils/format-date";

/* 목데이터 */
import { mockGroupInviationPopUp } from "@/mock/mockGroupInviationPopUp";
import { fetchFromAPI } from "@/utils/fetcher";
import { useRouter } from "next/navigation";

export type GroupInviteMsgApiRes = {
  content: GroupInviteMsg[];
  page: PaginationData;
};
type CallbackType = (groupId: number, invitationId: number) => Promise<void>;

export default function CheckPopupGroupInvite({
  checkAction,
  xAction,
}: {
  checkAction: CallbackType;
  xAction: CallbackType;
}) {
  const router = useRouter();
  const [data, setData] = useState<GroupInviteMsg[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchFromAPI(`/groups/invitation?page=0`);

        // fetchFromAPI가 Response 객체를 반환하는 경우
        if (res instanceof Response) {
          if (res.status === 403) {
            alert("학교 및 라이엇 인증 후 진행해주세요");
            router.replace("/me");
            return;
          }
          if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
          const json = (await res.json()) as GroupInviteMsgApiRes;
          setData(json.content);
          return;
        }

        // fetchFromAPI가 JSON만 반환하는 경우 (Response 아님)
        if (res?.status === 403) {
          alert("학교 및 라이엇 인증 후 진행해주세요");
          router.replace("/me");
          return;
        }

        const json = res as GroupInviteMsgApiRes;
        setData(json.content);
      } catch (err: any) {
        console.error("❌ [GroupInviteFetcher] Error:", err);
        alert("학교 및 라이엇 인증 후 진행해주세요");
        router.replace("/me");
      }
    }

    load();
  }, [router]);
  // 애니메이션 플래그 포함한 로컬 상태
  const [items, setItems] = useState<(GroupInviteMsg & { fading: boolean })[]>(
    data.map((item) => ({ ...item, fading: false }))
  );

  // 각 아이템을 고유하게 식별할 키
  const keyOf = (item: GroupInviteMsg) =>
    `${item.groupId}:${item.invitationId}`;

  const handleSubmit = (item: GroupInviteMsg, callback: CallbackType) => {
    setItems((prev) =>
      prev.map((it) =>
        keyOf(it) === keyOf(item) ? { ...it, fading: true } : it
      )
    );

    setTimeout(() => {
      setItems((prev) => prev.filter((it) => keyOf(it) !== keyOf(item)));
    }, 300);

    callback(item.groupId, item.invitationId);
  };

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
                <span className="text-[#FF5679]">{item.groupName}</span>
                <span className="text-white"> 그룹의 초대</span>
              </div>
              <span className="text-xs text-[#B1ACC1]">
                {formatDate(item.invitedAt)}
              </span>
            </div>

            {/* 버튼 영역 */}
            <div className="flex">
              <button
                className="mr-0.5"
                onClick={() => {
                  handleSubmit(item, checkAction);

                  setTimeout(() => {
                    window.location.reload();
                  }, 100);
                }}
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
