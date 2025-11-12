"use client";

import FallBackImage from "@/components/fallback-img";
import Link from "next/link";
import { formatDate } from "@/utils/format-date";

/* 목데이터 */
import { useEffect, useState } from "react";
import { fetchFromAPI } from "@/utils/fetcher";
import { MyGroup } from "@/app/groups/page";
import { useRouter } from "next/navigation";

export default function GroupCards({ data }: { data: MyGroup[] }) {
  const [groups, setGroups] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchFromAPI(`/groups/my`);

      if (!res.ok) {
        if (res.status === 403) alert(`학교 및 대학을 인증 후 진행해주세요`);
        router.replace("/me");
        return;
      }

      setGroups(res.data.content ?? []);
    };

    fetchData();
  }, []);

  return (
    <>
      {(data?.length ?? 0) > 0 ? (
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
      ) : (
        <>
          <Link href={`/groups/edit`} className="shrink-0">
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
                src={""}
                alt={"make group"}
                width={380}
                height={316}
                className="rounded-t-xl"
                draggable={false}
              />
              <div className="w-[380px] h-56 flex flex-col bg-[#25242A33] p-8">
                <span className="text-xl">
                  {"그룹을 생성하거나 가입해보세요"}
                </span>

                <span className="text-[#B1ACC1] mt-3 block text-sm max-h-24 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  {"그룹을 생성하고 대항전에 참여하여 학교의 랭킹을 올리세요!"}
                </span>
              </div>
            </div>
          </Link>
        </>
      )}
    </>
  );
}
