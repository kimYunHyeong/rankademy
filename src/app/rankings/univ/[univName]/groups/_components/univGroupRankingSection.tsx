"use client";

import { useState } from "react";
import RankingTable from "@/components/ranking-table";
import type { Column, PaginationData, Query } from "@/types";
import FallBackImage from "@/components/fallback-img";
import Link from "next/link";
import { CHAMPION_IMG_URL, SUMMONER_ICON_URL, TIER_IMG_URL } from "@/lib/api";
import SearchBox from "@/components/search-box";
import { univGroupRanking } from "../page";
import PaginationComponent from "@/components/pagination";
import { capitalize } from "@/utils/capitalize";

export default function UnivGroupRankingSection({
  tableData,
  apiurl,
  pageData,
  univName,
}: {
  tableData: univGroupRanking[];
  apiurl: string;
  pageData: PaginationData;
  univName: string;
}) {
  const [pageState, setPageData] = useState<PaginationData>(pageData);

  const [query, setQuery] = useState<Query>({
    page: 0,
    univName: univName,
    groupNameKey: "",
    major: "",
    admissionYear: "",
    mainPosition: "",
  });

  /* 테이블 컬럼 */
  const columns: Column<univGroupRanking>[] = [
    {
      id: "group",
      header: "그룹명",
      headerClassName: "w-[21%]",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/groups/${row.groupId}`}
            className="flex items-center gap-2 transition"
          >
            <FallBackImage
              src={row.logoImageUrl}
              alt={row.logoImageUrl}
              width={30}
              height={30}
              className="rounded"
              fallbackClassName="border-[#323036] rounded bg-[#25242A]"
            />
            <span>{row.name}</span>
          </Link>
        </div>
      ),
    },
    {
      id: "groupMemberCnt",
      header: "그룹 인원",
      headerClassName: "w-[10%]",
      cell: (row) => <span>{row.memberCnt}</span>,
    },
    {
      id: "competitionCnt",
      header: "대항전 진행",
      headerClassName: "w-[10%]",
      cell: (row) => <span>{row.competitionTotalCnt}</span>,
    },
    {
      id: "competitionWinCnt",
      header: "대항전 승리",
      headerClassName: "w-[10%]",
      cell: (row) => <span>{row.competitionWinCnt}</span>,
    },
    {
      id: "tierAvg",
      header: "평균 티어",
      headerClassName: "w-[20%]",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <FallBackImage
            src={`${TIER_IMG_URL}${row.avgTierInfo.tier.toLowerCase()}.svg`}
            alt={row.avgTierInfo.tier}
            width={30}
            height={30}
          />
          <div>
            <div className="flex">
              <span>{capitalize(row.avgTierInfo.tier.toLowerCase())}</span>
              <span className="w-1"> </span>
              <span>{row.avgTierInfo.rank}</span>
            </div>
            <span>{row.avgTierInfo.lp}</span>
          </div>
        </div>
      ),
    },
    {
      id: "groupLeader",
      header: "그룹장",
      headerClassName: "w-[21%]",
      cell: (row) => (
        <Link href={`/user/${row.leader.id}`}>
          <div className="flex items-center gap-2">
            <FallBackImage
              src={`${SUMMONER_ICON_URL}${row.leader.summonerIcon}.png`}
              alt={row.leader.summonerIcon.toString()}
              width={30}
              height={30}
              className="rounded"
            />
            <span>
              {row.leader.summonerName}#{row.leader.summonerTag}
            </span>
          </div>
        </Link>
      ),
    },
  ];

  return (
    <div className="flex flex-col space-y-4 w-full">
      {/* 검색창 */}
      <div className="w-full flex justify-end">
        <SearchBox
          placeholder="그룹 이름"
          onSubmit={(value) => {
            setQuery((prev) => ({
              ...prev,
              groupNameKey: value || undefined,
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
