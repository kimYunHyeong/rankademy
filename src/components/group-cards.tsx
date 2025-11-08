"use client";

import FallBackImage from "@/components/fallback-img";
import Image from "next/image";
import Link from "next/link";
import { MyGroup } from "@/app/groups/page";
import { formatDate } from "@/utils/format-date";
import { SUMMONER_ICON_URL } from "@/lib/api";

export default function GroupCards({ data }: { data: MyGroup[] }) {
  if (!data?.length) return null;

  return (
    <>
      {data.map((item) => (
        <Link
          key={item.groupId}
          href={`/groups/${item.groupId}`}
          className="shrink-0"
        >
          <div
            className="
              text-white rounded-xl w-[380px] overflow-hidden
              border-[1.5px] border-solid border-transparent
              [border-image-slice:1]
              [border-image-source:linear-gradient(90deg,rgba(255,86,121,0.2)_0%,rgba(255,86,121,0)_100%)]
              [clip-path:inset(0_round_0.75rem)]
            "
          >
            <FallBackImage
              src={item.groupLogoImg}
              alt={item.groupName}
              width={380}
              height={316}
              className="rounded-t-xl"
              draggable={false}
            />
            <div className="w-[380px] h-56 flex flex-col bg-[#25242A33] p-8">
              <span className="text-xl">{item.groupName}</span>
              <span className="text-[#B1ACC1] text-xs my-5">
                가입일 | {formatDate(item.createdAt)}
              </span>
              <span className="block text-sm max-h-24 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {item.about}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
