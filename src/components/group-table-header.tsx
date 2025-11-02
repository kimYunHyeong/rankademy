// components/GroupTableHeader.tsx (Client Component)
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

type Props = {
  groupId: number;
  memberCnt: number;
  capacity: number;
  isJoined: boolean;
  isLeader: boolean;
  // ✅ 서버 액션을 prop으로 주입받음
  joinAction?: (formData: FormData) => Promise<void>;
};

export default function GroupTableHeader({
  groupId,
  memberCnt,
  capacity,
  isJoined,
  isLeader,
  joinAction,
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
      ) : !isJoined && joinAction ? (
        <form action={joinAction}>
          <input type="hidden" name="groupId" value={groupId} />
          <JoinSubmit />
        </form>
      ) : null}
    </div>
  );
}

function JoinSubmit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="text-white border border-[#FF567980] rounded p-2 cursor-pointer hover:bg-[#FF567920] transition-colors disabled:opacity-60"
    >
      {pending ? "요청 중..." : "가입 요청하기"}
    </button>
  );
}
