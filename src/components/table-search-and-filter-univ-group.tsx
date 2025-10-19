"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Filter, { FilterOptions, FilterValue } from "@/components/filter";

import SearchBox from "@/components/search-box";
import { RankingTable } from "@/components/ranking-table";
import type { Column } from "@/types";

import { CHAMPION_IMG_URL, SUMMONER_ICON_URL, TIER_IMG_URL } from "@/lib/api";
import { capitalize } from "@/utils/capitalize";

import { univGruopRanking } from "@/app/rankings/univ/[univName]/groups/page";

export default function TableSearchAndFilterUnivGroup({
  data,
  options,
}: {
  data: univGruopRanking[];
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

  /*   // 3) 필터 적용
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
      const positionOk =
        !position ||
        normUpper(r.mainPosition) === position ||
        normUpper(r.subPosition) === position;

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
 */
  /* 테이블 데이터 */
  const columns: Column<univGruopRanking>[] = [
    {
      id: "group",
      header: "그룹명",
      headerClassName: "w-[21%]",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/groups/${row.groupId}`}
            className="flex items-center gap-2  transition"
          >
            {/* 실제 이미지로 수정 */}
            <Image
              src={`${CHAMPION_IMG_URL}${row.logoImageUrl}.png`}
              alt={row.logoImageUrl}
              width={30}
              height={30}
              className="rounded"
            />
            <span>{row.name}</span>
          </Link>
        </div>
      ),
    },
    {
      id: "groupMemberCnt",
      header: "그룹 인원",
      headerClassName: "w-[10%]",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <span>{row.memberCnt}</span>
        </div>
      ),
    },
    {
      id: "competitionCnt",
      header: "대항전 진행",
      headerClassName: "w-[10%]",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <span>{row.competitionTotalCnt}</span>
        </div>
      ),
    },
    {
      id: "competitionWinCnt",
      header: "대항전 승리",
      headerClassName: "w-[10%]",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <span>{row.competitionWinCnt}</span>
        </div>
      ),
    },
    {
      id: "tierAvg",
      header: "평균 티어",
      headerClassName: "w-[20%]",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Image
            src={`${TIER_IMG_URL}${row.avgTierInfo.tier.toLowerCase()}.svg`}
            alt={row.avgTierInfo.tier}
            width={30}
            height={30}
          />
          <div>
            <div className="flex">
              <span>{capitalize(row.avgTierInfo.tier.toLowerCase())}</span>
              <span className="w-1"> </span>
              <span>{row.avgTierInfo.rank}</span>
            </div>
            <span>{row.avgTierInfo.lp}</span>
          </div>
        </div>
      ),
    },
    {
      id: "groupLeader",
      header: "그룹장",
      headerClassName: "w-[21%]",
      cell: (row) => (
        <Link href={`/user/${row.leader.id}`}>
          <div className="flex items-center gap-2">
            <Image
              src={`${SUMMONER_ICON_URL}${row.leader.summonerIcon}.png`}
              alt={row.leader.summonerIcon.toString()}
              width={30}
              height={30}
              className="rounded"
            />
            <span>
              {row.leader.summonerName}#{row.leader.summonerTag}
            </span>
          </div>
        </Link>
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
      <RankingTable data={data} columns={columns} />
    </div>
  );
}
