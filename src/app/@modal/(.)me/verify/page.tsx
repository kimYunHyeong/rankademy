import Modal from "@/components/modal";
import VerifyCard from "@/components/verify-card";
import { mockMyProfile } from "@/mock/myProfile";
import { sendEmail, verifyCode } from "@/app/me/verify/verify-action";

export default function ModalVerifyUnivPage() {
  const data = mockMyProfile;
  return (
    <Modal>
      <VerifyCard sendEmailAction={sendEmail} verifyCodeAction={verifyCode} />
    </Modal>
  );
}
