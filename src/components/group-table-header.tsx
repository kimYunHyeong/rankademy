"use client";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  groupId: number;
  memberCnt: number;
  capacity: number;
  isJoined: boolean;
  isLeader: boolean;
  groupJoinAction: (groupId: number) => Promise<void>;
};

export default function GroupTableHeader({
  groupId,
  memberCnt,
  capacity,
  isJoined,
  isLeader,
  groupJoinAction,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const isEditPage = pathname === `/groups/${groupId}/edit`;

  return (
    <div className="flex justify-between items-center p-5 bg-[#24192F] text-white rounded h-14">
      <div className="flex items-center">
        <span className="text-[12px] text-[#B1ACC1]">그룹원</span>
        <div className="text-[16px] ml-3">
          <span>{memberCnt}</span>
          <span className="text-[#B1ACC1]">/{capacity}</span>
        </div>
      </div>

      {isEditPage && isLeader ? (
        <button
          className="text-white border border-[#FF567980] rounded p-2 cursor-pointer hover:bg-[#FF567920] transition-colors"
          onClick={() => router.back()}
        >
          종료하기
        </button>
      ) : null}

      {!isEditPage && !isLeader && !isJoined ? (
        <button
          className="text-white border border-[#FF567980] rounded p-2 cursor-pointer hover:bg-[#FF567920] transition-colors"
          onClick={() => {
            groupJoinAction(groupId);
            router.push(`/groups/${groupId}/request`);
          }}
        >
          가입 요청하기
        </button>
      ) : null}
    </div>
  );
}
