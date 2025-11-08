import RiotVerifyCard from "@/components/riot-verify-card";
import { RiotVerify } from "@/app/me/edit/riot-verify/actions";
import Modal from "@/components/modal";

export default function ModalRiotVerifySection() {
  return (
    <Modal>
      <RiotVerifyCard verifyAction={RiotVerify} />;
    </Modal>
  );
}
