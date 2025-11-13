import Modal from "@/components/modal";
import PopupMessage from "@/components/popup-message";

export default function ModalCompetitionRequestOkPage() {
  return (
    <Modal>
      <PopupMessage
        img={"round-check"}
        text={"상대팀에게 요청이 전송됐습니다."}
      />
    </Modal>
  );
}
