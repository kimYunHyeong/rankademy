import PopupMessage from "@/components/popup-message";

export default function Page() {
  return (
    <PopupMessage
      img="round-check"
      text="가입 요청이 완료되었습니다."
      subText="그룹장이 초대를 수락하면 그룹의 멤버가 됩니다."
    />
  );
}
