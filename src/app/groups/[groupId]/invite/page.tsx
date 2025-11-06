import InviteMember from "@/components/invite-member";
import { sendGroupInvitation } from "./actions";
export default async function InviteGropMemberPage({
  params,
}: {
  params: Promise<{ groupId: number }>;
}) {
  const { groupId } = await params;

  return (
    <div className="flex justify-center">
      <InviteMember
        groupId={groupId}
        groupInvitationAction={sendGroupInvitation}
      />
    </div>
  );
}
