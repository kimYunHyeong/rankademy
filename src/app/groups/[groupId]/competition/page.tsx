import GroupInfo from "@/components/group-info";
import { GroupDetail, RecentCompetition } from "@/types";
import { fetchFromAPI } from "@/utils/fetcher";
import CompetitionTable from "@/components/competition-table";

/* 목데이터 */
import { mockRecentCompetitionData } from "@/mock/recentCompetitionData";
import { mockGroupCompetitionResult } from "@/mock/groupCompetitionResult";

export default async function GroupCompetitionPage({
  params,
}: {
  params: Promise<{ groupId: number }>;
}) {
  const { groupId } = await params;

  /* 그룹 세부 정보 */
  const data = (await fetchFromAPI(`/groups/${groupId}`)).data as GroupDetail;

  /* 대항전 결과 리스트 */
  const URL = `/competitions/groups/${groupId}`;

  /* 최근 대항전 정보 */
  const RecentCompetitionInfo = (
    await fetchFromAPI(`/groups/${groupId}/recent-competitions`)
  ).data as RecentCompetition[];

  return (
    <>
      <div className="flex justify-center text-white">대항전 기록</div>

      {/* 그룹 정보 */}
      <div className="my-4">
        <GroupInfo
          groupId={groupId}
          data={data}
          RecentCompetitionInfo={RecentCompetitionInfo}
        />
      </div>

      <CompetitionTable APIURL={URL} isJoined={data.isJoined} />
    </>
  );
}
