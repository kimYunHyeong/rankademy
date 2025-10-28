import GroupInfo from "@/components/group-info";
import { univGroupInfo } from "@/mock/groupInfoData";
import Link from "next/link";
import CheckPopup from "@/components/check-popup";
import RowScrollContainer from "@/components/row-scroll-container";
import { Switch } from "@/components/ui/switch";
import {
  Position,
  GroupDetail,
  RecentCompetition,
  PaginationData,
} from "@/types";

import { fetchFromAPI } from "@/utils/fetcher";
import GroupTable from "@/components/group-table";

/* 목데이터 */
import { mockRecentCompetitionData } from "@/mock/recentCompetitionData";

/* 그룹 멤버 정보 */
export type GroupMember = {
  summonerName: string;
  summonerTag: string;
  summonerIconId: number;
  major: string;
  admissionYear: number;
  mainPosition: Position;
  subPosition: Position;
  tierInfo: {
    tier: string;
    rank: string;
    lp: number;
    mappedTier: number;
  };
  recordInfo: {
    winCount: number;
    lossCount: number;
    winRate: number;
  };
};

export type GroupMemberAPIres = {
  content: GroupMember[];
  page: PaginationData;
};

export default async function GroupDetailPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;

  /* 그룹 세부 정보 */
  const groupDetailDataRequieredQuery = `?page=0&groupId=${groupId}`;
  const groupDetailDataApiUrl = `/groups/${groupId}${groupDetailDataRequieredQuery}`;
  const groupDetailData = (await fetchFromAPI(
    groupDetailDataApiUrl
  )) as GroupDetail;

  /* 최근 대항전 정보 */
  const recentCompetitionDataRequieredQuery = `?page=0&groupId=${groupId}`;
  const recentCompetitionDataApiUrl = `/groups/${groupId}/recent-competitions${recentCompetitionDataRequieredQuery}`;
  const recentCompetitionData = (await fetchFromAPI(
    recentCompetitionDataApiUrl
  )) as RecentCompetition[];

  /* 그룹 멤버 정보 */
  const groupMemberDataRequieredQuery = `?page=0&groupId=${groupId}`;
  const groupMemberDataApiUrl = `/groups/${groupId}/members${groupMemberDataRequieredQuery}`;
  const groupMemberData = (await fetchFromAPI(
    groupMemberDataApiUrl
  )) as GroupMemberAPIres;
  const groupMember = groupMemberData.content;
  const pageData = groupMemberData.page;

  return (
    <>
      {/* 그룹 리더일 때 표시할 정보 */}
      {groupDetailData.isLeader && (
        <>
          {/* 모집 게시글 | 그룹원 초대 | 그룹원 관리 */}
          <div className="flex justify-between items-center mb-12">
            <div className="flex text-[14px]">
              <Link
                href={`recruits/${univGroupInfo.group.id}`}
                className="flex items-center justify-center border border-[#323036] w-30 h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
              >
                모집 게시글 보기
              </Link>
              <Link
                href={`${groupDetailData.groupId}/invite`}
                className="flex items-center justify-center border border-[#323036] w-30 h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
              >
                그룹원 초대
              </Link>
              <Link
                href={`${groupDetailData.groupId}/edit`}
                className="flex items-center justify-center border border-[#323036] w-30 h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center"
              >
                그룹원 관리
              </Link>
            </div>

            {/* 그룹원 모집 스위치 */}
            <div className="flex">
              <span className="text-white text-xs mr-2">그룹원 모집</span>
              <Switch />
            </div>
          </div>
          <RowScrollContainer>
            <CheckPopup />
          </RowScrollContainer>
        </>
      )}

      <div className="h-4"></div>

      {/* 그룹 정보 */}
      <GroupInfo
        groupDetailData={groupDetailData}
        competitionInfo={
          groupDetailData?.competitionInfo ?? {
            winCount: 0,
            lossCount: 0,
            winRate: 0,
          }
        }
        recentCompetitionData={recentCompetitionData}
      />

      <div className="h-4"></div>
      {/* 그룹원 정보 */}
      <GroupTable
        groupId={groupDetailData.groupId}
        memberCnt={groupDetailData.memberCnt}
        capacity={groupDetailData.capacity}
        isLeader={groupDetailData.isLeader}
        isJoined={groupDetailData.isJoined}
        memberApiUrl={groupMemberDataApiUrl}
        groupMember={groupMember}
        pageData={pageData}
      />
    </>
  );
}
