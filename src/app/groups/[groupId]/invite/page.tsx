import InviteMember from "@/components/invite-member";
import { sendGroupInvitation } from "./actions";
export default async function InviteGropMemberPage({
  params,
  searchParams,
}: {
  params: Promise<{ groupId: number }>;
  searchParams: Promise<{ univName: string }>;
}) {
  const { groupId } = await params;
  const sp = await searchParams;
  const univName = sp.univName;

  return (
    <div className="flex justify-center">
      <InviteMember
        groupId={groupId}
        groupInvitationAction={sendGroupInvitation}
        univName={univName}
      />
    </div>
  );
}
