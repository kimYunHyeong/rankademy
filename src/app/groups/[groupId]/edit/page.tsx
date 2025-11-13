import { GroupDetail } from "@/types";
import { fetchFromAPI } from "@/utils/fetcher";
import { groupJoinAction } from "../actions";
import TableSection from "./_components/tableSection";

/* 목데이터 */

export default async function GroupMemberEditPage({
  params,
}: {
  params: Promise<{ groupId: number }>;
}) {
  const { groupId } = await params;

  /* 그룹 세부 정보 */
  const groupDetailData = (await fetchFromAPI(`/groups/${groupId}`))
    .data as GroupDetail;

  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white mb-20">
        <span>그룹원 관리</span>
      </div>

      <div className="table container">
        {/* 그룹원 정보 */}
        <TableSection
          groupId={groupId}
          memberCnt={groupDetailData.memberCnt}
          capacity={groupDetailData.capacity}
          isLeader={groupDetailData.isLeader}
          isJoined={groupDetailData.isJoined}
          groupJoinAction={groupJoinAction}
        />
      </div>
    </>
  );
}
