"use client";

import Link from "next/link";
import FallBackImage from "@/components/fallback-img";
import { useState } from "react";
import { useRouter } from "next/navigation";
/* import { Filter } from "@/components/search-box"; */

import { SUMMONER_ICON_URL } from "@/lib/api";

const mockSummoners = [
  {
    id: 1,
    userName: "소환사",
    userTag: "1234",
    icon: 4,
  },
  {
    id: 2,
    userName: "소환사",
    userTag: "5678",
    icon: 4,
  },
  {
    id: 3,
    userName: "닉네임",
    userTag: "0000",
    icon: 4,
  },
  {
    id: 4,
    userName: "닉네임2",
    userTag: "0001",
    icon: 4,
  },
];

const mock = [
  {
    value: "서울과기대 컴공",
    label: "서울과기대 컴공",
    meta: { type: "number" },
  },
  {
    value: "서울과기대 총학생회",
    label: "서울과기대 총학생회",
    meta: { type: "number" },
  },
  {
    value: "서울과기대 새마치",
    label: "서울과기대 새마치",
    meta: { type: "number" },
  },
];

type Props = {
  positionIcon: string;
  placeholder?: string;
};

function TeamRegisterInput({ positionIcon, placeholder }: Props) {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<null>(null);

  // 입력 시 자동완성 필터링
  const filtered = mockSummoners.filter((s) =>
    s.userName.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="relative flex items-center gap-2 w-full">
      {/* 포지션 아이콘 */}
      <FallBackImage
        src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-${positionIcon}.svg`}
        alt="role"
        width={32}
        height={32}
      />

      {/* 입력창 */}
      <div className="relative w-[360px] h-12">
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setSelected(null);
          }}
          placeholder={placeholder ?? "소환사#1234"}
          className="w-full bg-[#323036] border border-[#323036] text-white rounded px-3 py-2 text-sm placeholder:text-[#8B859A] focus:outline-none"
        />

        {/* 자동완성 리스트 */}
        {input && !selected && filtered.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-[#25242A] rounded border border-[#323036] overflow-hidden">
            {filtered.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setInput(`${s.userName}#${s.userTag}`);
                }}
                className="flex items-center gap-2 px-3 py-2 hover:bg-[#2E223F] w-full text-left"
              >
                <FallBackImage
                  src={`${SUMMONER_ICON_URL}${s.icon}.png`}
                  alt={s.icon.toString()}
                  width={20}
                  height={20}
                  className="rounded"
                />
                <span className="text-[#FF5679]">{s.userName}</span>
                <span className="text-[#B1ACC1] text-xs">{s.userTag}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  const filterData = mock;
  const summoner = mockSummoners;
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {/* 헤더 */}
        <div className="flex items-center justify-center text-white my-3">
          <span>스크림 팀 생성</span>
        </div>
        <div className="h-6"></div>

        {/* 본문 */}
        <div className="p-8 flex flex-col border-2 border-[#25242A] rounded bg-[#25242A33] w-[75%] min-h-[480px] h-auto">
          {/* 팀 이름 */}
          <div className="flex flex-col">
            <span className="text-white text-sm">팀 이름</span>
            <input
              className="bg-[#323036] border border-[#323036] rounded my-4 px-3 py-2 text-white"
              placeholder="팀 이름"
            />
          </div>

          {/* 소속 그룹 */}
          <div className="flex flex-col mb-5">
            <span className="text-white text-sm mb-2">소속 그룹</span>
            {/*       <Filter options={filterData} /> */}
          </div>

          {/* 팀원 등록 */}
          <div className="flex flex-col">
            <span className="text-white text-sm mb-2">팀원 등록</span>
            <div className="flex gap-8 mb-2">
              <TeamRegisterInput positionIcon="top" />
              <TeamRegisterInput positionIcon="jungle" />
            </div>
            <div className="flex gap-8  mb-2">
              <TeamRegisterInput positionIcon="middle" />
              <TeamRegisterInput positionIcon="bottom" />
            </div>
            <div className="flex gap-8  mb-2">
              <TeamRegisterInput positionIcon="utility" />
            </div>
          </div>

          {/* 팀 소개 */}
          <div className="flex flex-col my-10">
            <div className=" flex">
              <span className="text-white text-sm self-start mt-0.5">
                팀 소개
              </span>
              <FallBackImage
                src="/images/caution-triangle.png"
                alt="경고"
                width={24}
                height={24}
                className="object-contain ml-5 mr-1"
              />
              <span className="text-white">
                대표자 연락처를 꼭 포함해주세요
              </span>
            </div>

            <textarea
              className="my-4 text-sm h-[200px] leading-relaxed text-left wrap-break-word max-h-[250px] overflow-y-auto scrollbar-none bg-[#323036] border border-[#323036] rounded px-3 py-2 text-white resize-none"
              rows={5}
              placeholder="팀 소개"
            />
          </div>

          <div className="flex justify-end mt-5">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center border border-[#323036] w-[120px] h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
            >
              취소
            </button>
            <Link
              href={`/recruits/edit`}
              className="flex items-center justify-center w-[120px] h-11 text-white rounded bg-[#FF567933] text-center"
            >
              게시하시(요청 로직 작성 필요)
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
