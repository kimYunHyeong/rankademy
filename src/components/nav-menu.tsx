"use client";

import Link from "next/link";
import FallBackImage from "@/components/fallback-img";
import { usePathname } from "next/navigation";
import Image from "next/image";

type NavItem = {
  href: string;
  label: string;
  key: "ranking" | "groups" | "competitions";
  match?: (path: string) => boolean;
};

export default function NavMenu({ items }: { items: NavItem[] }) {
  const pathname = usePathname() ?? "/";

  const defaultMatch = (href: string, path: string) =>
    path === href || path.startsWith(href + "/");

  return (
    <nav className="flex flex-col text-white *:text-center *:p-1 *:w-20 *:rounded-md">
      {items.map((item) => {
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
              src={`/images/${item.key}${isActive ? "-full" : "-empty"}.png`}
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
  );
}
