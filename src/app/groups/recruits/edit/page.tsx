import { fetchFromAPI } from "@/utils/fetcher";
import RecruitmentEditFrom from "./_components/formSection";
import { putGroupRecruitmentAction } from "./_components/actions";
import { RecruitDetail } from "../[groupId]/page";

export type GroupSummaryList = {
  groupId: number;
  groupName: string;
};

const mockMyGroupList: GroupSummaryList[] = [
  { groupId: 1, groupName: "서울과기대 컴퓨터공학과" },
  { groupId: 2, groupName: "서울대 컴퓨터공학과" },
  { groupId: 3, groupName: "고려대 컴퓨터공학과" },
  { groupId: 4, groupName: "연세대 컴퓨터공학과" },
];

export default async function RecruitmentEditPage({
  searchParams,
}: {
  searchParams: Promise<{ groupId: number }>;
}) {
  const myGroupsList = (await fetchFromAPI(
    `/groups/my/summary`
  )) as GroupSummaryList[];

  const sp = await searchParams;
  const groupId = sp.groupId;

  let data: RecruitDetail | undefined = undefined;

  if (groupId) {
    data = (await fetchFromAPI(`/groups/${groupId}/post`)) as RecruitDetail;
  } else {
    data = undefined;
  }

  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-3">
        <span>모집글 작성</span>
      </div>

      <RecruitmentEditFrom
        submitAction={putGroupRecruitmentAction}
        groupList={myGroupsList}
        selectedGroupData={data}
      />
    </>
  );
}
