"use client";

import { useMemo, useState } from "react";
import { RankingTable } from "@/components/ranking-table";
import type { Column } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { POSITION_IMG_URL, SUMMONER_ICON_URL, TIER_IMG_URL } from "@/lib/api";
import SearchBox from "@/components/search-box";
import { userRanking } from "@/app/rankings/page";
import { capitalize } from "@/utils/capitalize";

export default function TableAndSearchUserRanking({
  data,
}: {
  data: userRanking[];
}) {
  /* 테이블 데이터 */
  const columns: Column<userRanking>[] = [
    {
      id: "user",
      header: "유저명",
      headerClassName: "w-[20%]",
      cell: (row) => (
        <Link href={`/user/${row.userId}`}>
          <div className="flex items-center gap-2">
            <Image
              src={`${SUMMONER_ICON_URL}${row.summonerIcon}.png`}
              alt={row.summonerIcon.toString()}
              width={30}
              height={30}
              className="rounded"
            />
            <span>{row.summonerName}</span>
            <span>{row.summonerTag}</span>
          </div>
        </Link>
      ),
    },
    {
      id: "univ",
      header: "학교명",
      headerClassName: "w-[18%]",
      cell: (row) => (
        <Link
          href={`rankings/univ/${encodeURIComponent(row.univName)}/users`}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
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
            src={`${POSITION_IMG_URL}${row.mainPosition.toLocaleLowerCase()}.svg`}
            alt={row.mainPosition}
            width={24}
            height={24}
          />
          <Image
            src={`${POSITION_IMG_URL}${row.subPosition.toLocaleLowerCase()}.svg`}
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
      cell: (row) => {
        return (
          <div className="flex items-center gap-2 w-full">
            <div className="relative flex-1 w-[160px] h-[30px] border-[#323036] rounded-[4px] bg-[#110D17] overflow-hidden">
              {/* 채워지는 부분 */}
              <div
                className="h-full bg-[#FF567980]"
                style={{ width: `${row.winRate}%` }}
              />
              {/*왼쪽*/}
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
                {row.winCount}승
              </span>
              {/* 오른쪽 */}
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
                {row.lossCount}패
              </span>
            </div>
            {/* % */}
            <span className="ml-3 text-sm text-white">
              {Math.floor(row.winRate)}%
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="w-full flex justify-end">
        <SearchBox
          queryKey="userNameKey"
          width={300}
          placeholder="학교 이름"
          syncToUrl
          onSubmit={() => {}}
        />
      </div>

      <RankingTable data={data} columns={columns} />
    </div>
  );
}
