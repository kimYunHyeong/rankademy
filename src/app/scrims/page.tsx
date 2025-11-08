import Link from "next/link";
import SubHeaderMain from "@/components/sub-header-main";
import React from "react";
import { fetchFromAPI } from "@/utils/fetcher";
import { PaginationData, Tier } from "@/types";
import { mockScrimTeamList } from "@/mock/scrimTeamList";
import ScrimTeamListSection from "./_components/scrim-list-section";

export type ScrimTeam = {
  scrimTeamId: number;
  scrimTeamName: string;
  intro: string;
  createdAt: string;
  avgTierInfo: {
    tier: Tier;
    rank: string;
    lp: number;
    mappedTier: number;
    flattenString: string;
  };
  isRecommended: boolean;
};

export type ScrimTeamList = {
  content: ScrimTeam[];
  page: PaginationData;
};

export default async function ScrimTeamListPage() {
  const resRequestedUrl = "?page=0";
  const res = (await fetchFromAPI(
    `/scrim-teams${resRequestedUrl}`
  )) as ScrimTeamList;

  const data = res.content;
  const pageData = res.page;

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
      {/*팀 생성 */}
      <div className="flex items-center justify-end my-5">
        <Link
          href={`scrims/create`}
          className="flex items-center justify-center 
      border border-[#323036] 
      w-[120px] h-11 
      text-[#B1ACC1] rounded 
      bg-[#25242A33] text-center mt-10"
        >
          팀 생성
        </Link>
      </div>
      <ScrimTeamListSection data={data} pageData={pageData} />
    </>
  );
}
