"use client";

import { useState } from "react";
import RankingTable from "@/components/ranking-table";
import type { Column, Tier, PaginationData, Query } from "@/types";
import FallBackImage from "@/components/fallback-img";
import Link from "next/link";
import { SUMMONER_ICON_URL } from "@/lib/api";
import SearchBox from "@/components/search-box";

import PaginationComponent from "@/components/pagination";
import { POSITION_IMG_URL, TIER_IMG_URL } from "@/lib/api";
import { capitalize } from "@/utils/capitalize";
import {} from "@/types";

/* 목데이터 */
import { mockUserRanking } from "@/mock/userRanking";

export type UserRanking = {
  userId: number;
  puuid: string;
  summonerName: string;
  summonerTag: string;
  summonerIcon: number;
  univName: string;
  tierInfo: {
    tier: Tier;
    rank: number;
    lp: number;
    mappedTier: number;
  };
  winRate: number;
  winCount: number;
  lossCount: number;
  mainPosition: string;
  subPosition: string;
};

export default function UserRankingSection() {
  const [query, setQuery] = useState<Query>({ univNameKey: "" });

  return (
    <div className="flex flex-col space-y-4 w-full">
      {/* 검색창 */}
      <div className="w-full flex justify-end">
        <SearchBox
          placeholder="유저 이름"
          onSubmit={(value) => {
            setQuery((prev) => ({
              ...prev,
              userNameKey: value || undefined,
            }));
          }}
        />
      </div>

      {/* 랭킹 테이블 query 변경 시  재요청 */}
      <RankingTable
        APIURL={"/rankings/users"}
        query={query}
        columns={
          [
            {
              id: "user",
              header: "유저명",
              headerClassName: "w-[20%]",
              cell: (row) => (
                <Link href={`/user/${row.userId}`}>
                  <div className="flex items-center gap-2">
                    <FallBackImage
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
              id: "univ",
              header: "학교명",
              headerClassName: "w-[18%]",
              cell: (row) => (
                <Link
                  href={`rankings/univ/${encodeURIComponent(
                    row.univName
                  )}/users`}
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
                <div className="flex items-center gap-2 ">
                  <FallBackImage
                    src={`${POSITION_IMG_URL}${row.mainPosition.toLowerCase()}.svg`}
                    alt={row.mainPosition}
                    width={24}
                    height={24}
                    fallbackSrc="/images/position-any-fill.png"
                  />

                  {row.mainPosition === "ANY" ? null : (
                    <FallBackImage
                      src={`${POSITION_IMG_URL}${row.subPosition.toLowerCase()}.svg`}
                      alt={row.subPosition}
                      width={24}
                      height={24}
                      fallbackSrc="/images/position-any-fill.png"
                    />
                  )}
                </div>
              ),
            },
            {
              id: "tier",
              header: "티어",
              headerClassName: "w-[14%]",
              cell: (row) => (
                <div className="flex items-center gap-2">
                  <FallBackImage
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
                    <div className="relative flex-1 w-40 h-[30px] border-[#323036] rounded-lg bg-[#110D17] overflow-hidden">
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
          ] as Column<UserRanking>[]
        }
      />
    </div>
  );
}
