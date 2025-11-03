import Link from "next/link";
import FallBackImage from "@/components/fallback-img";
import ProfileMenu from "@/components/profile-menu";
import { getIsAuthenticated } from "@/lib/auth";
import NavMenu from "@/components/nav-menu";

type NavItem = {
  href: string;
  label: string;
  key: "ranking" | "groups" | "competitions";
};

export default async function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  // 서버에서 바로 인증 정보 조회
  const { isAuthenticated, summonerIcon } = await getIsAuthenticated();

  const navItems: NavItem[] = [
    { href: "/rankings", label: "랭킹", key: "ranking" },
    { href: "/groups", label: "그룹", key: "groups" },
    { href: "/competitions", label: "대항전", key: "competitions" },
  ];

  return (
    <div className="m-5">
      <div className="flex gap-6 h-[calc(100vh-40px)] bg-none">
        {/* 왼쪽 네비 */}
        <aside className="z-50 flex flex-col justify-between items-center h-full w-20">
          <Link
            className="flex flex-col items-center font-helveticaInserat text-white"
            href="/"
          >
            <FallBackImage
              src="/images/logo-underside.png"
              alt="Rankademy 로고"
              width={61}
              height={45.75}
              className="object-contain"
            />
          </Link>

          {/* 네비게이션: 클라 하위 컴포넌트에서 pathname 계산 */}
          <NavMenu items={navItems} />

          {/* 내 정보 */}
          <div className="flex flex-col items-center text-white space-y-3">
            <Link className="text-[#B6B6B6]" href="/alarm">
              PRO
            </Link>
            <Link href="/alarm">
              <FallBackImage
                src="/images/alram.png"
                alt="알람"
                width={18}
                height={18}
                className="object-contain"
              />
            </Link>

            {isAuthenticated ? (
              <ProfileMenu summonerIcon={summonerIcon} />
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
