"use client";

import Image from "next/image";
import Link from "next/link";
import RankingTable from "@/components/ranking-table";
import type { Column } from "@/types";
import { SUMMONER_ICON_URL, TIER_IMG_URL } from "@/lib/api";
import { capitalize } from "@/utils/capitalize";
import { POSITION_IMG_URL } from "@/lib/api";
import GroupTableHeader from "./group-table-header";
import { mockGroupMembers } from "@/mock/groupMember";
import { GroupMember } from "@/app/groups/[groupId]/page";
import PaginationComponent from "./pagination";
import { useState } from "react";
import { paginationData } from "@/types";
import { Query } from "@/types";

export default function GroupTable({
  groupId,
  isLeader,
  isJoined,
  memberCnt,
  capacity,
  groupMember,
  memberApiUrl,
  pageData,
}: {
  groupId: number;
  isLeader: boolean;
  isJoined: boolean;
  memberCnt: number;
  capacity: number;
  groupMember: GroupMember[];
  memberApiUrl: string;
  pageData: paginationData;
}) {
  /* 페이지네이션 */
  const [pageState, setPageData] = useState<paginationData>(pageData);
  const [query, setQuery] = useState<Query>({ page: 0, univNameKey: "" });

  /* 테이블 데이터 */
  const columns: Column<GroupMember>[] = [
    {
      id: "user",
      header: "유저명",
      headerClassName: "w-[20%]",
      cell: (row) => (
        <Link href={`/user/${row.summonerName}`}>
          <div className="flex items-center gap-2">
            <Image
              /*summonerIcon으로 바꿔야할 듯 */
              src={`${SUMMONER_ICON_URL}${row.summonerIconId}.png`}
              alt={row.summonerIconId.toString()}
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
          <div className="relative flex-1 w-40 h-[30px] border-[#323036] rounded bg-[#110D17] overflow-hidden">
            <div
              className="h-full bg-[#FF567980]"
              style={{ width: `${row.recordInfo.winRate}%` }}
            />
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
              {row.recordInfo.winCount}승
            </span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
              {row.recordInfo.lossCount}패
            </span>
          </div>
          <span className="ml-3 text-sm text-white">
            {row.recordInfo.winRate}%
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="table container">
      <GroupTableHeader
        groupId={groupId}
        memberCnt={memberCnt}
        capacity={capacity}
        isJoined={isJoined}
        isLeader={isLeader}
      />

      <RankingTable
        apiurl={memberApiUrl}
        data={groupMember}
        columns={columns}
        pageSize={10}
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
