import WithdrawPopUp from "./_components/withdrawPopUp";
import { withdrawTeam } from "../../_components/actions";

export default async function WitdrawFromTeamPage({
  params,
}: {
  params: Promise<{ teamId: number }>;
}) {
  const { teamId } = await params;

  return <WithdrawPopUp teamId={teamId} withdarwAction={withdrawTeam} />;
}
