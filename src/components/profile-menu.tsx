"use client";

import { useEffect, useRef, useState } from "react";
import FallBackImage from "@/components/fallback-img";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SUMMONER_ICON_URL } from "@/lib/api";

export default function ProfileMenu({
  summonerIcon,
}: {
  summonerIcon: number | null;
}) {
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
      await fetch("/auth/logout", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      });

      // 상태/캐시 갱신 보장
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
        <FallBackImage
          src={`${SUMMONER_ICON_URL}${summonerIcon}.png`}
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
