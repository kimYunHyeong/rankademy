"use client";

import { useRouter } from "next/navigation";

export default function NOtJoinedSection({
  groupId,
  onSubmit,
}: {
  groupId: number;
  onSubmit: (groupId: number) => Promise<void>;
}) {
  const router = useRouter();
  return (
    <button
      className="flex items-center justify-center border border-[#323036] w-[120px] h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
      onClick={() => {
        onSubmit(groupId);
        router.push(`/groups/${groupId}/request`);
      }}
    >
      가입 요청하기
    </button>
  );
}
