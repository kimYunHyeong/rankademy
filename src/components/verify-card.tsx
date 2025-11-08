"use client";

import { redirect } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

type VerifyCardProps = {
  /** 인증 메일 전송 콜백 */
  sendEmailAction: (
    univName: string,
    email: string
  ) => Promise<{ ok: true; error: null }>;
  /** 인증번호 확인 콜백 */
  verifyCodeAction: (
    email: string,
    code: number | string
  ) => Promise<{ ok: true; error: null }>;
  /** 초기 이메일 */
  initialEmail?: string;
  /** 허용 도메인(기본: ac.kr) — 필요시 확장 */
  allowedDomains?: string[]; // 예: ["ac.kr", "edu"]
};

export default function VerifyCard({
  sendEmailAction,
  verifyCodeAction,
  initialEmail = "",
  allowedDomains = ["ac.kr"],
}: VerifyCardProps) {
  const [univName, setUnivName] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [code, setCode] = useState("");
  const [reqLoading, setReqLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);

  const isEmailValid = useMemo(() => {
    if (!email) return false;
    // 간단 검증: 형식 + 허용 도메인 포함 여부
    const basic = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const domainOk = allowedDomains.some((d) => email.endsWith(`.${d}`));
    return basic && domainOk;
  }, [email, allowedDomains]);

  const canRequest = isEmailValid && !reqLoading;
  const canVerify = isEmailValid && code.trim().length > 0 && !verifyLoading;

  const handleRequest = useCallback(async () => {
    if (!canRequest) return;
    try {
      setError(null);
      setHint(null);
      setReqLoading(true);
      await sendEmailAction(univName, email);
      setHint("인증번호를 전송했어요. 메일함을 확인해 주세요.");
    } catch (e: any) {
      setError(e?.message ?? "인증 메일 전송에 실패했어요.");
    } finally {
      setReqLoading(false);
    }
  }, [canRequest, email, sendEmailAction]);

  const handleVerify = useCallback(async () => {
    if (!canVerify) return;
    try {
      setError(null);
      setHint(null);
      setVerifyLoading(true);
      await verifyCodeAction(email, code.trim());
      setHint("인증이 완료되었습니다");
      redirect("/me");
    } catch (e: any) {
      setError(e?.message ?? "인증번호가 올바르지 않아요.");
    } finally {
      setVerifyLoading(false);
    }
  }, [canVerify, email, code, verifyCodeAction]);

  const onEnterCode = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleVerify();
    }
  };

  return (
    <div className="w-[550px] h-90 rounded bg-[#25242A] p-6 md:p-8 text-white">
      {/* 학교 이름 */}
      <label className="block text-sm mb-2 mt-4">학교 이름</label>
      <div className="grid grid-cols-[1fr_auto] gap-3">
        <input
          value={univName}
          onChange={(e) => setUnivName(e.target.value)}
          placeholder="서울과학기술대학교"
          className="w-full h-11 rounded bg-[#323036] border border-[#323036] px-3 text-sm placeholder:text-[#B1ACC1] focus:outline-none focus:ring-2 focus:ring-[#FF567980]"
        />
      </div>

      {/* 이메일 */}
      <label className="block text-sm mb-2 mt-4">학교 이메일</label>
      <div className="grid grid-cols-[1fr_auto] gap-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@seoultech.ac.kr"
          className="h-11 rounded bg-[#323036] border border-[#323036] px-3 text-sm placeholder:text-[#B1ACC1] focus:outline-none focus:ring-2 focus:ring-[#FF567980]"
        />
        <button
          type="button"
          onClick={handleRequest}
          disabled={!canRequest}
          className="h-11 min-w-[110px] rounded bg-[#FF567933] text-sm disabled:opacity-50 hover:opacity-90 transition"
        >
          {reqLoading ? "전송 중..." : "인증 요청"}
        </button>
      </div>

      {/* 인증번호 */}
      <label className="block text-sm mt-6 mb-2">인증번호</label>
      <div className="grid grid-cols-[1fr_auto] gap-3">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={onEnterCode}
          placeholder="인증번호를 입력하세요"
          className="h-11 rounded bg-[#323036] border border-[#323036] px-3 text-sm placeholder:text-[#B1ACC1] focus:outline-none focus:ring-2 focus:ring-[#FF567980]"
        />
        <button
          type="button"
          onClick={handleVerify}
          disabled={!canVerify}
          className="h-11 min-w-[110px] rounded bg-[#FF567933] text-sm disabled:opacity-50 hover:opacity-90 transition"
        >
          {verifyLoading ? "확인 중..." : "확인"}
        </button>
      </div>

      {/* 메시지 */}
      <div className="min-h-[22px] mt-4">
        {error && <p className="text-xs text-red-400">{error}</p>}
        {!error && hint && <p className="text-xs text-[#B1ACC1]">{hint}</p>}
        {!error && !hint && !isEmailValid && email && (
          <p className="text-xs text-[#FFB6C1]">
            * {allowedDomains.join(", ")} 도메인의 학교 이메일만 사용할 수
            있어요.
          </p>
        )}
      </div>
    </div>
  );
}
