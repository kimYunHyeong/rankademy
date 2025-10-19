// components/table-search-and-filter-univ-user.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
  // 1) 필터 상태: ✅ 초기값은 '미선택' 의미의 빈 문자열로
  const [filter, setFilter] = useState<FilterValue>({
    major: "",
    admissionYear: "",
    mainPosition: "",
  });

  // 2) 검색 상태
  const [q, setQuery] = useState("");

  // 3) 필터 적용
  const filteredByFilter = useMemo(() => {
    const norm = (v?: string) => (v ?? "").trim();
    const normUpper = (v?: string) => norm(v).toUpperCase();

    return data.filter((r) => {
      const majorOk =
        !norm(filter.major) || norm(r.major) === norm(filter.major);

      // ✅ admissionYear로 비교 (양쪽을 문자열로 변환해서 안전비교)
      const admissionYearOk =
        !norm(filter.admissionYear) ||
        String(r.admissionYear) === String(filter.admissionYear);

      // ✅ 라인(포지션)은 대소문자 무시
      const position = normUpper(filter.mainPosition);
      const positionOk = !position || normUpper(r.mainPosition) === position;

      return majorOk && admissionYearOk && positionOk;
    });
  }, [data, filter]);

  // 4) 검색 적용 (필터 결과 위에 추가로 적용)
  const filteredData = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return filteredByFilter;

    return filteredByFilter.filter((r) => {
      const nameOnly = (r.summonerName ?? "").toLowerCase();
      const nameWithTag = `${r.summonerName ?? ""}#${
        r.summonerTag ?? ""
      }`.toLowerCase();
      return nameOnly.includes(s) || nameWithTag.includes(s);
    });
  }, [filteredByFilter, q]);

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
        <Filter options={options} value={filter} onChange={setFilter} />
        <SearchBox width={300} placeholder="유저 이름" onChange={setQuery} />
      </div>

      {/* 테이블 */}
      <RankingTable data={filteredData} columns={columns} />
    </div>
  );
}
