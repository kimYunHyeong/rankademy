import type { Metadata } from "next";
import "@/styles/globals.css";
import FallBackImage from "@/components/fallback-img";
import Link from "next/link";
import ProfileMenu from "@/components/profile-menu";
import { getIsAuthenticated } from "@/lib/auth";
import NavMenu from "@/components/nav-menu";
import { checkAlarm } from "@/app/actions";
import { fetchFromAPI } from "@/utils/fetcher";
import { PaginationData } from "@/types";
import AlarmSection from "@/components/check-alarm";
import Image from "next/image";

type NavItem = {
  href: string;
  label: string;
  key: "ranking" | "groups" | "competitions";
};

export type Alarm = {
  notificationId: number;
  message: string;
  isConfirmed: boolean;
  deliveredAt: string;
};

export type AlarmRes = {
  content: Alarm[];
  page: PaginationData;
};

const mockAlarmList = [
  {
    notificationId: 15,
    message: "팀 Rankademy이 생성되었습니다.",
    isConfirmed: true,
    deliveredAt: "2025-11-10T12:18:26.976Z",
  },
  {
    notificationId: 16,
    message: "팀 Rankademy이 생성되었습니다.",
    isConfirmed: true,
    deliveredAt: "2025-11-10T12:18:26.976Z",
  },
  {
    notificationId: 17,
    message: "팀 Rankademy이 생성되었습니다.",
    isConfirmed: true,
    deliveredAt: "2025-11-10T12:18:26.976Z",
  },
  {
    notificationId: 18,
    message: "팀 Rankademy이 생성되었습니다.",
    isConfirmed: true,
    deliveredAt: "2025-11-10T12:18:26.976Z",
  },
  {
    notificationId: 19,
    message: "팀 Rankademy이 생성되었습니다.",
    isConfirmed: true,
    deliveredAt: "2025-11-10T12:18:26.976Z",
  },
];

export const metadata: Metadata = {
  title: {
    default: "Rankademy",
    template: "%s | Rankademy",
  },
  description: "대학생 e스포츠 랭킹/그룹/대항전 플랫폼 Rankademy",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Rankademy",
    description: "대학생 e스포츠 랭킹/그룹/대항전 플랫폼 Rankademy",
    url: "https://rankademy.kr",
    siteName: "Rankademy",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rankademy",
    description: "대학생 e스포츠 랭킹/그룹/대항전 플랫폼 Rankademy",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://rankademy.kr"),
};

export default async function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const { isAuthenticated, summonerIcon } = await getIsAuthenticated();

  const myAlarm: Alarm[] =
    isAuthenticated === true
      ? ((await fetchFromAPI(`/notifications?page=0`)).data as AlarmRes)
          .content ?? []
      : [];

  const navItems: NavItem[] = [
    { href: "/rankings", label: "랭킹", key: "ranking" },
    { href: "/groups", label: "그룹", key: "groups" },
    { href: "/competitions", label: "대항전", key: "competitions" },
  ];

  return (
    <html lang="ko">
      <body className="bg-[#110D17]">
        <div className="m-5">
          <div className="flex gap-6 h-[calc(100vh-40px)] bg-none">
            {/* 왼쪽 네비 */}
            <aside className="z-50 flex flex-col justify-between items-center h-full w-20">
              <Link
                className="flex flex-col items-center font-helveticaInserat text-white"
                href="/"
              >
                <Image
                  src="/images/logo-underside.png"
                  alt="Rankademy 로고"
                  width={61}
                  height={45.75}
                  className="object-contain"
                />
              </Link>

              {/* 네비게이션*/}
              <NavMenu items={navItems} />

              {/* 내 정보 */}
              <div className="flex flex-col items-center text-white space-y-3">
                {isAuthenticated ? (
                  <div className="flex flex-col items-center text-white space-y-3">
                    <Link className="text-[#B6B6B6]" href="/pro">
                      <Image
                        src="/images/pro.png"
                        alt="Rankademy 로고"
                        width={31}
                        height={24}
                        className="object-contain"
                      />
                    </Link>
                    <AlarmSection
                      alarmList={mockAlarmList}
                      checkAction={checkAlarm}
                    />
                    <ProfileMenu summonerIcon={summonerIcon} />
                  </div>
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

        {/* footer */}
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
              <span>E-mail: rankademy@gmail.com</span>
              <span>@ 2025 Rankademy All rights reserved</span>
            </div>
          </div>
        </footer>

        {/* parallel route용 모달 아웃렛 */}
        <div id="modal-root" />
        {modal}
      </body>
    </html>
  );
}
