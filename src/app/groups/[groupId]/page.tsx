import GroupInfo from "@/components/group-info";
import { univGroupInfo } from "@/mock/groupInfoData";
import Link from "next/link";
import CheckPopup from "@/components/check-popup";
import { Switch } from "@/components/ui/switch";
import { tier } from "@/types";

import { fetchFromAPI } from "@/utils/fetcher";
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
  groupId: number;
  groupName: string;
  isWin: boolean;
};

const mockRecentCompetitionData: RecentCompetition[] = [
  {
    groupId: 1,
    groupName: "string",
    isWin: true,
  },
  {
    groupId: 2,
    groupName: "string",
    isWin: true,
  },
  {
    groupId: 12,
    groupName: "string",
    isWin: false,
  },
];

/* 그룹 멤버 정보 */
export type GroupMember = {
  summonerName: string;
  summonerTag: string;
  summonerIconId: number;
  major: string;
  admissionYear: number;
  mainPosition: string;
  subPosition: string;
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

export default async function Page({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;

  /* const groupDetailData = mockGroupDetail; */
  let groupDetailData: GroupDetail;

  try {
    const res = await fetchFromAPI(`/groups/${groupId}`);

    groupDetailData = res as GroupDetail;
  } catch (err) {
    console.error("데이터를 불러오지 못했습니다:", err);
    groupDetailData = {
      groupId: 0,
      name: "string",
      about: "string",
      logoImageUrl: "Ezreal",
      avgTierInfo: {
        tier: "UNRANKED" as tier,
        rank: "1",
        lp: 0,
        mappedTier: 0,
      },
      competitionInfo: {
        winCount: 0,
        lossCount: 0,
        winRate: 0,
      },
      capacity: 0,
      memberCnt: 0,
      leader: {
        id: 0,
        summonerName: "string",
        summonerTag: "string",
        summonerIcon: 0,
      },
      createdAt: "string",
      isJoined: true,
      isLeader: true,
    }; //fallback
  }

  return (
    <>
      {/* 🔹 그룹 리더일 때만 버튼들 + 스위치 + 팝업 표시 */}
      {groupDetailData.isLeader && (
        <>
          {/* 상단 버튼들 */}
          <div className="flex justify-between items-center mb-12">
            <div className="flex text-[14px]">
              <Link
                href={`recruits/${univGroupInfo.group.id}`}
                className="flex items-center justify-center border border-[#323036] w-[120px] h-[44px] text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
              >
                모집 게시글 보기
              </Link>
              <Link
                href={`${groupDetailData.groupId}/invite`}
                className="flex items-center justify-center border border-[#323036] w-[120px] h-[44px] text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
              >
                그룹원 초대
              </Link>
              <Link
                href={`${groupDetailData.groupId}/edit`}
                className="flex items-center justify-center border border-[#323036] w-[120px] h-[44px] text-[#B1ACC1] rounded bg-[#25242A33] text-center"
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
      {/* 
      <GroupInfo
        groupDetailData={groupDetailData}
        recentCompetitionData={mockRecentCompetitionData}
      /> */}

      <div className="h-4"></div>
      <GroupTable groupDetailData={groupDetailData} />
    </>
  );
}
