"use client";

import { useEffect, useState } from "react";

export default function useAuthStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // 브라우저 환경에서만 실행
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("accessToken");
    setAccessToken(token);
    setIsAuthenticated(!!token);

    // 다른 탭에서 로그인/로그아웃 동기화
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "accessToken") {
        setAccessToken(e.newValue);
        setIsAuthenticated(!!e.newValue);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return { isAuthenticated, accessToken };
}
