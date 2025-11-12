import Modal from "@/components/modal";
import VerifyCard from "@/components/verify-card";
import { sendEmail, verifyCode } from "@/app/me/edit/univ-verify/action";

export default function ModalVerifyUnivPage() {
  return (
    <Modal>
      <VerifyCard sendEmailAction={sendEmail} verifyCodeAction={verifyCode} />
    </Modal>
  );
}
