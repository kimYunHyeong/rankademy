import GroupInfo from "@/components/group-info";
import {
  GroupCompetitionResult,
  GroupDetail,
  PaginationData,
  RecentCompetition,
} from "@/types";
import { serverFetchFromAPI } from "@/utils/fetcher.server";
import GroupCompetitionResultSection from "./_components/groupCompetitionResultSection";

/* 목데이터 */
import { mockRecentCompetitionData } from "@/mock/recentCompetitionData";
import { mockGroupCompetitionResult } from "@/mock/groupCompetitionResult";

export default async function GroupCompetitionPage({
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

  /* 그룹의 대항전 기록 */
  type competitionResultAPIres = {
    content: GroupCompetitionResult[];
    page: PaginationData;
  };

  const competitionResultDataRequieredQuery = `?page=0&groupId=${groupId}`;
  const competitionResultDataApiUrl = `/competitions/groups/${groupId}${competitionResultDataRequieredQuery}`;
  /*   const competitionResultData = (await serverFetchFromAPI(
    competitionResultDataApiUrl
  )) as competitionResultAPIres; */

  const competitionResultData = {
    content: mockGroupCompetitionResult,
    page: {
      size: 10,
      number: 1,
      totalElements: 1,
      totalPages: 1,
    },
  };

  return (
    <>
      <div className="flex justify-center text-white">대항전 기록</div>
      <div className="h-4"></div>

      {/* 그룹 정보 */}
      <GroupInfo
        groupDetailData={groupDetailData}
        recentCompetitionData={mockRecentCompetitionData}
      />
      <div className="h-4"></div>
      <GroupCompetitionResultSection
        tableData={competitionResultData.content}
        pageData={competitionResultData.page}
        apiurl={competitionResultDataApiUrl}
      />
    </>
  );
}
