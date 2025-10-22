// app/@modal/(.)me/verify/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// 필요 시 정적 프리렌더 비활성화
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function VerifyModalPage() {
  const router = useRouter();
  const sp = useSearchParams();

  useEffect(() => {
    // ✅ 클라이언트에서만 실행
    const token = sp.get("token");
    if (!token) {
      router.replace("/login?error=missing_token");
      return;
    }

    // 여기서만 document/window/localStorage 사용
    document.title = "인증 중…";

    // 예: 토큰 검증 호출
    (async () => {
      try {
        const res = await fetch(
          `/api/verify?token=${encodeURIComponent(token)}`,
          {
            method: "POST",
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("verify_failed");
        router.replace("/me?verified=1");
      } catch (e) {
        router.replace("/login?error=verify_failed");
      }
    })();
  }, [router, sp]);

  return <div className="p-6 text-white">인증 처리 중입니다…</div>;
}
