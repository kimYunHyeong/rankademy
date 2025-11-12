import { deleteMe } from "./_components/actions";
import DeleteMePopUp from "./_components/deleteMePopUp";

export default function DeleteaMyProfile() {
  return (
    <>
      <DeleteMePopUp deleteAction={deleteMe} />
    </>
  );
}
