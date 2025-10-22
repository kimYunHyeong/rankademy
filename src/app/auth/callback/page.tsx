// app/oauth/callback/page.tsx (예시)
"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function isLikelyJwt(token?: string | null) {
  if (!token) return false;
  // 대충 3부분(.) 형태만 체크 (서명 검증 X)
  return token.split(".").length === 3;
}

export default function OAuthCallbackPage() {
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

    // 1) URL 민감 파라미터 제거(최대한 빨리)
    try {
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, document.title, url.toString());
    } catch {}

    // 2) 토큰이 들어왔다면 로컬스토리지 저장 (순수 토큰만!)
    if (isLikelyJwt(accessToken)) {
      try {
        window.localStorage.setItem("accessToken", accessToken!);
      } catch {}
    }
    if (isLikelyJwt(refreshToken)) {
      try {
        window.localStorage.setItem("refreshToken", refreshToken!);
      } catch {}
    }

    // 3) 최소 검증: accessToken 존재 여부(없으면 로그인 페이지로 회송)
    const tokenInStore =
      (typeof window !== "undefined" &&
        window.localStorage.getItem("accessToken")) ||
      null;
    if (!tokenInStore) {
      router.replace("/login?error=missing_token");
      return;
    }

    // 4) 완료: 안전한 내부 경로로 이동
    router.replace(safeNext);
  }, [router, sp]);

  return <p style={{ padding: 16 }}>로그인 처리 중입니다…</p>;
}
