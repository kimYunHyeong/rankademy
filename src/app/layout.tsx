"use client";

import "@/styles/globals.css";
import { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  key: "ranking" | "groups" | "competitions";
  match?: (path: string) => boolean;
};

// ✅ 간단한 로그인 상태 훅
function useAuthStatus() {
  const [state, setState] = useState<{
    loading: boolean;
    authenticated: boolean;
    user?: any;
  }>({
    loading: true,
    authenticated: false,
  });

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/auth/status", { credentials: "include" });
        const json = await res.json();
        if (alive)
          setState({
            loading: false,
            authenticated: !!json.authenticated,
            user: json.user,
          });
      } catch {
        if (alive) setState({ loading: false, authenticated: false });
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return state;
}

/** ✅ 프로필 이미지 클릭 시 뜨는 팝업 메뉴 */
function ProfileMenu({ avatarSrc }: { avatarSrc: string }) {
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
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      // 실패해도 일단 클라이언트 상태 초기화를 위해 앞으로 보냄
      if (!res.ok) console.warn("Logout API failed");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setOpen(false);
      // 세션이 사라졌다는 가정 하에, 로그인 화면 or 홈으로
      router.replace("/");
      router.refresh(); // 서버 컴포넌트 재검증
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

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  const pathname = usePathname() ?? "/";
  const { loading, authenticated, user } = useAuthStatus();

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

  // 아바타 소스 결정 (유저 정보가 있다면 거기서, 없으면 기본값)
  const avatarSrc =
    user?.avatarUrl ??
    "https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/Yasuo.png";

  return (
    <html lang="ko">
      <body className="bg-[#110D17]">
        <div id="modal-root" />
        <div className="m-5">
          <div className=" flex gap-6 h-[calc(100vh-40px)] bg-none">
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

              {/* ✅ 내 정보: 로그인 상태에 따라 분기 */}
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

                {/* 로딩 중이면 살짝 자리만 유지 */}
                {loading ? (
                  <div className="w-10 h-10 rounded bg-[#25242A33] animate-pulse" />
                ) : authenticated ? (
                  // ✅ 여기서 프로필 메뉴 사용
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
