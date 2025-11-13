import { fetchFromAPI } from "@/utils/fetcher";
import CompetitionResultForm from "./_components/CompetitionResultForm";
import { CompetitionDetailAPIres, TeamDetail } from "../page";
import { mockCompetitionDetail } from "@/mock/competitionDeatil";
import {
  requestOCRResult,
  registerCompetitionResult,
} from "./_components/actions";
import { uploadImage } from "@/app/groups/create/actions";

export default async function SubmitCompetitonResultPage({
  params,
}: {
  params: Promise<{ competitionId: number }>;
}) {
  const { competitionId } = await params;

  const res = (await fetchFromAPI(`/competitions/${competitionId}`))
    .data as CompetitionDetailAPIres;

  const competitionInfo = res;

  /* 팀의 정보 */
  const teamA = competitionInfo.team1;
  const teamB = competitionInfo.team2;

  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-3">
        <span>결과 등록</span>
      </div>
      <div className="h-5" />

      <CompetitionResultForm
        teamA={teamA}
        teamB={teamB}
        competitionId={competitionId}
        requestOcr={requestOCRResult}
        imgUrlAction={uploadImage}
        registerResult={registerCompetitionResult}
      />
    </>
  );
}
