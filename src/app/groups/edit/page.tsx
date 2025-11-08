import CreateGroupFormSection from "./_components/formSection";
import { createGroup, uploadGroupLogo } from "./actions";

export default function GroupCreatePage() {
  return (
    <CreateGroupFormSection
      imgUrlAction={uploadGroupLogo}
      submitAction={createGroup}
    />
  );
}
