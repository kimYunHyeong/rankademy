// components/table-search-and-filter-univ-user.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Filter, { FilterOptions, FilterValue } from "@/components/filter";
import SearchBox from "@/components/search-box";
import { RankingTable } from "@/components/ranking-table";
import type { Column } from "@/types";
import { POSITION_IMG_URL, SUMMONER_ICON_URL, TIER_IMG_URL } from "@/lib/api";
import { capitalize } from "@/utils/capitalize";

// 프로젝트 타입에 맞춰 import
import { univUserRanking } from "@/app/rankings/univ/[univName]/users/page";

export default function TableSearchAndFilterUnivUser({
  data,
  options,
}: {
  data: univUserRanking[];
  options: FilterOptions;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  // URL 현재 쿼리를 초기값으로 사용(새로고침/딥링크 대응)
  const initial: FilterValue = {
    major: sp.get("major") ?? "",
    admissionYear: sp.get("admissionYear") ?? "",
    mainPosition: sp.get("mainPosition") ?? "",
  };

  // 1) 필터 상태 (UI 표시용)
  const [filter, setFilter] = useState<FilterValue>(initial);

  // 2) 검색 상태(q는 서버로 보내지 않고 클라에서만 사용)
  const [q, setQuery] = useState("");

  // URL 쿼리 업데이트 헬퍼(빈 문자열은 삭제)
  const pushFilterToUrl = (
    next: FilterValue,
    opts?: { resetPage?: boolean }
  ) => {
    const params = new URLSearchParams(sp.toString());

    const setOrDel = (key: string, val: string) => {
      const v = (val ?? "").trim();
      if (v) params.set(key, v);
      else params.delete(key);
    };

    setOrDel("major", next.major ?? "");
    setOrDel("admissionYear", next.admissionYear ?? "");
    setOrDel("mainPosition", next.mainPosition ?? "");

    // 필터 바뀌면 페이지 0으로 (페이지 쿼리를 쓰는 경우에만)
    if (opts?.resetPage !== false) {
      params.set("page", "0");
    }

    // 검색어(q)는 서버로 보내지 않으므로 여기서 만지지 않음
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Filter 컴포넌트에서 변경 시: 상태 업데이트 + URL 반영
  const handleFilterChange = (next: FilterValue) => {
    setFilter(next);
    pushFilterToUrl(next, { resetPage: true });
  };

  // 3) 검색만 클라이언트에서 적용
  const filteredData = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return data;

    return data.filter((r) => {
      const nameOnly = (r.summonerName ?? "").toLowerCase();
      const nameWithTag = `${r.summonerName ?? ""}#${
        r.summonerTag ?? ""
      }`.toLowerCase();
      return nameOnly.includes(s) || nameWithTag.includes(s);
    });
  }, [data, q]);

  /* 테이블 데이터 */
  const columns: Column<univUserRanking>[] = [
    {
      id: "user",
      header: "유저명",
      headerClassName: "w-[20%]",
      cell: (row) => (
        <Link href={`/user/${row.summonerName}`}>
          <div className="flex items-center gap-2">
            <Image
              src={`${SUMMONER_ICON_URL}${row.summonerIcon}.png`}
              alt={row.summonerIcon.toString()}
              width={30}
              height={30}
              className="rounded"
            />
            <span>
              {row.summonerName}#{row.summonerTag}
            </span>
          </div>
        </Link>
      ),
    },
    {
      id: "major",
      header: "전공",
      headerClassName: "w-[18%]",
      cell: (row) => (
        <div className="flex flex-col">
          <span>{row.major}</span>
          <span>{row.admissionYear}학번</span>
        </div>
      ),
    },
    {
      id: "position",
      header: "라인",
      headerClassName: "w-[10%]",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Image
            src={`${POSITION_IMG_URL}${row.mainPosition.toLowerCase()}.svg`}
            alt={row.mainPosition}
            width={24}
            height={24}
          />
          <Image
            src={`${POSITION_IMG_URL}${row.subPosition.toLowerCase()}.svg`}
            alt={row.subPosition}
            width={24}
            height={24}
          />
        </div>
      ),
    },
    {
      id: "tier",
      header: "티어",
      headerClassName: "w-[14%]",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Image
            src={`${TIER_IMG_URL}${row.tierInfo.tier.toLowerCase()}.svg`}
            alt={row.tierInfo.tier}
            width={30}
            height={30}
          />
          <div>
            <div className="flex">
              <span>{capitalize(row.tierInfo.tier.toLowerCase())}</span>
              <span className="w-1"> </span>
              <span>{row.tierInfo.rank}</span>
            </div>
            <span>{row.tierInfo.lp}</span>
          </div>
        </div>
      ),
    },
    {
      id: "winRate",
      header: "승률",
      headerClassName: "w-[30%]",
      cell: (row) => (
        <div className="flex items-center gap-2 w-full">
          <div className="relative flex-1 w-[160px] h-[30px] border-[#323036] rounded-[4px] bg-[#110D17] overflow-hidden">
            <div
              className="h-full bg-[#FF567980]"
              style={{ width: `${row.winRate}%` }}
            />
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
              {row.winCount}승
            </span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
              {row.lossCount}패
            </span>
          </div>
          <span className="ml-3 text-sm text-white">{row.winRate}%</span>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col space-y-4 w-full">
      {/* 필터 바 | 검색 박스 */}
      <div className="w-full flex justify-between">
        <Filter
          options={options}
          value={filter}
          onChange={handleFilterChange}
        />
        <SearchBox
          queryKey="univNameKey"
          width={300}
          placeholder="학교 이름"
          syncToUrl
          onSubmit={() => {}}
        />
      </div>
      {/* 테이블 (data는 서버에서 필터링되어 내려옴, q만 클라에서 추가 필터링) */}
      <RankingTable data={filteredData} columns={columns} />
    </div>
  );
}
