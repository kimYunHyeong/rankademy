import type { Metadata } from "next";
import "@/styles/globals.css";
import ClientShell from "@/components/client-shell";
import Image from "next/image";
import { AuthProvider } from "./context/auth-context";

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

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-[#110D17]">
        {/* 클라이언트 상호작용/라우터 훅/로그인 드롭다운 등은 ClientShell에서 */}
        <AuthProvider>
          <ClientShell>{children}</ClientShell>
        </AuthProvider>

        {/* 푸터는 상호작용 없어서 서버에서 바로 렌더링 */}
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

        {/* parallel route용 모달 아웃렛 */}
        <div id="modal-root" />
        {modal}
      </body>
    </html>
  );
}
