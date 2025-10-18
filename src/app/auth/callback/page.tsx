"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const sp = useSearchParams();

  useEffect(() => {
    const accessToken = sp.get("accessToken");
    const refreshToken = sp.get("refreshToken");
    const next = sp.get("next") || "/";

    (async () => {
      if (!accessToken || !refreshToken) {
        router.replace("/login?error=missing_token");
        return;
      }

      // 서버에 토큰 교환(서버가 HttpOnly 쿠키로 저장)
      const res = await fetch("/api/auth/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ accessToken, refreshToken }),
      });

      // URL의 민감 파라미터 제거
      const url = new URL(window.location.href);
      url.search = "";
      window.history.replaceState({}, document.title, url.toString());

      if (!res.ok) {
        router.replace("/login?error=exchange_failed");
        return;
      }

      // 원하는 위치로 이동
      router.replace(next);
    })();
  }, [router, sp]);

  return <p style={{ padding: 16 }}>로그인 처리 중입니다…</p>;
}
