import MyCompetitionResultSection from "./_components/competition-result-section";
import { fetchFromAPI } from "@/utils/fetcher";
import { CompetitionStatus, PaginationData, TeamMember } from "@/types";

import { mockGroupCompetitionResult } from "@/mock/groupCompetitionResult";

type MyCompetitionResult = {
  competitionId: 1;
  otherTeamUnivName: string;
  status: CompetitionStatus;
  myTeam: {
    teamId: number;
    teamName: string;
    groupName: string;
    teamMembers: TeamMember[];
  };
  otherTeam: {
    teamId: number;
    teamName: string;
    groupName: string;
    teamMembers: TeamMember[];
  };
  submittedAt: string;
  isWin: boolean;
  setResults: [
    {
      setNumber: number;
      winnerTeamId: number;
    }
  ];
};

type APIres = {
  content: MyCompetitionResult[];
  page: PaginationData;
};

export default async function MyCompetitionPage() {
  const RequieredQuery = `?page=0`;
  const apiUrl = `/competitions/my${RequieredQuery}`;
  const res = (await fetchFromAPI(apiUrl)) as APIres;

  const data = mockGroupCompetitionResult;

  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-2">
        <span>내 대항전</span>
      </div>
      <div className="h-10"></div>
      <MyCompetitionResultSection
        tableData={data}
        pageData={res.page}
        apiurl={apiUrl}
      />
    </>
  );
}
