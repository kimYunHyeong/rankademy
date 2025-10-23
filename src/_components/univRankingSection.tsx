"use client";

import { useState } from "react";
import RankingTable from "@/components/ranking-table";
import type { Column, pageData } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { SUMMONER_ICON_URL } from "@/lib/api";
import SearchBox from "@/components/search-box";
import { univRanking } from "../app/page";
import PaginationComponent from "@/components/pagination";

type QueryValue = string | number | boolean | null | undefined;
type Query = Record<string, QueryValue>;

export default function UnivRankingSection({
  tableData,
  apiurl,
  pageData,
}: {
  tableData: univRanking[];
  apiurl: string;
  pageData: pageData;
}) {
  const [tableState, setTableData] = useState<univRanking[]>(tableData);
  const [pageState, setPageData] = useState<pageData>(pageData);

  const [query, setQuery] = useState<Query>({ page: 0, univNameKey: "" });

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
      {/* 🔍 검색창 */}
      <div className="w-full flex justify-end">
        <SearchBox
          placeholder="학교 이름으로 검색"
          onSubmit={(value) => {
            setQuery((prev) => ({
              ...prev,
              univNameKey: value || undefined,
            }));
          }}
        />
      </div>

      {/* 🏫 랭킹 테이블 (query 변경 시 내부에서 자동 재요청) */}
      <RankingTable
        apiurl={apiurl}
        query={query}
        data={tableData}
        columns={columns}
        pageSize={pageData.size}
      />

      {/* 📄 페이지네이션 */}
      <PaginationComponent
        pageData={pageState}
        onPageChange={(qs) => {
          const p = Number((qs.split("=").pop() || "1").trim());
          if (!Number.isFinite(p) || p < 1) return;
          setQuery((prev) => ({ ...prev, page: p }));
        }}
      />
    </div>
  );
}
