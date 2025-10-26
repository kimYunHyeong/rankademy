// app/auth/callback/page.tsx
"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CallbackPage() {
  return (
    <Suspense fallback={<div className="p-6 text-white">로그인 처리 중…</div>}>
      <CallbackInner />
    </Suspense>
  );
}

function CallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ran = useRef(false); // 중복 실행 방지

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    // 1️⃣ 쿼리에서 토큰 추출
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const nextParam = searchParams.get("next") || "/";

    // 2️⃣ nextParam은 내부 경로만 허용 (보안)
    const safeNext =
      typeof nextParam === "string" && nextParam.startsWith("/")
        ? nextParam
        : "/";

    // 3️⃣ localStorage 저장
    try {
      if (accessToken) localStorage.setItem("accessToken", accessToken);
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    } catch (e) {
      console.error("Failed to persist tokens:", e);
    }

    // 4️⃣ URL에서 민감 쿼리 제거
    try {
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, document.title, url.toString());
    } catch {}

    // 5️⃣ 홈(또는 nextParam)으로 이동
    router.replace(safeNext);
  }, [router, searchParams]);

  return <div className="p-6 text-white">로그인 처리 중…</div>;
}
