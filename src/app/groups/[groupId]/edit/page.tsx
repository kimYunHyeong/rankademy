"use client";

import Image from "next/image";
import { univUserData, Column } from "@/types";
import { capitalize } from "@/utils/capitalize";

import Link from "next/link";

export default function Page() {
  const columns: Column<univUserData>[] = [
    {
      id: "user",
      header: "유저명",
      headerClassName: "w-[20%]",
      cell: (row) => (
        <Link href={`/user/${row.puuid}`}>
          <div className="flex items-center gap-2">
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${row.user.icon}.png`}
              alt={row.user.icon}
              width={30}
              height={30}
            />
            <span>{row.user.userName}</span>
            <span>{row.user.userTag}</span>
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
          <span>{row.major.major}</span>
          <span>{row.major.admissionYear}학번</span>
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
            src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-${row.position.main}.svg`}
            alt={row.position.main}
            width={24}
            height={24}
          />
          <Image
            src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-${row.position.sub}.svg`}
            alt={row.position.sub}
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
            src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/ranked-mini-crests/${row.tier.rank}.svg`}
            alt={row.tier.rank}
            width={30}
            height={30}
          />
          <div>
            <div className="flex">
              <span>{capitalize(row.tier.rank)}</span>
              <span className="w-1" />
              <span>{row.tier.tier}</span>
            </div>
            <span>{row.tier.lp}</span>
          </div>
        </div>
      ),
    },
    {
      id: "winRate",
      header: "승률",
      headerClassName: "w-[30%]",
      cell: (row) => {
        const win = row.record.win;
        const cnt = row.record.cnt;
        const pct = 0;

        return (
          <div className="flex items-center gap-2 w-full">
            <div className="relative flex-1 w-40 h-[30px] border-[#323036] rounded-lg bg-[#110D17] overflow-hidden">
              <div
                className="h-full bg-[#FF567980]"
                style={{ width: `${pct}%` }}
              />
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
                {win}승
              </span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
                {cnt - win}패
              </span>
            </div>
            <span className="ml-3 text-sm text-white">{pct}%</span>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-3">
        <span>그룹원 관리</span>
      </div>
      <div className="h-20"></div>

      <div className="table container">
        {/*  <GroupTableHeader memberCnt={univUserRanking.length} groupId="1" />
        <RankingTable data={sortedData} columns={columns} /> */}
      </div>
    </>
  );
}
