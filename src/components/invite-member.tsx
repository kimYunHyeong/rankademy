"use client";

import { useRouter } from "next/navigation";
import { SearchBox } from "./search-and-filter";
import { useState } from "react";

export default function InviteMember() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  return (
    <>
      <div className="flex flex-col w-[500px] h-[180px] border border-[#323036] rounded bg-[#25242A] text-white justify-center ">
        <div className="h-[85%] flex flex-col p-5 ">
          <span className="text-white text-2xl mb-3 ">그룹원 초대</span>
          <span className="text-sm text-[#B1ACC1] mb-4">
            소환사의 이름을 검색하여 그룹원 초대를 보내 보세요
          </span>
          <SearchBox onSearch={setQuery} width={"100%"} placeholder="닉네임" />
        </div>

        <button
          onClick={() => router.back()}
          className="h-[10%] text-xs text-[#B1ACC1]"
        >
          닫기
        </button>
      </div>
    </>
  );
}
