"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type Item = {
  label: string;
  href: string;
  match?: (path: string) => boolean;
};

export default function SubHeaderMain({
  items = [], // ✅ 기본값
  className = "",
  height = 40,
}: {
  items?: Item[]; // ✅ 옵셔널
  className?: string;
  height?: number;
}) {
  const pathname = usePathname();

  function defaultMatch(href: string, path: string) {
    if (!href) return false;
    if (href === "/") return path === "/"; // 홈은 홈에서만
    return path === href || path.startsWith(href + "/"); // 세그먼트 경계 매칭
  }

  const activeIndex = useMemo(() => {
    if (!Array.isArray(items) || items.length === 0) return 0;
    const path = pathname ?? "";

    // 1) 정확 일치 우선
    let idx = items.findIndex((it) =>
      it.match ? it.match(path) : path === it.href
    );
    if (idx >= 0) return idx;

    // 2) 접두사 일치 중 가장 "긴 href"를 선택(=구체적인 경로 우선)
    const candidates = items
      .map((it, i) => ({
        i,
        href: it.href,
        ok: it.match
          ? it.match(path)
          : path.startsWith(it.href + "/") || path === it.href,
      }))
      .filter((c) => c.ok)
      .sort((a, b) => b.href.length - a.href.length);

    return candidates.length ? candidates[0].i : 0;
  }, [items, pathname]);

  const count = items.length || 1; // ✅ 0으로 나눔 방지
  const segPct = 100 / count;
  const translateXPct = Math.min(Math.max(activeIndex, 0), count - 1) * segPct;

  // 빈 배열일 때는 단순한 껍데기만 렌더 (옵션)
  if (items.length === 0) {
    return (
      <div
        className={`relative inline-flex w-full max-w-[360px]  rounded-full bg-[#2A2431]/90 p-1 ${className}`}
        style={{ height }}
      />
    );
  }

  return (
    <div
      className="fixed top-0 w-[65%] flex justify-center 
                bg-[linear-gradient(180deg,#110D17_0%,rgba(17,13,23,0)_100%)] 
                z-50 py-3"
    >
      <div
        className={`relative inline-flex max-w-[360px] select-none rounded-full bg-[#2A2431]/90 p-1 ${className} w-60 h-10`}
        style={{ height }}
        role="tablist"
        aria-label="랭킹 토글"
      >
        {/* 움직이는 하얀 pill */}
        <span
          className="pointer-events-none absolute top-0 bottom-0 rounded-full bg-white transition-[left] duration-300 ease-out"
          style={{
            width: `${segPct}%`,
            left: `${activeIndex * segPct}%`, // ✅ 부모 기준으로 정확히 해당 세그먼트로 이동
          }}
        />

        {items.map((it, idx) => {
          const isActive = idx === activeIndex;
          return (
            <Link
              key={`${it.href}-${idx}`}
              href={it.href}
              role="tab"
              aria-selected={isActive}
              className={[
                "relative z-10 flex-1 rounded-full px-4",
                "flex items-center justify-center text-sm font-medium",
                "transition-colors duration-200",
                isActive ? "text-[#0A080E]" : "text-[#B1ACC1]",
              ].join(" ")}
              style={{ height: height - 8 }}
            >
              {it.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
