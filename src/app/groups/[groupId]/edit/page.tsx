import { GroupMemberAPIres, GroupDetail } from "@/types";
import { fetchFromAPI } from "@/utils/fetcher";
import { groupJoinAction } from "../actions";

/* 목데이터 */
import { mockGroupMembers } from "@/mock/groupMember";
import { mockPaginationData } from "@/mock/mockPaginationData";
import TableSection from "./_components/tableSection";

export default async function GroupMemberEditPage({
  params,
}: {
  params: Promise<{ groupId: number }>;
}) {
  const { groupId } = await params;

  /* 그룹 세부 정보 */
  const groupDetailDataRequieredQuery = `?page=0&groupId=${groupId}`;
  const groupDetailDataApiUrl = `/groups/${groupId}${groupDetailDataRequieredQuery}`;
  const groupDetailData = (await fetchFromAPI(
    groupDetailDataApiUrl
  )) as GroupDetail;

  /* 그룹 멤버 정보 */
  const groupMemberDataRequieredQuery = `?page=0&`;
  const groupMemberDataApiUrl = `/groups/${groupId}/members/manage${groupMemberDataRequieredQuery}`;
  const groupMemberData = (await fetchFromAPI(
    groupMemberDataApiUrl
  )) as GroupMemberAPIres;
  const groupMember = groupMemberData.content;
  const pageData = groupMemberData.page;

  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-3">
        <span>그룹원 관리</span>
      </div>
      <div className="h-20"></div>

      <div className="table container">
        {/* 그룹원 정보 */}
        <TableSection
          groupId={groupDetailData.groupId}
          memberCnt={groupDetailData.memberCnt}
          capacity={groupDetailData.capacity}
          isLeader={groupDetailData.isLeader}
          isJoined={groupDetailData.isJoined}
          memberApiUrl={groupMemberDataApiUrl}
          groupMember={groupMember}
          pageData={pageData}
          groupJoinAction={groupJoinAction}
        />
      </div>
    </>
  );
}
