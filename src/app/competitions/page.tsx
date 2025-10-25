"use client";

import Link from "next/link";
import SubHeaderMain from "@/components/sub-header-main";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";
import { capitalize } from "@/utils/capitalize";

type Team = {
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
  };
  isRecommended: true;
};

type ScrimTeamsResponse = {
  totalCount: number;
  teams: Team[];
};

const mock = {
  totalCount: 15,
  teams: [
    {
      teamId: 1,
      teamName: "Rankademy",
      univName: "서울과학기술대학교",
      groupName: "총학생회",
      intro:
        "stringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstring",
      createdAt: "2025-10-12T06:10:03.856Z",
      avgTierInfo: {
        tier: "unranked",
        rank: "1",
        lp: 0,
        mappedTier: 0,
      },
      isRecommended: true,
    },
    {
      teamId: 2,
      teamName: "Rankademy",
      univName: "서울과학기술대학교",
      groupName: "총학생회",
      intro:
        "stringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstring",
      createdAt: "2025-10-12T06:10:03.856Z",
      avgTierInfo: {
        tier: "unranked",
        rank: "1",
        lp: 0,
        mappedTier: 0,
      },
      isRecommended: true,
    },
    {
      teamId: 3,
      teamName: "Rankademy",
      univName: "서울과학기술대학교",
      groupName: "총학생회",
      intro:
        "stringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstring",
      createdAt: "2025-10-12T06:10:03.856Z",
      avgTierInfo: {
        tier: "unranked",
        rank: "1",
        lp: 0,
        mappedTier: 0,
      },
      isRecommended: true,
    },
    {
      teamId: 4,
      teamName: "Rankademy",
      univName: "서울과학기술대학교",
      groupName: "총학생회",
      intro:
        "stringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstring",
      createdAt: "2025-10-12T06:10:03.856Z",
      avgTierInfo: {
        tier: "unranked",
        rank: "1",
        lp: 0,
        mappedTier: 0,
      },
      isRecommended: false,
    },
  ],
} as ScrimTeamsResponse;

export default function Page() {
  const data = mock;

  // ✅ 페이지네이션 상태
  const pageSize = 15; // 한 페이지에 보여줄 행 수
  const [page, setPage] = React.useState(1);

  const total = data.totalCount;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pageData = data.teams.slice(start, end);

  return (
    <>
      {/* 대항전/스크림 선택 */}
      <SubHeaderMain
        items={[
          { label: "대항전", href: "/competitions" },
          { label: "스크림", href: "/scrims" },
        ]}
        className="my-3"
      />

      <div className="h-8"></div>

      {/* 내 대항전/팀 생성 */}
      <div className="flex items-center justify-end my-5">
        <Link
          href="competitions/me"
          className="flex items-center justify-center 
      border border-[#323036] 
      w-[120px] h-11
      text-[#B1ACC1] rounded 
      bg-[#25242A33] text-center mt-10 mr-2"
        >
          내 대항전
        </Link>

        <Link
          href={`competitions/create`}
          className="flex items-center justify-center 
      border border-[#323036] 
      w-[120px] h-11
      text-[#B1ACC1] rounded 
      bg-[#25242A33] text-center mt-10"
        >
          팀 생성
        </Link>
      </div>

      {/* 대항전 모집글 */}
      <div className="flex flex-col justify-center items-center">
        {pageData.map((data) => (
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
                <Image
                  src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/ranked-mini-crests/${data.avgTierInfo.tier}.svg`}
                  alt={data.avgTierInfo.tier}
                  width={80}
                  height={80}
                />
                <span className="text-white">
                  {capitalize(data.avgTierInfo.tier)} {data.avgTierInfo.rank}
                </span>
                <span className="text-xs">{data.avgTierInfo.lp}LP</span>
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

                <span className="text-xs">{data.createdAt}분 전</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="w-full mt-4">
        <Pagination className="w-full">
          <PaginationContent className="flex w-full justify-between items-center">
            {/* 왼쪽: 이전 버튼 */}
            <div>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className={`rounded-sm w-7 h-7 px-3 py-1 text-sm font-medium transition-colors
                    border border-[#323036] text-[#B1ACC1]
                    hover:bg-[#FF5679] hover:text-[#110D17] hover:border-none
                    ${page === 1 ? "pointer-events-none opacity-50" : ""}`}
                />
              </PaginationItem>
            </div>

            {/* 가운데: 페이지 숫자 */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={page === i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`w-7 h-7 rounded-sm px-3 py-1 text-sm font-medium transition-colors
                      ${
                        page === i + 1
                          ? "bg-[#FF5679] text-[#110D17] border-none"
                          : "border border-[#323036] text-[#B1ACC1] hover:bg-[#FF5679] hover:text-[#110D17] hover:border-none"
                      }`}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </div>

            {/* 오른쪽: 다음 버튼 */}
            <div>
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className={`rounded-sm w-7 h-7 px-3 py-1 text-sm font-medium transition-colors
                    border border-[#323036] text-[#B1ACC1]
                    hover:bg-[#FF5679] hover:text-[#110D17] hover:border-none
                    ${
                      page === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }`}
                />
              </PaginationItem>
            </div>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
