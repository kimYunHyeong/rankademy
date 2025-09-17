"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { RankingTable } from "@/components/ranking-table";
import SubHeaderUnivRanking from "@/components/sub-header-univ-ranking";
import SearchAndFilter from "@/components/search-and-filter";

import type {
  univGroupData,
  Column,
  OptionMetaOf,
  OptionValueOf,
} from "@/types";
import univGruopRanking from "@/mock/univGroupRankingData.json";
import { calcRankScore } from "@/utils/calc-rank-score";

export default function Home() {
  // ✅ 동기 접근 (클라이언트에서만 사용)
  const { univName: raw } = useParams<{ univName: string }>();
  const univName = decodeURIComponent(String(raw ?? ""));

  const sortOptions = [
    { value: "rank", label: "랭크순", meta: { type: "number" } },
    { value: "winrate", label: "승률순", meta: { type: "number" } },
  ] as const;

  type SortValue = OptionValueOf<typeof sortOptions>;
  type SortMeta = OptionMetaOf<typeof sortOptions>;

  const [sortKey, setSortKey] = useState<SortValue>("rank");
  const [query, setQuery] = useState("");

  const capitalize = (s: string) =>
    s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : s;

  // ✅ 원본 리스트
  const baseData = useMemo<univGroupData[]>(
    () =>
      Array.isArray(univGruopRanking)
        ? (univGruopRanking as univGroupData[])
        : [],
    []
  );

  // ✅ 검색 필터
  const filteredData = useMemo<univGroupData[]>(() => {
    if (!query) return baseData;
    const q = query.toLowerCase();
    return baseData.filter((row) => {
      const name = (row.group?.name ?? "").toLowerCase();
      return name.includes(q);
    });
  }, [baseData, query]);

  // ✅ 정렬
  const sortedData = useMemo<univGroupData[]>(() => {
    const num = (x: unknown): number =>
      typeof x === "number" && Number.isFinite(x) ? x : -Infinity;

    const getRankScore = (row: univGroupData) =>
      calcRankScore(row.tier?.rank, row.tier?.lp, row.tier?.tier);

    return [...filteredData].sort((a, b) => {
      let diff = 0;

      if (sortKey === "rank") {
        diff = getRankScore(b) - getRankScore(a); // 랭크 우선
      } else {
        diff = num((b as any)[sortKey]) - num((a as any)[sortKey]); // 그 외 숫자 키
      }

      if (diff !== 0) return diff; // ✅ 1차 정렬 결과 사용

      // ✅ 동점 시 2차/3차 키로 안정 정렬
      const nameDiff = (a.groupLeader.userName ?? "").localeCompare(
        b.groupLeader.userName ?? ""
      );
      if (nameDiff !== 0) return nameDiff;

      return (a.group.name ?? "").localeCompare(b.group.name ?? "");
    });
  }, [filteredData, sortKey]);

  const columns: Column<univGroupData>[] = [
    {
      id: "group",
      header: "그룹명",
      headerClassName: "w-[21%]",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/rankings/univ/${encodeURIComponent(
              "서울과학기술대학교"
            )}/groups/${row.group.id}`}
            className="flex items-center gap-2  transition"
          >
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${row.group.icon}.png`}
              alt={row.group.icon}
              width={30}
              height={30}
            />
            <span>{row.group.name}</span>
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
          <span>{row.competition.cnt}</span>
        </div>
      ),
    },
    {
      id: "competitionWinCnt",
      header: "대항전 승리",
      headerClassName: "w-[10%]",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <span>{row.competition.win}</span>
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
            src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/ranked-mini-crests/${row.tier.rank}.svg`}
            alt={row.tier.rank}
            width={30}
            height={30}
          />
          <div>
            <div className="flex">
              <span>{capitalize(row.tier.rank)}</span>
              <span className="w-1" />
              <span>{row.tier.tier}</span>
            </div>
            <span>{row.tier.lp}</span>
          </div>
        </div>
      ),
    },
    {
      id: "groupLeader",
      header: "그룹장",
      headerClassName: "w-[21%]",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${row.groupLeader.icon}.png`}
            alt={row.groupLeader.icon}
            width={30}
            height={30}
          />
          <span>{row.groupLeader.userName}</span>
          <span>{row.groupLeader.userTag}</span>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* 상단 고정 헤더 */}
      <SubHeaderUnivRanking
        univName={univName}
        univNameEn="SEOUL NATIONAL UNIVERSITY OF SCIENCE AND TECHNOLOGY"
        logoSrc={`/univ-emblem/${univName}.png`}
        items={[
          { label: "그룹 랭킹", href: `/rankings/univ/${univName}/groups` },
          { label: "유저 랭킹", href: `/rankings/univ/${univName}/users` },
        ]}
        headerHeight={260}
      />

      <div className=" mx-auto px-6">
        <SearchAndFilter<SortValue, SortMeta>
          onSearch={setQuery}
          filterProps={{
            value: sortKey,
            onChange: (v) => setSortKey(v),
            options: sortOptions,
            placeholder: "정렬 기준",
          }}
        />

        <RankingTable key={sortKey} data={sortedData} columns={columns} />
      </div>
    </>
  );
}
