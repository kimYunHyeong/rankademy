import CreateGroupFormSection from "./_components/formSection";
import { createGroup } from "./actions";

export default function GroupCreatePage() {
  return <CreateGroupFormSection submitAction={createGroup} />;
}
