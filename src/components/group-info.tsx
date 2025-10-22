"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { capitalize } from "@/utils/capitalize";
import { usePathname } from "next/navigation";
import { GroupDetail, RecentCompetition } from "@/app/groups/[groupId]/page";
import { CHAMPION_IMG_URL, TIER_IMG_URL } from "@/lib/api";

export default function WinRateDonut({
  winCnt = 0,
  lossCnt = 0,
  winRate = 0,
}: {
  winCnt: number;
  lossCnt: number;
  winRate: number;
}) {
  const rate = Number.isFinite(winRate)
    ? Math.max(0, Math.min(100, winRate))
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

function GroupInfo({
  groupDetailData,
  recentCompetitionData,
}: {
  groupDetailData: GroupDetail;
  recentCompetitionData: RecentCompetition[];
}) {
  const pathname = usePathname();
  const competitionPath = `/groups/${groupDetailData.groupId}/competition`;
  const isCompetitionPage = pathname === competitionPath;

  return (
    /* 컨테이너 */
    <div className="flex justify-center h-[255px]">
      {/* 첫번째 div: 그룹의 정보 표현 */}
      <div className="pl-3 w-[70%] bg-[#24192F] rounded mr-[10px] text-white overflow-hidden pr-24">
        {/* 이미지와 정보를 분리하는 div */}
        <div className="flex pt-[20px] justify-center gap-2 max-md:flex-wrap">
          <Image
            src={`${CHAMPION_IMG_URL}${groupDetailData.logoImageUrl}.png`}
            alt={groupDetailData.logoImageUrl}
            width={156}
            height={156}
            className="rounded-2xl mr-[20px] shrink-0"
          />

          <div className="flex-1 min-w-0">
            <h2 className="flex items-center text-[40px] leading-tight break-words">
              {groupDetailData.name}
            </h2>

            {/* 창단일, 그룹장, 평균티어 */}
            <div className="w-[90%] flex items-center justify-between text-[12px] gap-x-3 gap-y-1 max-md:w-full max-md:flex-wrap">
              <span className="break-words">
                창단일 | {groupDetailData.createdAt}
              </span>
              <span className="break-words">
                그룹장 | {groupDetailData.leader.summonerName}#
                {groupDetailData.leader.summonerTag}
              </span>
              <div className="flex items-center">
                <span className="mr-4">평균티어 | </span>
                <div className="flex items-center gap-2">
                  <Image
                    src={`${TIER_IMG_URL}${groupDetailData.avgTierInfo.tier.toLowerCase()}.svg`}
                    alt={groupDetailData.avgTierInfo.tier}
                    width={30}
                    height={30}
                    className="shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex">
                      <span>
                        {capitalize(groupDetailData.avgTierInfo.tier)}
                      </span>
                      <span className="w-1" />
                      <span>{groupDetailData.avgTierInfo.rank}</span>
                    </div>
                    <span>{groupDetailData.avgTierInfo.lp}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-3" />

            <span className="text-[#B1ACC1] break-words ">
              {groupDetailData.about}
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
              winCnt={groupDetailData.competitionInfo.winCount}
              lossCnt={groupDetailData.competitionInfo.lossCount}
              winRate={groupDetailData.competitionInfo.winRate}
            />
          </div>

          {/* 오른쪽 부분 */}
          <div className="w-1/2 flex flex-col  ">
            <span className="text-[24px]">
              {groupDetailData.competitionInfo.winCount +
                groupDetailData.competitionInfo.lossCount}
              전 {groupDetailData.competitionInfo.winCount}승
            </span>
            {/* 가장 최근 3개 반복 */}
            <div className="flex flex-col mt-2">
              {recentCompetitionData.slice(0, 3).map((match, idx) => (
                <div
                  key={idx}
                  className="text-[#B1ACC1] flex justify-between py-1 "
                >
                  <span>
                    vs{" "}
                    <Link
                      /* 그룹 학교 이름 넘겨줘야함 */
                      href={`/groups/${match.groupId}`}
                    >
                      {match.groupName}
                    </Link>
                  </span>
                  <span
                    className={
                      match.isWin ? "text-[#FF5679]" : "text-[#B1ACC1]"
                    }
                  >
                    {match.isWin ? "승리" : "패배"}
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
