import IDcard from "@/components/id-card";
import Modal from "@/components/modal";
import { userInfoData } from "@/mock/userInfoData";

export default function Page(props: any) {
  const data = userInfoData;
  return (
    <Modal>
      <IDcard data={userInfoData} />
    </Modal>
  );
}
