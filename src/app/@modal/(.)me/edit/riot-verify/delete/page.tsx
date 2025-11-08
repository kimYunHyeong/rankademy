import { DeleteRiotVerify } from "@/app/me/edit/riot-verify/actions";
import DeleteRiotVerifyPopUp from "@/app/me/edit/riot-verify/delete/_components/delete-popup";
import Modal from "@/components/modal";

export default function ModalDeleteRiotVerifyPage() {
  return (
    <Modal>
      <DeleteRiotVerifyPopUp deleteAction={DeleteRiotVerify} />
    </Modal>
  );
}
