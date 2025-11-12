import SubHeaderMain from "@/components/sub-header-main";
import GroupCards from "@/components/group-cards";
import RowScrollContainer from "@/components/row-scroll-container";
import {
  acceptGroupInvite,
  rejectGroupInvite,
  showMyGroupList,
} from "./actions";
import CheckPopupGroupInvite from "@/components/check-popup-group-invite";

export default async function MyGroupListPage() {
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
          checkAction={acceptGroupInvite}
          xAction={rejectGroupInvite}
        />
      </RowScrollContainer>

      <div className="h-25"></div>

      {/* 그룹 카드 */}
      <RowScrollContainer>
        <GroupCards showGroupList={showMyGroupList} />
      </RowScrollContainer>
    </>
  );
}
