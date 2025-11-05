import SubHeaderMain from "@/components/sub-header-main";
import { fetchFromAPI } from "@/utils/fetcher";
import { PaginationData } from "@/types";
import GroupCards from "@/components/group-cards";
import { GroupInviteMsg } from "@/types";
import RowScrollContainer from "@/components/row-scroll-container";
import { acceptGroupInvite, rejectGroupInvite } from "./actions";
import CheckPopupGroupInvite from "@/components/check-popup-group-invite";

/* 목데이터 */
import { mockMyGroups } from "@/mock/myGroup";
import { mockGroupInviationPopUp } from "@/mock/mockGroupInviationPopUp";

/* 내 그룹 */
export type MyGroup = {
  groupId: number;
  groupName: string;
  groupLogoImg: string;
  about: string;
  createdAt: string;
};

export type GroupInviteMsgApiRes = {
  content: GroupInviteMsg[];
  page: PaginationData;
};

export default async function MyGroupListPage() {
  const MyGroupRes = await fetchFromAPI("/groups/my");
  const GroupInviteMsgRes = (await fetchFromAPI(
    `/groups/invitation?page=0`
  )) as GroupInviteMsgApiRes;
  const popUpdata = GroupInviteMsgRes.content;

  return (
    <>
      <SubHeaderMain
        items={[
          { label: "내 그룹", href: "/groups" },
          { label: "모집 게시판", href: "/groups/recruits" },
        ]}
      />

      <div className="h-20"></div>

      {/* 팝업 메세지 */}
      <RowScrollContainer>
        <CheckPopupGroupInvite
          data={popUpdata}
          checkAction={acceptGroupInvite}
          xAction={rejectGroupInvite}
        />
      </RowScrollContainer>

      <div className="h-25"></div>

      {/* 그룹 카드 */}
      <RowScrollContainer>
        <GroupCards data={MyGroupRes} />
      </RowScrollContainer>
    </>
  );
}
