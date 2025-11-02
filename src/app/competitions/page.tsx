import Link from "next/link";
import SubHeaderMain from "@/components/sub-header-main";
import React from "react";
import { fetchFromAPI } from "@/utils/fetcher";
import { PaginationData } from "@/types";
import TeamListSection from "./_components/team-list-section";

import { mockTeamList } from "@/mock/teamList";

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

export default async function TeamListPage() {
  const resRequestedUrl = "?page=0";
  const res = (await fetchFromAPI(`/teams${resRequestedUrl}`)) as TeamList;

  const data = res;

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
      <TeamListSection data={data.content} pageData={data.page} />;
    </>
  );
}
