import { ReactNode } from "react";
import Link from "next/link";
import style from "./layout.module.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="kr">
      <body>
        <header className={style.header_container}>
          <Link href={"/"} className={style.title}>
            Rankademy
          </Link>
          <nav className={style.nav_container}>
            <Link href={"/ranking"}>랭킹</Link>
            <Link href={"/group"}>그룹</Link>
            <Link href={"/fight"}>대항전</Link>
          </nav>
          <div className={style.my_info_container}>
            <Link href={"/alarm"}>알람</Link>
            <Link href={"/login"}>로그인</Link>
          </div>
        </header>

        <main className={style.main_container}> {children}</main>
      </body>
    </html>
  );
}
