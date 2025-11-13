import SubHeaderMain from "@/components/sub-header-main";
import GroupCards from "@/components/group-cards";
import RowScrollContainer from "@/components/row-scroll-container";
import { acceptGroupInvite, rejectGroupInvite } from "./actions";
import CheckPopupGroupInvite from "@/components/check-popup-group-invite";
import { fetchFromAPI } from "@/utils/fetcher";
import { GroupInviteMsg, PaginationData } from "@/types";

/* 내 그룹 */
export type MyGroup = {
  groupId: number;
  groupName: string;
  groupLogoImg: string;
  about: string;
  createdAt: string;
};

/* 그룹 초대 메세지 */
type GroupInviteMsgApiRes = {
  content: GroupInviteMsg[];
  page: PaginationData;
};

export default async function MyGroupListPage() {
  const myGroupList: MyGroup[] = (await fetchFromAPI(`/groups/my`)).data;
  const GroupInviteMsg: GroupInviteMsg[] = (
    await fetchFromAPI(`/groups/invitation?page=0`)
  ).data.content;

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
          data={GroupInviteMsg}
          checkAction={acceptGroupInvite}
          xAction={rejectGroupInvite}
        />
      </RowScrollContainer>

      <div className="h-25"></div>

      {/* 그룹 카드 */}
      <RowScrollContainer>
        <GroupCards data={myGroupList} />
      </RowScrollContainer>
    </>
  );
}
