import { fetchFromAPI } from "@/utils/fetcher";
import CreateScrimTeamFrom from "./_components/createScrimTeamForm";
import { GroupSummaryList } from "@/app/groups/recruits/edit/page";
import { createScrimTeam } from "./_components/actions";
import { cookies } from "next/headers";

export default async function createScrimTeamPage() {
  const myGroupsList = (await fetchFromAPI(`/groups/my/summary`))
    .data as GroupSummaryList[];

  const cookieStore = cookies();
  const userId = (await cookieStore).get("userId")?.value;

  return (
    <div className="flex flex-col justify-center items-center">
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-3">
        <span>스크림 팀 생성</span>
      </div>
      <div className="h-6"></div>
      <CreateScrimTeamFrom
        userId={Number(userId)}
        submitAction={createScrimTeam}
      />
    </div>
  );
}
