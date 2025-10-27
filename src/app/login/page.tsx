"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginCard from "@/components/login-card";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // 초기 로딩 상태
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        // ✅ 서버의 쿠키 기반 인증 상태 확인
        const res = await fetch("/auth/status", {
          method: "GET",
          credentials: "include", // 쿠키 포함 (중요)
          cache: "no-store",
        });

        if (!res.ok) throw new Error("인증 상태 확인 실패");
        const data = await res.json();

        if (data.isAuthenticated) {
          // 이미 로그인되어 있다면 홈으로 리다이렉트
          router.replace("/");
          return;
        }

        // 로그인 안 되어 있으면 로그인 페이지 유지
        setIsAuthenticated(false);
      } catch (err) {
        console.error("auth check error:", err);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  // 로딩 중에는 깜빡임 방지
  if (loading || isAuthenticated === true) return null;

  return (
    <div className="flex justify-center items-center h-full bg-[#0F0E12]">
      <LoginCard />
    </div>
  );
}
