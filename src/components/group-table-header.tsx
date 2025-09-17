type Props = {
  memberCnt: number;
  // 필요하면 다른 값들도 여기에 추가
};

export default function GroupTableHeader({ memberCnt }: Props) {
  return (
    <>
      <div className="flex justify-between items-center p-5 bg-[#24192F] text-white rounded h-14">
        <div className="flex items-center">
          <span className="text-[12px] text-[#B1ACC1]">그룹원</span>
          <div className="text-[16px] ml-3">
            {" "}
            <span>{memberCnt}</span>
            <span className="text-[#B1ACC1]">/50</span>
          </div>
        </div>
        <div className="text-white border-[1px] border-[#FF567980] rounded p-2">
          가입 요청하기
        </div>
      </div>
    </>
  );
}
