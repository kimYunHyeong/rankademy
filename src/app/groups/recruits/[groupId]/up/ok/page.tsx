import PopupMessage from "@/components/popup-message";

export default async function UpGroupRecruitOkPage() {
  return (
    <PopupMessage
      img="round-check"
      text="게시글 up이 완료되었습니다."
      subText="게시글 up은 하루에 한번만 사용할 수 있습니다."
    />
  );
}
