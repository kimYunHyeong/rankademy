import CreateGroupFormSection from "./_components/formSection";
import { createGroup, uploadImage } from "./actions";

export default function GroupCreatePage() {
  return (
    <CreateGroupFormSection
      imgUrlAction={uploadImage}
      submitAction={createGroup}
    />
  );
}
