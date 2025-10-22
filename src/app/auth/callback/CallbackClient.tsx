// app/auth/callback/CallbackClient.tsx
"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CallbackClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    const accessToken = sp.get("accessToken");
    const refreshToken = sp.get("refreshToken");
    const nextParam = sp.get("next") || "/";
    const safeNext =
      typeof nextParam === "string" && nextParam.startsWith("/")
        ? nextParam
        : "/";

    if (!accessToken || !refreshToken) {
      router.replace("/login?error=missing_token");
      return;
    }

    try {
      // Bearer 접두어 사용 여부는 프로젝트 규칙에 맞추세요
      localStorage.setItem("accessToken", `Bearer ${accessToken}`);
      localStorage.setItem("refreshToken", `Bearer ${refreshToken}`);
    } catch {
      // 저장 실패해도 흐름 진행
    }

    // URL 민감 파라미터 제거
    try {
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, document.title, url.toString());
    } catch {}

    router.replace(safeNext);
  }, [router, sp]);

  return <div className="p-6 text-white">로그인 처리 중…</div>;
}
