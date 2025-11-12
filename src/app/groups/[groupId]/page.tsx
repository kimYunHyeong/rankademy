import GroupInfo from "@/components/group-info";
import Link from "next/link";
import RowScrollContainer from "@/components/row-scroll-container";
import Toggle from "@/components/toggle";
import CheckPopupGroupJoinRequest from "@/components/check-popup-group-join-request";
import {
  GroupDetail,
  GroupJoinRequestMsg,
  PaginationData,
  RecentCompetition,
} from "@/types";
import { GroupMemberAPIres } from "@/types";
import { fetchFromAPI } from "@/utils/fetcher";
import GroupTable from "@/components/group-table";
import {
  acceptGroupJoinRequest,
  rejectGroupJoinRequest,
  groupJoinAction,
  startGroupRecruitment,
  closeGroupRecruitment,
} from "./actions";

/* 목데이터 */
import { mockRecentCompetitionData } from "@/mock/recentCompetitionData";
import { mockGroupJoinRequestPopUp } from "@/mock/mockGroupJoinRequestPopUp";
import GroupTableHeader from "@/components/group-table-header";
import { redirect } from "next/navigation";

type GroupJoinRequestMsgApiRes = {
  content: GroupJoinRequestMsg[];
  page: PaginationData;
};

export default async function GroupDetailPage({
  params,
}: {
  params: Promise<{ groupId: number }>;
}) {
  const { groupId } = await params;

  /* 그룹 세부 정보 */
  const data = (await fetchFromAPI(`/groups/${groupId}`)).data as GroupDetail;

  /* 최근 대항전 정보 */
  const RecentCompetitionInfo =
    ((await fetchFromAPI(`/groups/${groupId}/recent-competitions`))
      .data as RecentCompetition[]) ?? [];

  /* 그룹 가입 요청 확인 */
  const groupJoinRequestData: GroupJoinRequestMsg[] =
    data.isLeader === true
      ? (
          (await fetchFromAPI(`/groups/${groupId}/join-requests?page=0`))
            .data as GroupJoinRequestMsgApiRes
        ).content ?? []
      : [];

  return (
    <>
      {/* 그룹 리더일 때 표시할 정보 */}
      {data.isLeader && (
        <>
          {/* 모집 게시글 | 그룹원 초대 | 그룹원 관리 */}
          <div className="flex justify-between items-center mb-12">
            <div className="flex text-[14px]">
              <Link
                href={`recruits/${data.groupId}`}
                className="flex items-center justify-center border border-[#323036] w-30 h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
              >
                모집 게시글 보기
              </Link>
              <Link
                href={`${data.groupId}/invite?univName=${data.univName}`}
                className="flex items-center justify-center border border-[#323036] w-30 h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
              >
                그룹원 초대
              </Link>
              <Link
                href={`${data.groupId}/edit`}
                className="flex items-center justify-center border border-[#323036] w-30 h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center"
              >
                그룹원 관리
              </Link>
            </div>

            {/* 그룹원 모집 스위치 */}
            <div className="flex">
              <span className="text-white text-xs mr-2">그룹원 모집</span>
              <Toggle
                groupId={groupId}
                onAble={startGroupRecruitment}
                onDisable={closeGroupRecruitment}
                defaultChecked={data.isRecruiting}
              />
            </div>
          </div>

          {/* 그룹 가입 요청 알림 */}
          <RowScrollContainer>
            <CheckPopupGroupJoinRequest
              data={groupJoinRequestData}
              checkAction={acceptGroupJoinRequest}
              xAction={rejectGroupJoinRequest}
              groupId={groupId}
            />
          </RowScrollContainer>
        </>
      )}

      {/* 그룹 정보 */}
      <div className="my-4">
        <GroupInfo
          groupId={groupId}
          data={data}
          RecentCompetitionInfo={RecentCompetitionInfo}
        />
      </div>

      {/* 그룹원 헤더 */}
      <GroupTableHeader
        groupId={groupId}
        memberCnt={data.memberCnt}
        capacity={data.capacity}
        isJoined={data.isJoined}
        isLeader={data.isLeader}
        groupJoinAction={groupJoinAction}
      />

      {/* 그룹원 정보 */}
      <GroupTable groupId={groupId} />
    </>
  );
}
