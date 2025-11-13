import { sendCompetitionReq } from "../../_components/actions";
import CompetitionRequestSection from "./_components/competitionRequstSection";

export default async function CompetitionRequestPage({
  params,
}: {
  params: Promise<{ teamId: number }>;
}) {
  const { teamId } = await params;

  return (
    <CompetitionRequestSection
      otherTeamId={teamId}
      submitAction={sendCompetitionReq}
    />
  );
}
