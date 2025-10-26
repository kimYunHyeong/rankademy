"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ProfileMenu from "@/components/profile-menu";
import useAuthStatus from "@/hooks/use-auth-status";
import { SUMMONER_ICON_URL } from "@/lib/api";

type NavItem = {
  href: string;
  label: string;
  key: "ranking" | "groups" | "competitions";
  match?: (path: string) => boolean;
};

export default function ClientShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/";
  const { isAuthenticated, accessToken } = useAuthStatus();

  const navItems: NavItem[] = [
    {
      href: "/rankings",
      label: "랭킹",
      key: "ranking",
      match: (path) =>
        path === "/" || path === "/rankings" || path.startsWith("/rankings/"),
    },
    { href: "/groups", label: "그룹", key: "groups" },
    { href: "/competitions", label: "대항전", key: "competitions" },
  ];

  const defaultMatch = (href: string, path: string) =>
    path === href || path.startsWith(href + "/");

  const avatarSrc = `${SUMMONER_ICON_URL}/${1}.png`;

  return (
    <div className="m-5">
      <div className="flex gap-6 h-[calc(100vh-40px)] bg-none">
        {/* 왼쪽 네비 */}
        <aside className="z-50 flex flex-col justify-between items-center h-full w-20">
          <Link
            className="flex flex-col items-center font-helveticaInserat text-white"
            href="/"
          >
            <Image
              src="/images/logo_underside.png"
              alt="Rankademy 로고"
              width={61}
              height={45.75}
              className="object-contain"
            />
          </Link>

          <nav className="flex flex-col text-white *:text-center *:p-1 *:w-20 *:rounded-md">
            {navItems.map((item) => {
              const isActive = item.match
                ? item.match(pathname)
                : defaultMatch(item.href, pathname);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className="flex flex-col items-center justify-center"
                  aria-current={isActive ? "page" : undefined}
                >
                  <Image
                    src={`/images/${item.key}${
                      isActive ? "-full" : "-empty"
                    }.png`}
                    alt={`${item.label} 로고`}
                    width={46}
                    height={46}
                    className="object-contain transition-transform duration-200 ease-out hover:scale-110"
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* 내 정보 */}
          <div className="flex flex-col items-center text-white space-y-3">
            <Link className="text-[#B6B6B6]" href="/alarm">
              PRO
            </Link>
            <Link href="/alarm">
              <Image
                src="/images/alram.png"
                alt="알람"
                width={18}
                height={18}
                className="object-contain"
              />
            </Link>

            {isAuthenticated ? (
              <ProfileMenu avatarSrc={avatarSrc} />
            ) : (
              <Link
                href="/login"
                className="px-3 py-2 rounded bg-[#25242A33] border border-[#323036] text-[#B1ACC1] text-sm"
              >
                로그인
              </Link>
            )}
          </div>
        </aside>

        {/* 가운데 컨텐츠 */}
        <main className="flex-1 h-full overflow-y-auto hide-scrollbar flex justify-center">
          <div className="w-[70%]">{children}</div>
        </main>

        {/* 오른쪽: 광고 */}
        <aside className="w-20 h-full flex flex-col justify-center text-white">
          <span>광고</span>
        </aside>
      </div>
    </div>
  );
}
