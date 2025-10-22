"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function GroupTableHeader({
  memberCnt,
  groupId,
  isJoined,
  isLeader,
}: {
  memberCnt: number;
  groupId: number;
  isJoined: boolean;
  isLeader: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isEditPage = pathname === `/groups/${groupId}/edit`;

  const handleClick = () => {
    if (isEditPage) {
      // ✅ 종료하기 → 그룹 상세 페이지로 이동
      router.push(`/groups/${groupId}`);
    } else {
      // ✅ 가입 요청하기 → 콘솔 로그 출력
      console.log("가입신청이 완료됐습니다.");
    }
  };

  return (
    <div className="flex justify-between items-center p-5 bg-[#24192F] text-white rounded h-14">
      <div className="flex items-center">
        <span className="text-[12px] text-[#B1ACC1]">그룹원</span>
        <div className="text-[16px] ml-3">
          <span>{memberCnt}</span>
          <span className="text-[#B1ACC1]">${memberCnt}</span>
        </div>
      </div>

      {isEditPage && isLeader ? (
        <div
          onClick={handleClick}
          className="text-white border-[1px] border-[#FF567980] rounded p-2 cursor-pointer hover:bg-[#FF567920] transition-colors"
        >
          <button onClick={() => router.back()}>닫기</button>
        </div>
      ) : !isJoined ? (
        <div
          onClick={handleClick}
          className="text-white border-[1px] border-[#FF567980] rounded p-2 cursor-pointer hover:bg-[#FF567920] transition-colors"
        >
          <Link href={`${groupId}/request`}>가입 요청하기</Link>
        </div>
      ) : null}
    </div>
  );
}
