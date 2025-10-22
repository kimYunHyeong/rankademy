// app/oauth/callback/page.tsx
"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function isLikelyJwt(token?: string | null) {
  if (!token) return false;
  return token.split(".").length === 3;
}

/** 쿠키 설정 함수 */
function setCookie(name: string, value: string, days = 7) {
  try {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = `${name}=${value}; Expires=${expires.toUTCString()}; Path=/; SameSite=Lax; Secure`;
  } catch (e) {
    console.warn("⚠️ 쿠키 저장 실패:", e);
  }
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

    // ✅ 1) URL 민감 파라미터 제거
    try {
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, document.title, url.toString());
    } catch {}

    // ✅ 2) 토큰 저장 (로컬스토리지 + 쿠키)
    if (isLikelyJwt(accessToken)) {
      try {
        window.localStorage.setItem("accessToken", accessToken!);
        setCookie("accessToken", accessToken!, 7); // 쿠키에도 저장
      } catch {}
    }
    if (isLikelyJwt(refreshToken)) {
      try {
        window.localStorage.setItem("refreshToken", refreshToken!);
        setCookie("refreshToken", refreshToken!, 14); // 쿠키에도 저장
      } catch {}
    }

    // ✅ 3) 최소 검증: accessToken 존재 여부
    const tokenInStore =
      (typeof window !== "undefined" &&
        window.localStorage.getItem("accessToken")) ||
      null;
    if (!tokenInStore) {
      router.replace("/login?error=missing_token");
      return;
    }

    // ✅ 4) 완료: 안전한 내부 경로로 이동
    router.replace(safeNext);
  }, [router, sp]);

  return <p style={{ padding: 16 }}>로그인 처리 중입니다…</p>;
}
