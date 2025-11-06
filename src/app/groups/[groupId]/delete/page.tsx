import { deleteGruopMember } from "@/app/groups/[groupId]/delete/_components/actions";
import DeleteMember from "@/app/groups/[groupId]/delete/_components/delete-member";

export default async function DelteGroupMemberPage({
  params,
  searchParams,
}: {
  params: Promise<{ groupId: number }>;
  searchParams: Promise<{
    userId: number;
    summonerName: string;
    summonerTag: string;
  }>;
}) {
  const { groupId } = await params;
  const sp = await searchParams;
  const userId = sp.userId;
  const summonerName = sp.summonerName;
  const summonerTag = sp.summonerTag;

  return (
    <DeleteMember
      groupId={groupId}
      userId={userId}
      summonerName={summonerName}
      summonerTag={summonerTag}
      deleteAction={deleteGruopMember}
    />
  );
}
