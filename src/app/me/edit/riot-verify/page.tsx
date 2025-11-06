import RiotVerifyCard from "@/components/riot-verify-card";
import { RiotVerify } from "./actions";
import Modal from "@/components/modal";

export default function RiotVerifySection() {
  return (
    <Modal>
      <RiotVerifyCard verifyAction={RiotVerify} />
    </Modal>
  );
}
