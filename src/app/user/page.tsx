"use client";

import Link from "next/link";
import Image from "next/image";

/* import { RankingTable } from "@/components/ranking-table"; */

import { capitalize } from "@/utils/capitalize";

import type { univUserData, Column } from "@/types";

import { calcWinRate } from "@/utils/calc-winrate";

export default function Page() {
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
            <div className="relative flex-1 w-40 h-[30px] border-[#323036] rounded-lg bg-[#110D17] overflow-hidden">
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
      {/* 상단 고정 헤더 */}
      {/* <SubHeaderUnivRanking
        univName={univName}
        univNameEn="SEOUL NATIONAL UNIVERSITY OF SCIENCE AND TECHNOLOGY"
        logoSrc={`/univ-emblem/${univName}.png`}
        items={[
          { label: "그룹 랭킹", href: `/rankings/univ/${univName}/groups` },
          { label: "유저 랭킹", href: `/rankings/univ/${univName}/users` },
        ]}
        headerHeight={260}
      /> */}

      <div className=" mx-auto px-6">
        {/*  <SearchAndFilter<SortValue, SortMeta>
          onSearch={setQuery}
          filterProps={{
            value: sortKey,
            onChange: (v) => setSortKey(v),
            options: sortOptions,
            placeholder: "정렬 기준",
          }}
        />

        <RankingTable key={sortKey} data={sortedData} columns={columns} /> */}
      </div>
    </>
  );
}
