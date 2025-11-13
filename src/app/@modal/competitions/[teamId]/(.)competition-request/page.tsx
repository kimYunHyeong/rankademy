import { sendCompetitionReq } from "@/app/competitions/_components/actions";
import CompetitionRequestSection from "@/app/competitions/[teamId]/competition-request/_components/competitionRequstSection";
import Modal from "@/components/modal";

export default async function ModalCompetitionRequestPage({
  params,
}: {
  params: Promise<{ teamId: number }>;
}) {
  const { teamId } = await params;

  return (
    <Modal>
      <CompetitionRequestSection
        otherTeamId={teamId}
        submitAction={sendCompetitionReq}
      />
    </Modal>
  );
}
