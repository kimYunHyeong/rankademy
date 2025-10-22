// components/ProfileMenu.tsx (Client Component)
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfileMenu({ avatarSrc }: { avatarSrc: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);

      // 1) 먼저 로컬스토리지 토큰 제거 (가장 중요)
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("refreshToken");

        // 👉 같은 탭에서도 상태 갱신이 필요하다면 커스텀 이벤트 발행(옵션)
        window.dispatchEvent(new Event("rankademy:logout"));
      }

      // 2) (선택) 서버 쿠키도 같이 만료시키고 싶다면 호출 유지
      //    쿠키를 더 이상 쓰지 않더라도, 과거 잔여 쿠키 정리용으로 유용
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
        });
      } catch (e) {
        console.warn("Logout API failed (ignored):", e);
      }

      // 3) 라우팅: 같은 탭에서는 storage 이벤트가 안 떠서 새로고침/리다이렉트로 보장
      router.replace("/");
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div className="relative" ref={rootRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="내 프로필"
        className="focus:outline-none"
      >
        <Image
          src={avatarSrc}
          alt="프로필"
          width={40}
          height={40}
          className="object-contain rounded border border-[#323036] hover:border-[#FF5679] transition"
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-12 top-1/2 -translate-y-1/2 
                     w-[120px] z-50 rounded-lg border border-[#323036] 
                     bg-[#1D1921] shadow-lg py-2 text-sm text-gray-200"
        >
          <Link
            href="/me"
            role="menuitem"
            className="block px-4 py-2 hover:bg-[#2E223F] transition"
            onClick={() => setOpen(false)}
          >
            내 프로필
          </Link>

          <button
            role="menuitem"
            onClick={handleLogout}
            disabled={loading}
            className="w-full text-left block px-4 py-2 hover:bg-[#2E223F] transition disabled:opacity-60"
          >
            {loading ? "로그아웃 중..." : "로그아웃"}
          </button>

          {/* 꼬리 */}
          <div
            className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0
                       border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-[#1D1921]"
          />
          <div
            className="absolute -left-2.5 top-1/2 -translate-y-1/2 w-0 h-0
                       border-t-9 border-b-9 border-r-9 border-t-transparent border-b-transparent border-r-[#323036] -z-10"
          />
        </div>
      )}
    </div>
  );
}
