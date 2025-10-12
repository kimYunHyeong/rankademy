"use client";

import { RankingTable } from "@/components/ranking-table";
import Image from "next/image";
import { univUserData, Column } from "@/types";
import { capitalize } from "@/utils/capitalize";
import { calcWinRate } from "@/utils/calc-winrate";
import { univUserRanking } from "@/mock/univUserRankingData";
import GroupTableHeader from "@/components/group-table-header";
import { useMemo, useState } from "react";
import { calcRankScore } from "@/utils/calc-rank-score";
import { useParams } from "next/navigation";
import type { OptionMetaOf, OptionValueOf } from "@/types";
import Link from "next/link";

export default function Page() {
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

  // ✅ 원본 리스트
  const baseData = useMemo<univUserData[]>(
    () =>
      Array.isArray(univUserRanking) ? (univUserRanking as univUserData[]) : [],
    []
  );

  // ✅ 검색 필터
  const filteredData = useMemo<univUserData[]>(() => {
    if (!query) return baseData;
    const q = query.toLowerCase();
    return baseData.filter((row) => {
      const name = (row.user?.userName ?? "").toLowerCase();
      const tag = (row.user?.userTag ?? "").toLowerCase();
      const univ = (row.univName ?? "").toLowerCase();
      return name.includes(q) || tag.includes(q) || univ.includes(q);
    });
  }, [baseData, query]);

  // ✅ 정렬
  const sortedData = useMemo<univUserData[]>(() => {
    const num = (x: unknown) => (typeof x === "number" ? x : 0);
    const getWinRate = (row: univUserData) =>
      calcWinRate(row.record?.win ?? 0, row.record?.cnt ?? 0);
    const getRankScore = (row: univUserData) =>
      calcRankScore(row.tier?.rank, row.tier?.lp, row.tier?.tier);

    const out = [...filteredData].sort((a, b) => {
      let diff = 0;
      if (sortKey === "rank") diff = getRankScore(b) - getRankScore(a);
      else if (sortKey === "winrate") diff = getWinRate(b) - getWinRate(a);
      else diff = num((b as any)[sortKey]) - num((a as any)[sortKey]);

      if (diff !== 0) return diff;
      const nameDiff = (a.user.userName ?? "").localeCompare(
        b.user.userName ?? ""
      );
      if (nameDiff !== 0) return nameDiff;
      return (a.univName ?? "").localeCompare(b.univName ?? "");
    });
    return out;
  }, [filteredData, sortKey]);
  const columns: Column<univUserData>[] = [
    {
      id: "user",
      header: "유저명",
      headerClassName: "w-[20%]",
      cell: (row) => (
        <Link href={`/user/${row.puuid}`}>
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
        </Link>
      ),
    },
    {
      id: "major",
      header: "전공",
      headerClassName: "w-[18%]",
      cell: (row) => (
        <div className="flex flex-col">
          <span>{row.major.major}</span>
          <span>{row.major.admissionYear}학번</span>
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
            src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-${row.position.main}.svg`}
            alt={row.position.main}
            width={24}
            height={24}
          />
          <Image
            src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-${row.position.sub}.svg`}
            alt={row.position.sub}
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
              <span className="w-1" />
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
        const win = row.record.win;
        const cnt = row.record.cnt;
        const pct = calcWinRate(win, cnt);

        return (
          <div className="flex items-center gap-2 w-full">
            <div className="relative flex-1 w-[160px] h-[30px] border-[#323036] rounded-[4px] bg-[#110D17] overflow-hidden">
              <div
                className="h-full bg-[#FF567980]"
                style={{ width: `${pct}%` }}
              />
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
                {win}승
              </span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
                {cnt - win}패
              </span>
            </div>
            <span className="ml-3 text-sm text-white">{pct}%</span>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-3">
        <span>그룹원 관리</span>
      </div>
      <div className="h-20"></div>

      <div className="table container">
        <GroupTableHeader memberCnt={univUserRanking.length} groupId="1" />
        <RankingTable data={sortedData} columns={columns} />
      </div>
    </>
  );
}
