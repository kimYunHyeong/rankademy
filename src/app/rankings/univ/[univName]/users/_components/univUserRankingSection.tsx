"use client";

import { useState } from "react";
import RankingTable from "@/components/ranking-table";
import type { Column, paginationData, Query } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { POSITION_IMG_URL, SUMMONER_ICON_URL, TIER_IMG_URL } from "@/lib/api";
import SearchBox from "@/components/search-box";
import { univUserRanking } from "../page";
import PaginationComponent from "@/components/pagination";
import { capitalize } from "@/utils/capitalize";
import Filter from "@/components/filter";
import { FilterValue } from "@/components/filter";

const mockOptions = {
  major: [
    { label: "컴퓨터공학과", value: "컴퓨터공학과" },
    { label: "전자공학과", value: "전자공학과" },
  ],
};

export default function UnivUserRankingSection({
  tableData,
  apiurl,
  pageData,
  univName,
}: {
  tableData: univUserRanking[];
  apiurl: string;
  pageData: paginationData;
  univName: string;
}) {
  /* 필터 */
  const [filters, setFilters] = useState<FilterValue>({
    major: "",
    admissionYear: "",
    mainPosition: "",
  });

  /* 페이지네이션 */
  const [pageState, setPageData] = useState<paginationData>(pageData);

  const [query, setQuery] = useState<Query>({
    page: 0,
    univName: univName,
    groupNameKey: "",
    major: "",
    admissionYear: "",
    mainPosition: "",
  });

  /* 테이블 컬럼 */
  const columns: Column<univUserRanking>[] = [
    {
      id: "user",
      header: "유저명",
      headerClassName: "w-[20%]",
      cell: (row) => (
        <Link href={`/user/${row.summonerName}`}>
          <div className="flex items-center gap-2">
            <Image
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
      id: "major",
      header: "전공",
      headerClassName: "w-[18%]",
      cell: (row) => (
        <div className="flex flex-col">
          <span>{row.major}</span>
          <span>{row.admissionYear}학번</span>
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
            src={`${POSITION_IMG_URL}${row.mainPosition.toLowerCase()}.svg`}
            alt={row.mainPosition}
            width={24}
            height={24}
          />
          <Image
            src={`${POSITION_IMG_URL}${row.subPosition.toLowerCase()}.svg`}
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
      cell: (row) => (
        <div className="flex items-center gap-2 w-full">
          <div className="relative flex-1 w-[160px] h-[30px] border-[#323036] rounded-[4px] bg-[#110D17] overflow-hidden">
            <div
              className="h-full bg-[#FF567980]"
              style={{ width: `${row.winRate}%` }}
            />
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
              {row.winCount}승
            </span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
              {row.lossCount}패
            </span>
          </div>
          <span className="ml-3 text-sm text-white">
            {Math.floor(row.winRate)}%
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col space-y-4 w-full">
      {/* 필터 바 | 검색 박스 */}
      <div className="w-full flex justify-between">
        <Filter
          options={mockOptions}
          value={filters}
          onChange={(v) => {
            setFilters(v);
            setQuery((prev) => ({
              ...prev,
              major: v.major,
              admissionYear: v.admissionYear,
              mainPosition: v.mainPosition,
            }));
          }}
        />
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

      {/* 랭킹 테이블 query 변경 시 재요청 */}
      <RankingTable
        apiurl={apiurl}
        query={query}
        data={tableData}
        columns={columns}
        pageSize={pageData.size}
      />

      {/* 페이지네이션 */}
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
