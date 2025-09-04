"use client";

// app/page.tsx
import { useMemo, useState } from "react";
import { RankingTable } from "@/components/ranking-table";
import type { userData, Column, OptionMetaOf, OptionValueOf } from "@/types";
import SubHeaderMain from "@/components/sub-header-main";
import SearchAndFilter from "@/components/search-and-filter";
import Image from "next/image";
import userRanking from "@/mock/userRankingData.json";
import { calcWinRate } from "@/utils/calc-winrate";
import { calcRankScore } from "@/utils/calc-rank-score";
import Link from "next/link";

export default function Home() {
  const sortOptions = [
    {
      value: "rank",
      label: "랭크순",
      meta: { type: "number" },
    },
    {
      value: "winrate",
      label: "승률순",
      meta: { type: "number" },
    },
  ] as const;

  type SortValue = OptionValueOf<typeof sortOptions>;
  type SortMeta = OptionMetaOf<typeof sortOptions>;

  const [sortKey, setSortKey] = useState<SortValue>("rank");
  const [query, setQuery] = useState("");

  function capitalize(str: string) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  // ✅ 원본 리스트
  const baseData = useMemo<userData[]>(
    () => (Array.isArray(userRanking) ? (userRanking as userData[]) : []),
    []
  );

  // ✅ 검색 필터 (원하는 필드 추가/삭제 가능)
  const filteredData = useMemo<userData[]>(() => {
    if (!query) return baseData;
    const q = query.toLowerCase();

    return baseData.filter((row) => {
      const name = (row.user?.userName ?? "").toLowerCase();
      const tag = (row.user?.userTag ?? "").toLowerCase();
      const univ = (row.univName ?? "").toLowerCase();
      return name.includes(q) || tag.includes(q) || univ.includes(q);
    });
  }, [baseData, query]);

  // ✅ 정렬 (filteredData 기준)
  const sortedData = useMemo<userData[]>(() => {
    const num = (x: unknown) => (typeof x === "number" ? x : 0);
    const getWinRate = (row: userData) =>
      calcWinRate(row.record?.winCnt ?? 0, row.record?.LoseCnt ?? 0);
    const getRankScore = (row: userData) =>
      calcRankScore(row.tier?.rank, row.tier?.lp, row.tier?.tier);

    const out = [...filteredData].sort((a, b) => {
      let diff = 0;

      if (sortKey === "rank") {
        diff = getRankScore(b) - getRankScore(a); // 내림차순
      } else if (sortKey === "winrate") {
        diff = getWinRate(b) - getWinRate(a); // 내림차순
      } else {
        diff = num((b as any)[sortKey]) - num((a as any)[sortKey]);
      }

      if (diff !== 0) return diff;
      // 동점 시 보조 정렬 키들
      const nameDiff = (a.user.userName ?? "").localeCompare(
        b.user.userName ?? ""
      );
      if (nameDiff !== 0) return nameDiff;
      return (a.univName ?? "").localeCompare(b.univName ?? "");
    });

    return out;
  }, [filteredData, sortKey]);

  const columns: Column<userData>[] = [
    {
      id: "user",
      header: "유저명",
      headerClassName: "w-[20%]",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${row.user.icon}.png`}
            alt={row.user.icon}
            width={30}
            height={30}
          />
          <span>{row.user.userName}</span>
          <span>{row.user.userTag}</span>
        </div>
      ),
    },
    {
      id: "univ",
      header: "학교명",
      headerClassName: "w-[18%]",
      cell: (row) => (
        <Link
          href={`/rankings/rankings/univ/${encodeURIComponent(row.univName)}`}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <Image
            src={`/univ-emblem/${row.univName}.png`}
            alt={row.univName}
            width={30}
            height={30}
            className="rounded-full"
          />
          <span>{row.univName}</span>
        </Link>
      ),
    },
    {
      id: "position",
      header: "라인",
      headerClassName: "w-[10%]",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Image
            src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-${row.position.mainPosition}.svg`}
            alt={row.position.mainPosition}
            width={24}
            height={24}
          />
          <Image
            src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-${row.position.subPosition}.svg`}
            alt={row.position.subPosition}
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
            src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/ranked-mini-crests/${row.tier.rank}.svg`}
            alt={row.tier.rank}
            width={30}
            height={30}
          />
          <div>
            <div className="flex">
              <span>{capitalize(row.tier.rank)}</span>
              <span className="w-1"> </span>
              <span>{row.tier.tier}</span>
            </div>
            <span>{row.tier.lp}</span>
          </div>
        </div>
      ),
    },
    {
      id: "winRate",
      header: "승률",
      headerClassName: "w-[30%]",
      cell: (row) => {
        const win = row.record.winCnt;
        const lose = row.record.LoseCnt;
        const pct = calcWinRate(win, lose);

        return (
          <div className="flex items-center gap-2 w-full">
            <div className="relative flex-1 w-[160px] h-[30px] border-[#323036] rounded-[4px] bg-[#110D17] overflow-hidden">
              {/* 채워지는 부분 */}
              <div
                className="h-full bg-[#FF567980]"
                style={{ width: `${pct}%` }}
              />
              {/*왼쪽*/}
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
                {win}승
              </span>
              {/* 오른쪽 */}
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
                {lose}패
              </span>
            </div>
            {/* % */}
            <span className="ml-3 text-sm text-white">{pct}%</span>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <SubHeaderMain
        items={[
          { label: "학교 랭킹", href: "/" },
          { label: "유저 랭킹", href: "/rankings" },
        ]}
      />
      <div className="h-20"></div>
      <SearchAndFilter<SortValue, { type: "number" }>
        onSearch={setQuery}
        filterProps={{
          value: sortKey,
          onChange: (v) => setSortKey(v), // v: SortValue
          options: sortOptions, // readonly 배열 OK
          placeholder: "정렬 기준",
        }}
      />
      <RankingTable
        key={sortKey}
        data={sortedData}
        columns={columns}
        pageSize={15}
        initialPage={1}
      />
    </>
  );
}
