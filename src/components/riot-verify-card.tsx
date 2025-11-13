"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function RiotVerifyCard({
  verifyAction,
}: {
  verifyAction: (formData: FormData) => Promise<{ ok: true; error: null }>;
}) {
  const router = useRouter();

  const [summonerName, setSummonerName] = useState("");
  const [summonerTag, setSummonerTag] = useState("");
  const [reqLoading, setReqLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);

  const canRequest =
    summonerName.trim().length > 0 && summonerTag.trim().length > 0;

  const handleRequest = useCallback(
    async (formData: FormData) => {
      if (!canRequest || reqLoading) return;
      try {
        setError(null);
        setHint(null);
        setReqLoading(true);
        await verifyAction(formData);
        setHint("인증되었습니다.");

        router.push("/me");
      } catch (e: any) {
        if (e.status === 404) {
          setError(e?.message ?? "인증에 실패했습니다.");
        }
        setError(e?.message ?? "인증에 실패했습니다.");
      } finally {
        setReqLoading(false);
      }
    },
    [canRequest, reqLoading, verifyAction]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await handleRequest(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[550px] rounded bg-[#25242A] p-6 md:p-8 text-white"
    >
      {/* 소환사 이름 + 태그 */}
      <div className="grid grid-cols-[1fr_auto] gap-3">
        <input
          name="summonerName"
          value={summonerName}
          onChange={(e) => setSummonerName(e.target.value)}
          placeholder="소환사 이름을 입력해주세요"
          className="h-11 rounded bg-[#323036] border border-[#323036] px-3 text-sm placeholder:text-[#B1ACC1] focus:outline-none focus:ring-2 focus:ring-[#FF567980]"
        />

        <div className="grid grid-cols-[auto_1fr] items-center gap-2">
          <span className="text-[#B1ACC1]">#</span>
          <input
            name="summonerTag"
            value={summonerTag}
            onChange={(e) => setSummonerTag(e.target.value)}
            placeholder="소환사 태그를 입력해주세요"
            className="h-11 rounded bg-[#323036] border border-[#323036] px-3 text-sm placeholder:text-[#B1ACC1] focus:outline-none focus:ring-2 focus:ring-[#FF567980]"
          />
        </div>
      </div>

      {/* 액션 */}
      <div className="flex flex-col items-center mt-6 space-y-2">
        <button
          type="submit"
          disabled={!canRequest || reqLoading}
          className="h-11 min-w-[110px] rounded bg-[#FF567933] text-sm disabled:opacity-50 hover:bg-[#FF5679] transition-colors duration-300 ease-in-out"
        >
          {reqLoading ? "전송 중..." : "인증 요청"}
        </button>

        {/* 메시지 표시 */}
        {hint && <p className="text-xs text-[#B1ACC1]">{hint}</p>}
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    </form>
  );
}
