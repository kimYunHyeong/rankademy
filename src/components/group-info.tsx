"use client";

import Link from "next/link";
import React from "react";
import { capitalize } from "@/utils/capitalize";
import { usePathname } from "next/navigation";
import { GroupDetail, RecentCompetition } from "@/types";
import { CHAMPION_IMG_URL, TIER_IMG_URL } from "@/lib/api";
import WinRateDonut from "./win-rate-donut";
import { formatDate } from "@/utils/format-date";
import FallBackImage from "@/components/fallback-img";
import { fetchFromAPI } from "@/utils/fetcher";

export default function GroupInfo({
  groupId,
  data,
  RecentCompetitionInfo,
}: {
  groupId: number;
  data: GroupDetail;
  RecentCompetitionInfo?: RecentCompetition[];
}) {
  const pathname = usePathname();
  const competitionPath = `/groups/${groupId}/competition`;
  const isCompetitionPage = pathname === competitionPath;

  return (
    /* 컨테이너 */
    <div className="flex justify-center h-[255px]">
      {/* 첫번째 div: 그룹의 정보 표현 */}
      <div className="pl-3 w-[70%] bg-[#24192F] rounded mr-2.5 text-white overflow-hidden pr-24">
        {/* 이미지와 정보를 분리하는 div */}
        <div className="flex pt-5 justify-center gap-2 max-md:flex-wrap">
          <FallBackImage
            src={data.logoImageUrl}
            alt={data.logoImageUrl}
            width={156}
            height={156}
            className="rounded mr-5 shrink-0"
            fallbackClassName="border-[#323036] rounded bg-[#25242A]"
          />

          <div className="flex-1 min-w-0">
            <h2 className="flex items-center text-[40px] leading-tight wrap-break-word">
              {data.name}
            </h2>

            {/* 창단일, 그룹장, 평균티어 */}
            <div className="w-[90%] flex items-center justify-between text-[12px] gap-x-3 gap-y-1 max-md:w-full max-md:flex-wrap">
              <span className="wrap-break-word">
                창단일 | {formatDate(data.createdAt)}
              </span>

              <span className="wrap-break-word">
                그룹장 | {data.leader.summonerName}#{data.leader.summonerTag}
              </span>
              <div className="flex items-center">
                <span className="mr-4">평균티어 | </span>
                <div className="flex items-center gap-2">
                  <FallBackImage
                    src={`${TIER_IMG_URL}${data.avgTierInfo.tier.toLowerCase()}.svg`}
                    alt={data.avgTierInfo.tier}
                    width={30}
                    height={30}
                    className="shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex">
                      <span>
                        {capitalize(data.avgTierInfo.tier.toLowerCase())}
                      </span>
                      <span className="w-1" />
                      <span>{data.avgTierInfo.rank}</span>
                    </div>
                    <span>{data.avgTierInfo.lp}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-3" />

            <span className="text-[#B1ACC1] wrap-break-word ">
              {data.about}
            </span>
          </div>
        </div>
      </div>

      {/* 두 번째 div: 대항전 승률 표시 */}
      <div className="w-[30%]  bg-[#24192F] rounded ml-2.5 text-white p-4">
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
              winCnt={data.competitionInfo?.winCount ?? 0}
              lossCnt={data.competitionInfo?.lossCount ?? 0}
              winRate={data.competitionInfo?.winRate ?? 0}
            />
          </div>

          {/* 오른쪽 부분 */}
          <div className="w-1/2 flex flex-col  ">
            <span className="text-[24px]">
              {(data.competitionInfo?.winCount ?? 0) +
                (data.competitionInfo?.lossCount ?? 0)}
              전 {data.competitionInfo?.winRate ?? 0}승
            </span>
            {/* 가장 최근 3개 반복 */}
            <div className="flex flex-col mt-2">
              {RecentCompetitionInfo?.slice(0, 3).map((match, idx) => (
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
