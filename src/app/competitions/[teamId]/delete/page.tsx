import { deleteTeam } from "../../_components/actions";
import DeleteTeamPopUp from "./_components/withdrawPopUp";

export default async function DeleteTeamPage({
  params,
}: {
  params: Promise<{ teamId: number }>;
}) {
  const { teamId } = await params;
  return <DeleteTeamPopUp teamId={teamId} deleteAction={deleteTeam} />;
}
