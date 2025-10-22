"use client";

import { RankingTable } from "@/components/ranking-table";
import type { Column } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { SUMMONER_ICON_URL } from "@/lib/api";
import SearchBox from "@/components/search-box";
import { univRanking } from "../app/page";

export default function TableAndSearchMain({ data }: { data: univRanking[] }) {
  const columns: Column<univRanking>[] = [
    {
      id: "univ",
      header: "학교명",
      headerClassName: "w-[40%]",
      cell: (row) => (
        <Link
          href={`/rankings/univ/${encodeURIComponent(row.univName)}/groups`}
          className="flex items-center gap-2"
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
            <Image
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
  ];

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="w-full flex justify-end">
        <SearchBox
          queryKey="univNameKey"
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
