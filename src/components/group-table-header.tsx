"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { usePathname, useRouter } from "next/navigation";

type JoinState = { ok: boolean; error: string | null };

type Props = {
  groupId: number;
  memberCnt: number;
  capacity: number;
  isJoined: boolean;
  isLeader: boolean;
  joinAction?: (prev: JoinState, formData: FormData) => Promise<JoinState>;
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

  // useActionState로 교체
  const [state, formAction] = useActionState<JoinState, FormData>(
    joinAction ?? (async () => ({ ok: false, error: "액션 미정의" })),
    { ok: false, error: null }
  );

  useEffect(() => {
    if (state?.ok) {
      router.push(`/groups/${groupId}/request`); // 모달 URL로 이동
    }
  }, [state?.ok, groupId, router]);

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
        <form action={formAction}>
          <input type="hidden" name="groupId" value={groupId} />
          <JoinSubmit />
          {!state.ok && state.error ? (
            <p className="mt-2 text-xs text-red-400">{state.error}</p>
          ) : null}
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
