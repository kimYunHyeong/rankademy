import SubHeaderMain from "@/components/sub-header-main";
import { fetchFromAPI } from "@/utils/fetcher";
import { PaginationData } from "@/types";
import CheckPopup from "@/components/check-popup";
import GroupCards from "@/components/group-cards";

/* 목데이터 */
import { mockMyGroups } from "@/mock/myGroup";
import RowScrollContainer from "@/components/row-scroll-container";

/* 내 그룹 */
export type MyGroup = {
  groupId: number;
  groupName: string;
  groupLogoImg: string;
  about: string;
  createdAt: string;
};

/* 그룹 초대 알람 */
export type GroupInviteMsg = {
  invitationId: number;
  groupId: number;
  groupName: string;
  userId: number;
  invitedAt: string;
};

export type GroupInviteMsgApiRes = {
  content: GroupInviteMsg[];
  page: PaginationData;
};

export default async function MyGroupListPage() {
  const res = await fetchFromAPI("/groups/my");
  /* const GroupInviteMsgRes = await fetchFromAPI(`/api/v1/groups/${groupId}/invitation`) */
  return (
    <>
      <SubHeaderMain
        items={[
          { label: "내 그룹", href: "/groups" },
          { label: "모집 게시판", href: "/groups/recruits" },
        ]}
      />

      <div className="h-20"></div>

      <RowScrollContainer>
        <CheckPopup />
      </RowScrollContainer>

      <div className="h-25"></div>

      <RowScrollContainer>
        <GroupCards data={res} />
      </RowScrollContainer>
    </>
  );
}
