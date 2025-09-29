"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { calcWinRate } from "@/utils/calc-winrate";
import { capitalize } from "@/utils/capitalize";
import { univGroupData } from "@/types";
import { usePathname } from "next/navigation";

export default function WinRateDonut({
  cnt = 0,
  win = 0,
}: {
  cnt: number;
  win: number;
}) {
  const rateRaw = calcWinRate(win ?? 0, cnt ?? 0); // 0~100
  const rate = Number.isFinite(rateRaw)
    ? Math.max(0, Math.min(100, rateRaw))
    : 0;
  const deg = (rate / 100) * 360;

  const bg = `conic-gradient(
  from 0deg,
  #110D17 0deg ${360 - deg}deg,
  #FF5679 ${360 - deg}deg 360deg
)`;

  return (
    <div
      className="relative rounded-full"
      style={{
        width: 120,
        height: 120,
        background: bg,
        border: `2px solid #323036`,
      }}
      aria-label={`승률 ${Math.round(rate)}%`}
      role="img"
    >
      <div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          inset: 16,
          background: "#24192F",
          border: `2px solid #323036`,
        }}
      >
        <span className="text-white">{Math.round(rate)}%</span>
      </div>
    </div>
  );
}

export function GroupInfo({ group }: { group: univGroupData }) {
  const pathname = usePathname();

  const competitionPath = `/groups/${group.group.id}/competition`;

  const isCompetitionPage = pathname === competitionPath;

  return (
    /* 컨테이너 */
    <div className="flex justify-center mt-[5%] h-[255px]">
      {/* 첫번째 div: 그룹의 정보 표현 */}
      <div className="pl-3 w-[70%] bg-[#24192F] rounded mr-[10px] text-white overflow-hidden">
        {/* 이미지와 정보를 분리하는 div */}
        <div className="flex pt-[20px] justify-center gap-2 max-md:flex-wrap">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${group.group.icon}.png`}
            alt={group.group.icon}
            width={156}
            height={156}
            className="rounded-2xl mr-[20px] shrink-0"
          />

          <div className="flex-1 min-w-0">
            <h2 className="flex items-center text-[40px] leading-tight break-words">
              {group.group.name}
            </h2>

            {/* 창단일, 그룹장, 평균티어 */}
            <div className="w-[80%] flex items-center justify-between text-[12px] gap-x-3 gap-y-1 max-md:w-full max-md:flex-wrap">
              <span className="break-words">창단일 |{group.createdAt}</span>
              <span className="break-words">
                그룹장 | {group.groupLeader.userName}
                {group.groupLeader.userTag}
              </span>
              <div className="flex items-center">
                <span className="mr-4">평균티어 | </span>
                <div className="flex items-center gap-2">
                  <Image
                    src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/ranked-mini-crests/${"gold"}.svg`}
                    alt={group.tier.rank}
                    width={30}
                    height={30}
                    className="shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex">
                      <span>{capitalize(group.tier.rank)}</span>
                      <span className="w-1" />
                      <span>{group.tier.tier}</span>
                    </div>
                    <span>{group.tier.lp}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-3" />

            <span className="text-[#B1ACC1] break-words">
              {group.description}
            </span>
          </div>
        </div>
      </div>

      {/* 두 번째 div: 대항전 승률 표시 */}
      <div className="w-[30%]  bg-[#24192F] rounded ml-[10px] text-white p-4">
        {/* 대항전 전적, 더보기 */}
        <div className="flex justify-between items-center h-[15%]">
          <span className="ml-5">대항전 전적</span>
          <Link
            href={competitionPath}
            className={`text-[#B1ACC1] text-[12px] ${
              isCompetitionPage ? "hidden" : ""
            }`}
          >
            더보기
          </Link>
        </div>

        {/* 전적 표시 */}
        <div className="flex items-center h-[85%]">
          {/* 왼쪽 그래프 */}
          <div className="w-1/2 flex items-center justify-center">
            <WinRateDonut
              cnt={group.competition.cnt}
              win={group.competition.win}
            />
          </div>

          {/* 오른쪽 부분 */}
          <div className="w-1/2 flex flex-col  ">
            <span className="text-[24px]">
              {group.competition.cnt}전 {group.competition.win}승
            </span>
            {/* 가장 최근 3개 반복 */}
            <div className="flex flex-col mt-2">
              {group.latestMatch.slice(0, 3).map((match, idx) => (
                <div
                  key={idx}
                  className="text-[#B1ACC1] flex justify-between py-1 "
                >
                  <span>
                    vs
                    <Link
                      href={`/rankings/univ/${encodeURIComponent(
                        "서울과학기술대학교"
                      )}/groups/${match.oppose.id}`}
                    >
                      {match.oppose.name}
                    </Link>
                  </span>
                  <span
                    className={
                      match.result === "win"
                        ? "text-[#FF5679]"
                        : "text-[#B1ACC1]"
                    }
                  >
                    {match.result === "win" ? "승리" : "패배"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
