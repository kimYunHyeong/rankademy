"use client";

import "@/styles/globals.css";
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  key: "ranking" | "groups" | "competitions";
  match?: (path: string) => boolean;
};

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  const pathname = usePathname() ?? "/";

  const navItems: NavItem[] = [
    {
      href: "/rankings",
      label: "랭킹",
      key: "ranking",
      // 홈("/")과 /rankings 모두 활성 처리
      match: (path) =>
        path === "/" || path === "/rankings" || path.startsWith("/rankings/"),
    },
    { href: "/groups", label: "그룹", key: "groups" },
    { href: "/competitions", label: "대항전", key: "competitions" },
  ];

  // 기본 매칭 규칙: 정확히 같거나, 세그먼트 경계로 시작
  const defaultMatch = (href: string, path: string) =>
    path === href || path.startsWith(href + "/");

  return (
    <html lang="ko">
      <body className="bg-[#110D17]">
        {/* modal용 */}
        <div id="modal-root" />

        <div className="m-5">
          {/* 3중 분할(네비, 내용, 광고)*/}

          <div className=" flex gap-6 h-[calc(100vh-40px)] bg-none">
            {/* 왼쪽*/}
            <aside className="z-50 flex flex-col justify-between items-center h-full w-20">
              {/* 로고 */}
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

              {/* 네비게이션 */}
              <nav className="flex flex-col text-white [&>*]:text-center [&>*]:p-1 [&>*]:w-[80px] [&>*]:rounded-md">
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
                <Link href="/login">
                  <Image
                    src="https://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/Yasuo.png"
                    alt="프로필"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </Link>
              </div>
            </aside>

            {/* 가운데: 이 영역만 스크롤 */}
            <main className="flex-1 h-full overflow-y-auto hide-scrollbar flex justify-center">
              <div className="w-[70%]">{children}</div>
            </main>

            {/* 오른쪽: 광고 */}
            <aside className="w-20 h-full flex flex-col justify-center text-white">
              <span>광고</span>
            </aside>
          </div>
        </div>

        <footer className="mt-10 text-[#B1ACC1] w-full bg-[#0A080E] h-50 flex gap-6">
          <div className="w-[20%]"></div>
          <div className="w-[80%] flex flex-col space-y-2">
            <div className="h-4"></div>
            <div className="flex space-x-2">
              <Image
                src="/images/logo.png"
                alt="Rankademy 로고"
                width={150.58}
                height={34}
                className="space-y-2"
              />
            </div>
            <span className="my-3">이용약관 | 개인정보처리방침</span>
            <div className="flex flex-col">
              <span>E-mail: example@gamil.com</span>
              <span>@ 2025 Rankademy All rights reserved</span>
            </div>
          </div>
        </footer>
        {modal}
      </body>
    </html>
  );
}
