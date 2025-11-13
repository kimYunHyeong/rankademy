"use client";

import Link from "next/link";
import Toggle from "@/components/toggle";
import { upGroupRecruitmentAction } from "../actions";
import CheckPopupGroupJoinRequest from "@/components/check-popup-group-join-request";

import RowScrollContainer from "@/components/row-scroll-container";

import "dayjs/locale/ko";
import { GroupJoinRequestMsg } from "@/types";
import { acceptGroupInvite, rejectGroupInvite } from "@/app/groups/actions";
import { useRouter } from "next/navigation";
import {
  closeGroupRecruitment,
  startGroupRecruitment,
} from "@/app/groups/[groupId]/actions";

export default function GroupRecruitmentLeaderSection({
  groupId,
  joinReqData,
  recruitStatus,
}: {
  groupId: number;
  joinReqData: GroupJoinRequestMsg[];
  recruitStatus: boolean;
}) {
  const router = useRouter();

  const handleUp = async () => {
    try {
      const status = await upGroupRecruitmentAction(groupId);

      if (status === 200) {
        router.push(`${groupId}/up/ok`);
      } else if (status === 403) {
        router.push(`${groupId}/up/x`);
      } else {
        console.warn("예상치 못한 상태 코드:", status);
      }
    } catch (e) {
      console.error("게시글 업 실패:", e);
      router.push(`${groupId}/up/forbidden`);
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-12">
          <div className="flex text-[14px]">
            {/*       <Link
              href={`${groupId}/delete`}
              className="flex items-center justify-center border border-[#323036] w-[120px] h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
            >
              게시글 삭제
            </Link> */}
            <Link
              href={`edit?groupId=${groupId}`}
              className="flex items-center justify-center border border-[#323036] w-[120px] h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
            >
              게시글 수정
            </Link>
            <button
              onClick={() => {
                handleUp();
              }}
              className="flex items-center justify-center border border-[#323036] w-[120px] h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center"
            >
              게시글 UP
            </button>
          </div>

          {/* 그룹원 모집 스위치 */}
          <div className="flex">
            <span className="text-white text-xs mr-2">그룹원 모집</span>
            <Toggle
              groupId={groupId}
              onAble={startGroupRecruitment}
              onDisable={closeGroupRecruitment}
              defaultChecked={recruitStatus}
            />
          </div>
        </div>
      </div>

      {/* 그룹 가입 요청 */}
      <RowScrollContainer>
        <CheckPopupGroupJoinRequest
          data={joinReqData}
          checkAction={acceptGroupInvite}
          xAction={rejectGroupInvite}
          groupId={groupId}
        />
      </RowScrollContainer>
    </>
  );
}
