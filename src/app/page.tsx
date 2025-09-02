"use client";

// app/page.tsx
import univRanking from "@/mock/univdata.json";
import { RankingTable } from "@/components/ranking-table";
import { UnivData, Column } from "@/types";
import SubHeaderMain from "@/components/sub-header-main";
import SearchAndFilter from "@/components/search-and-filter";
import Image from "next/image";

export default function Home() {
  /*   const response = await fetch("@/mock/univdata");
  const univRanking: UnivData[] = await response.json();

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  } */

  const columns: Column<UnivData>[] = [
    {
      id: "univ",
      header: "학교명",
      headerClassName: "w-[42%]",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Image
            src={`/univ-emblem/${row.univName}.png`}
            alt={row.univName}
            width={30}
            height={30}
            className="rounded-full"
          />
          <span>{row.univName}</span>
        </div>
      ),
    },
    {
      id: "students",
      header: "학생 수",
      headerClassName: "w-[10%]",
      accessorKey: "studentCnt",
    },
    {
      id: "compCount",
      header: "대항전 진행",
      headerClassName: "w-[10%]",
      accessorKey: "competitionCnt",
    },
    {
      id: "compWin",
      header: "대항전 승리",
      headerClassName: "w-[10%]",
      accessorKey: "competitionWinCnt",
    },
    {
      id: "ranker",
      header: "랭커",
      headerClassName: "w-[20%]",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${row.ranker.icon}.png`}
            alt={row.ranker.icon}
            width={30}
            height={30}
          />
          <span>{row.ranker.username}</span>
          <span>{row.ranker.userTag}</span>
        </div>
      ),
    },
  ];

  return (
    <>
      <SubHeaderMain />
      <SearchAndFilter />
      <RankingTable
        data={univRanking}
        columns={columns}
        pageSize={15}
        initialPage={1}
      />
    </>
  );
}
