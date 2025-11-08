import DeleteTeamPopUp from "@/app/competitions/[teamId]/delete/_components/withdrawPopUp";
import { deleteTeam } from "@/app/competitions/_components/actions";
import Modal from "@/components/modal";

export default async function ModalDeleteTeamPage({
  params,
}: {
  params: Promise<{ teamId: number }>;
}) {
  const { teamId } = await params;
  return (
    <>
      <Modal>
        <DeleteTeamPopUp teamId={teamId} deleteAction={deleteTeam} />;
      </Modal>
    </>
  );
}
