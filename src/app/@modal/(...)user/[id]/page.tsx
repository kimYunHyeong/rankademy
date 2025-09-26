import BookPage from "@/app/user/[id]/page";
import Modal from "@/components/modal";

/* 인자들을 그대로 사용하기 위해 props: any를 사용한 후 {...props}를 통해 넘김 */
export default function Page(props: any) {
  return (
    <Modal>
      <BookPage {...props} />
    </Modal>
  );
}
