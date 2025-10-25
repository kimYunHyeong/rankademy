import GroupInfo from "@/components/group-info";
import { univGroupInfo } from "@/mock/groupInfoData";
import Link from "next/link";
import CheckPopup from "@/components/check-popup";
import { Switch } from "@/components/ui/switch";
import { CompetitionStatus, position, tier } from "@/types";

import { serverFetchFromAPI } from "@/utils/fetcher.server";
import GroupTable from "@/components/group-table";

import { mockGroupDetail } from "@/mock/groupDetail";

/* 그룹 상세 정보 */
export type GroupDetail = {
  groupId: number;
  name: string;
  about: string;
  logoImageUrl: string;
  avgTierInfo: {
    tier: tier;
    rank: string;
    lp: number;
    mappedTier: number;
  };
  competitionInfo: {
    winCount: number;
    lossCount: number;
    winRate: number;
  };
  capacity: number;
  memberCnt: number;
  leader: {
    id: number;
    summonerName: string;
    summonerTag?: string;
    summonerIcon: number;
  };
  createdAt: string;
  isJoined: boolean;
  isLeader: boolean;
};

/* 최근 대항전 정보 */
export type RecentCompetition = {
  competitionId: number;
  groupId: number;
  groupName: string;
  isWin: boolean;
  status: CompetitionStatus;
};

/* 그룹 멤버 정보 */
export type GroupMember = {
  summonerName: string;
  summonerTag: string;
  summonerIconId: number;
  major: string;
  admissionYear: number;
  mainPosition: position;
  subPosition: position;
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

const mockRecentCompetitionData: RecentCompetition[] = [
  {
    competitionId: 1,
    groupId: 1,
    groupName: "string",
    isWin: false,
    status: "SCHEDULED",
  },
  {
    competitionId: 2,
    groupId: 3,
    groupName: "string",
    isWin: true,
    status: "SCHEDULED",
  },
  {
    competitionId: 3,
    groupId: 4,
    groupName: "string",
    isWin: true,
    status: "SCHEDULED",
  },
];

export default async function GroupDetailPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;

  /* 그룹 세부 정보 */
  const groupDetailDataRequieredQuery = `?page=0&groupId=${groupId}`;
  const groupDetailDataApiUrl = `/groups/${groupId}${groupDetailDataRequieredQuery}`;
  const groupDetailData = (await serverFetchFromAPI(
    groupDetailDataApiUrl
  )) as GroupDetail;

  /* 최근 대항전 정보 */
  const recentCompetitionDataRequieredQuery = `?page=0&groupId=${groupId}`;
  const recentCompetitionDataApiUrl = `/groups/${groupId}/recent-competitions${recentCompetitionDataRequieredQuery}`;
  const recentCompetitionData = (await serverFetchFromAPI(
    recentCompetitionDataApiUrl
  )) as RecentCompetition[];

  /* 그룹 멤버 정보 */
  const groupMemberDataRequieredQuery = `?page=0&groupId=${groupId}`;
  const groupMemberDataApiUrl = `/groups/${groupId}/members${groupMemberDataRequieredQuery}`;
  const groupMemberData = (await serverFetchFromAPI(
    groupMemberDataApiUrl
  )) as GroupMember[];
  /* const pageData = groupMemberData.page; */

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
          <CheckPopup />
        </>
      )}

      <div className="mt-5"></div>

      {/* 그룹 정보 */}
      <GroupInfo
        groupDetailData={groupDetailData}
        recentCompetitionData={mockRecentCompetitionData}
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
        groupMember={groupMemberData}
        pageData={{
          size: 20,
          number: 0,
          totalElements: 1,
          totalPages: 1,
        }}
      />
    </>
  );
}
