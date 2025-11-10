"use client";

import { useState } from "react";
import RankingTable from "@/components/ranking-table";
import type { Column, Query } from "@/types";
import FallBackImage from "@/components/fallback-img";
import Link from "next/link";
import { SUMMONER_ICON_URL } from "@/lib/api";
import SearchBox from "@/components/search-box";

export type UnivRanking = {
  univName: string;
  totalUserCnt: number;
  competitionTotalCnt: number;
  competitionWinCnt: number;
  rankerDto: {
    id: number;
    summonerName: string;
    summonerTag: string;
    summonerIcon: number;
  };
};

/* 목데이터 */
import { mockUnivRanking } from "@/mock/univRanking";

export default function UnivRankingSection() {
  const [query, setQuery] = useState<Query>({ univNameKey: "" });

  return (
    <div className="flex flex-col space-y-4 w-full">
      {/* 검색창 */}
      <div className="w-full flex justify-end">
        <SearchBox
          placeholder="학교 이름"
          onSubmit={(value) => {
            setQuery({
              univNameKey: value || "",
            });
          }}
        />
      </div>

      {/* 랭킹 테이블 */}
      <RankingTable
        APIURL={"/rankings/univ"}
        query={query}
        columns={
          [
            {
              id: "univ",
              header: "학교명",
              headerClassName: "w-[40%]",
              cell: (row) => (
                <Link
                  href={`/rankings/univ/${encodeURIComponent(
                    row.univName
                  )}/groups`}
                  className="flex items-center gap-2"
                >
                  <FallBackImage
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
              id: "students",
              header: "학생 수",
              headerClassName: "w-[10%]",
              accessorKey: "totalUserCnt",
            },
            {
              id: "competitionCount",
              header: "대항전 진행",
              headerClassName: "w-[10%]",
              accessorKey: "competitionTotalCnt",
            },
            {
              id: "competitionWin",
              header: "대항전 승리",
              headerClassName: "w-[10%]",
              accessorKey: "competitionWinCnt",
            },
            {
              id: "ranker",
              header: "랭커",
              headerClassName: "w-[20%]",
              cell: (row) => (
                <Link href={`/user/${row.rankerDto.id}`}>
                  <div className="flex items-center gap-2">
                    <FallBackImage
                      src={`${SUMMONER_ICON_URL}${row.rankerDto.summonerIcon}.png`}
                      alt={row.rankerDto.summonerIcon.toString()}
                      width={30}
                      height={30}
                      className="rounded"
                    />
                    <span>
                      {row.rankerDto.summonerName}#{row.rankerDto.summonerTag}
                    </span>
                  </div>
                </Link>
              ),
            },
          ] as Column<UnivRanking>[]
        }
      />
    </div>
  );
}
