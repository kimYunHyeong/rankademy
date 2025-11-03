"use client";

import Link from "next/link";
import SubHeaderMain from "@/components/sub-header-main";
import FallBackImage from "@/components/fallback-img";
import { useState } from "react";
import React from "react";
import { PaginationData } from "@/types";
import { Query } from "@/types";
import { ScrimTeam } from "../page";
import { CHAMPION_IMG_URL, TIER_IMG_URL } from "@/lib/api";
import { capitalize } from "@/utils/capitalize";
import PaginationComponent from "@/components/pagination";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function ScrimTeamListSection({
  data,
  pageData,
}: {
  data: ScrimTeam[];
  pageData: PaginationData;
}) {
  const [pageState, setPageData] = useState<PaginationData>(pageData);

  const [query, setQuery] = useState<Query>({ page: 0, univNameKey: "" });
  return (
    <>
      {/* 스크림 모집글 */}
      <div className="flex flex-col justify-center items-center">
        {data.map((data) => (
          <Link
            key={`team-${data.scrimTeamId}`}
            href={`/scrims/${data.scrimTeamId}`}
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
                  src={`${TIER_IMG_URL}${data.avgTierInfo.tier.toLowerCase()}.svg`}
                  alt={data.avgTierInfo.tier.toLowerCase()}
                  width={80}
                  height={80}
                />
                <span className="text-white">
                  {capitalize(data.avgTierInfo.tier.toLowerCase())}
                  {data.avgTierInfo.rank}
                </span>
                <span className="text-xs">{data.avgTierInfo.lp}LP</span>
              </div>

              {/* 글 정보 */}
              <div className="flex flex-col px-5 py-5 flex-1 min-w-0">
                <div className="flex">
                  <span className="text-white text-2xl">
                    {data.scrimTeamName}
                  </span>
                  {data.isRecommended && (
                    <div className="flex bg-[#110D17] rounded justify-center items-center font-semibold p-2 ml-2">
                      <span className="bg-linear-to-r from-[#FFA1D9] to-[#FF5679] bg-clip-text text-transparent">
                        AI추천
                      </span>
                    </div>
                  )}
                </div>

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
          const p = Number((qs.split("=").pop() || "1").trim());
          if (!Number.isFinite(p) || p < 1) return;
          setQuery((prev) => ({ ...prev, page: p }));
        }}
      />
    </>
  );
}
