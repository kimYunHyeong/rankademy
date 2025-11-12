import Modal from "@/components/modal";
import DeleteMePopUp from "@/app/me/delete/_components/deleteMePopUp";
import { deleteMe } from "@/app/me/delete/_components/actions";

export default function DeleteaMyProfile() {
  return (
    <>
      <Modal>
        <DeleteMePopUp deleteAction={deleteMe} />
      </Modal>
    </>
  );
}
