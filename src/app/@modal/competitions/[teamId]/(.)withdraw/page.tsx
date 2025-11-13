import WithdrawPopUp from "@/app/competitions/[teamId]/withdraw/_components/withdrawPopUp";
import { withdrawTeam } from "@/app/competitions/_components/actions";
import Modal from "@/components/modal";

export default async function WitdrawFromTeamPage({
  params,
}: {
  params: Promise<{ teamId: number }>;
}) {
  const { teamId } = await params;

  return (
    <Modal>
      <WithdrawPopUp teamId={teamId} withdarwAction={withdrawTeam} />
    </Modal>
  );
}
