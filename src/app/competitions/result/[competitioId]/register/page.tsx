import { fetchFromAPI } from "@/utils/fetcher";
import CompetitionResultForm from "./_components/CompetitionResultForm";
import { CompetitionDetailAPIres } from "../page";
import { mockCompetitionDetail } from "@/mock/competitionDeatil";
import {
  requestOCRResult,
  registerCompetitionResult,
} from "./_components/actions";

export default async function SubmitCompetitonResultPage({
  params,
}: {
  params: Promise<{ competitionId: number }>;
}) {
  const { competitionId } = await params;

  /* const res = (await fetchFromAPI(
    `/competitions/${competitionId}`
  )) as CompetitionDetailAPIres; */

  const competitionInfo = mockCompetitionDetail;

  /* A팀의 정보 */
  const teamA = competitionInfo.team1.groupName;

  const teamAMembers = competitionInfo.team1.teamMembers
    .slice(0, 5)
    .map((m) => m.summonerName);

  /* B팀의 정보 */
  const teamB = competitionInfo.team2.groupName;
  const teamBMembers = competitionInfo.team2.teamMembers
    .slice(0, 5)
    .map((m) => m.summonerName);

  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-3">
        <span>결과 등록</span>
      </div>
      <div className="h-5" />

      <CompetitionResultForm
        teamA={teamA}
        teamAMembers={teamAMembers}
        teamB={teamB}
        teamBMembers={teamBMembers}
        competitionId={competitionId}
        requestOcr={requestOCRResult}
        registerResult={registerCompetitionResult}
      />
    </>
  );
}
