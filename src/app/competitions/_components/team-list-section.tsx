"use client";

import Link from "next/link";
import FallBackImage from "@/components/fallback-img";
import { useEffect, useState } from "react";
import React from "react";
import { PaginationData } from "@/types";
import { Query } from "@/types";
import { TIER_IMG_URL } from "@/lib/api";
import { capitalize } from "@/utils/capitalize";
import PaginationComponent from "@/components/pagination";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

/* 목데이터 */
import { mockTeamList } from "@/mock/teamList";
import { mockPaginationData } from "@/mock/mockPaginationData";
import { fetchFromAPI } from "@/utils/fetcher";

export type Team = {
  teamId: number;
  teamName: string;
  univName: string;
  groupName: string;
  intro: string;
  createdAt: string;
  avgTierInfo: {
    tier: string;
    rank: string;
    lp: number;
    mappedTier: number;
    flattenString: string;
  };
  isRecommended: boolean;
};

export type TeamList = {
  content: Team[];
  page: PaginationData;
};

export default function TeamListSection() {
  /* 페이지네이션 설정 */
  const [pageState, setPageState] =
    useState<PaginationData>(mockPaginationData);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [rows, setRows] = useState<Team[]>(mockTeamList.content);

  useEffect(() => {
    let alive = true;

    const run = async () => {
      try {
        const res = (await fetchFromAPI(`/teams`, {
          page: currentPage,
        })) as TeamList | { data: TeamList };

        // fetchFromAPI 구현 따라 data 래핑 여부 처리
        const TeamList: TeamList = "content" in res ? res : (res as any).data;

        if (!alive) return;

        setRows(TeamList.content ?? []);
        setPageState(TeamList.page ?? mockPaginationData);
      } catch (e) {
        console.error("❌ [RecruitListSection] fetch error:", e);
        if (!alive) return;

        // 실패 시 목데이터로 fallback
        setRows(mockTeamList.content);
        setPageState(mockTeamList.page);
      }
    };

    run();

    return () => {
      alive = false;
    };
  }, [currentPage]);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {rows.map((data) => (
          <Link
            key={`team-${data.teamId}`}
            href={`/competitions/${data.teamId}`}
            className="flex w-full"
          >
            <div
              className="
          flex w-full 
          border-2 border-[#323036] rounded
          bg-[#25242A33] text-[#B1ACC1]
          hover:bg-[#2E2C33] transition my-2
        "
            >
              {/* 티어 사진 */}
              <div className="flex flex-col relative items-center justify-center m-3 p-3 pr-0 shrink-0">
                <FallBackImage
                  src={`${TIER_IMG_URL}${
                    data.avgTierInfo.tier.toLowerCase() ?? "unranked"
                  }.svg`}
                  alt={data.avgTierInfo.tier}
                  width={80}
                  height={80}
                />
                <span className="text-white">
                  {capitalize(data.avgTierInfo.tier.toLowerCase()) ??
                    "unranked"}{" "}
                  {data.avgTierInfo.rank ?? 0}
                </span>
                <span className="text-xs">{data.avgTierInfo.lp ?? 0}LP</span>
              </div>

              {/* 글 정보 */}
              <div className="flex flex-col px-5 py-5 flex-1 min-w-0">
                <div className="flex">
                  <span className="text-white text-2xl">{data.teamName}</span>
                  {data.isRecommended && (
                    <div className="flex bg-[#110D17] rounded justify-center items-center font-semibold p-2 ml-2">
                      <span className="bg-linear-to-r from-[#FFA1D9] to-[#FF5679] bg-clip-text text-transparent">
                        AI추천
                      </span>
                    </div>
                  )}
                </div>

                <span className="text-xs mt-2">
                  {data.univName} | {data.groupName}
                </span>

                <p className="my-2 text-sm text-white line-clamp-2 wrap-break-word">
                  {data.intro}
                </p>

                <span className="text-xs">
                  {dayjs(data.createdAt).fromNow()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 페이지네이션 */}
      <PaginationComponent
        pageData={pageState}
        onPageChange={(qs) => {
          const m = qs.match(/page=(\d+)/);
          const p = m ? Number(m[1]) : 0;
          if (!Number.isFinite(p) || p < 0) return;
          setCurrentPage(p);
        }}
      />
    </>
  );
}
