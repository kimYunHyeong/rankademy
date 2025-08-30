export default function SelectButton() {
  return (
    <div
      className="
     text-white  rounded-md shadow-md"
    >
      <div className="flex justify-center">
        <div>학교랭킹</div>
        <div>유저랭킹</div>
      </div>

      <div className="h-2"></div>

      <div className="flex justify-between">
        <div>대항전 승리순</div>
        <div>학교 이름</div>
      </div>
    </div>
  );
}
