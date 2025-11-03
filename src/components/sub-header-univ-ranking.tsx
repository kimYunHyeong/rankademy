"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type Item = {
  label: string;
  href: string;
  match?: (path: string) => boolean;
};

type Props = {
  /** ex) "서울과학기술대학교" */
  univName: string;
  /** 선택: 영문 표기 */
  univNameEn?: string;
  /** 배경 로고 이미지 경로 (public/ 아래 경로 권장) */
  logoSrc: string;
  /** 랭킹 토글 항목 */
  items: Item[];
  /** 헤더 높이(px) – 배경/타이틀 구간 + 토글 여유 포함 */
  headerHeight?: number; // default 240
  className?: string;
};

export default function SubHeaderUnivRanking({
  univName,
  univNameEn,
  logoSrc,
  items = [],
  headerHeight = 240,
  className = "",
}: Props) {
  const pathname = usePathname();

  function defaultMatch(href: string, path: string) {
    if (!href) return false;
    if (href === "/") return path === "/";
    return path === href || path.startsWith(href + "/");
  }

  const activeIndex = useMemo(() => {
    const path = (pathname ?? "").split("?")[0];

    // 1) 정상 매칭 시도
    let i = items.findIndex((it) =>
      it.match ? it.match(path) : defaultMatch(it.href, path)
    );
    if (i >= 0) return i;

    // 2) 세그먼트 힌트 (users / groups가 들어있으면 해당 탭)
    const usersIdx = items.findIndex((it) => /\/users(\/|$)/.test(it.href));
    const groupsIdx = items.findIndex((it) => /\/groups(\/|$)/.test(it.href));
    if (/\/users(\/|$)/.test(path) && usersIdx !== -1) return usersIdx;
    if (/\/groups(\/|$)/.test(path) && groupsIdx !== -1) return groupsIdx;

    // 3) 베이스 경로인 경우 users를 기본으로
    if (usersIdx !== -1) return usersIdx;

    // 4) 최종 fallback
    return 0;
  }, [items, pathname]);

  const count = Math.max(1, items.length);
  const segPct = 100 / count;

  return (
    <>
      {/* 고정 헤더 */}
      <header
        className={`fixed inset-x-0 top-0 z-40 overflow-hidden ${className}`}
        style={{ height: headerHeight }} // 예: 360~420 추천
      >
        {/* 배경 그라데이션 */}
        <div className="absolute inset-0 bg-linear-to-b from-[#24192F] to-[#110D17]" />

        {/* 배경 로고: 오른쪽, 세로 2/3 지점, 큰 사이즈. 헤더보다 크면 아래/옆이 잘림 */}
        <div
          className="
      pointer-events-none absolute
      left-[60%] top-[70%]
      -translate-x-1/2 -translate-y-1/2
      w-[min(35vh,480px)] h-[min(35vh,480px)]
      rounded-full overflow-hidden opacity-25
    "
        >
          <Image src={logoSrc} alt="" fill priority className="object-cover" />
        </div>

        {/* 하단 페이드 아웃(배경과 본문 연결을 부드럽게) */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#110D17] to-transparent" />

        <div className="relative h-full max-w-6xl mx-auto px-8 flex flex-col justify-end gap-6">
          {/* 타이틀 */}

          <div>
            <h1 className="text-white text-3xl sm:text-4xl font-extrabold leading-tight">
              {univName}
            </h1>
            {univNameEn && (
              <p className="text-xs sm:text-sm text-white/70 tracking-wide">
                {univNameEn}
              </p>
            )}
          </div>

          {/* 토글: 한 줄 아래 중앙. 하얀 pill이 세로 꽉 차도록(top-0 bottom-0) */}
          <nav
            aria-label="랭킹 토글"
            className="w-full flex justify-center pb-4"
          >
            <div
              className={`relative inline-flex max-w-[360px] select-none rounded-full bg-[#2A2431]/90 p-1 ${className} w-60 h-10`}
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
                  >
                    {it.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      {/* 본문이 헤더 밑으로 숨지 않도록 spacer */}
      <div aria-hidden className="w-full" style={{ height: headerHeight }} />
    </>
  );
}
