import PopupMessage from "@/components/popup-message";
import Modal from "@/components/modal";

export default async function MockUpGroupRecruitForbiddenPage() {
  return (
    <Modal>
      <PopupMessage img="round-x" text="24시간 이내에는 사용할 수 없습니다." />
    </Modal>
  );
}
