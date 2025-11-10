"use client";

import FallBackImage from "@/components/fallback-img";
import Link from "next/link";
import RankingTable from "@/components/ranking-table";
import type { Column } from "@/types";
import { SUMMONER_ICON_URL, TIER_IMG_URL } from "@/lib/api";
import { capitalize } from "@/utils/capitalize";
import { POSITION_IMG_URL } from "@/lib/api";

import { GroupMember } from "@/types";

/* 목데이터 */
import { mockGroupMembers } from "@/mock/groupMember";

export default function GroupTable({ groupId }: { groupId: number }) {
  return (
    <div className="table container">
      <RankingTable
        APIURL={`/groups/${groupId}/members`}
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
                  <span>{String(row.admissionYear).slice(2)}학번</span>
                </div>
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
                    {Math.floor(row.recordInfo.winRate)}%
                  </span>
                </div>
              ),
            },
          ] as Column<GroupMember>[]
        }
      />
    </div>
  );
}
