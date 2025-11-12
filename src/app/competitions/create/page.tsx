import { fetchFromAPI } from "@/utils/fetcher";
import CreateTeamFrom from "./_components/createTeamForm";
import { GroupSummaryList } from "@/app/groups/recruits/edit/page";
import { createTeam } from "./_components/actions";
import { cookies } from "next/headers";

export default async function CreateTeamPage() {
  const myGroupsList = (await fetchFromAPI(`/groups/my/summary`))
    .data as GroupSummaryList[];

  const cookieStore = cookies();
  const userId = (await cookieStore).get("userId")?.value;

  return (
    <div className="flex flex-col justify-center items-center">
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-3">
        <span>대항전 팀 생성</span>
      </div>
      <div className="h-6"></div>
      <CreateTeamFrom
        userId={Number(userId)}
        groupList={myGroupsList}
        submitAction={createTeam}
      />
    </div>
  );
}
