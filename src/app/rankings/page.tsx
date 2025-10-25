import UserRankingSection from "./_components/userRankingSection";
import SubHeaderMain from "@/components/sub-header-main";
import { fetchFromAPI } from "@/utils/fetcher";
import { Tier, PaginationData } from "@/types";

/* 목데이터 */

import { mockUserRanking } from "@/mock/userRanking";

const mock: userRanking[] = mockUserRanking;

/* API URL */
const apiUrl = "/rankings/users";

export type userRanking = {
  userId: number;
  puuid: string;
  summonerName: string;
  summonerTag: string;
  summonerIcon: number;
  univName: string;
  tierInfo: {
    tier: Tier;
    rank: number;
    lp: number;
    mappedTier: number;
  };
  winRate: number;
  winCount: number;
  lossCount: number;
  mainPosition: string;
  subPosition: string;
};

type APIres = {
  content: userRanking[];
  page: PaginationData;
};

export default async function UserRankingPage() {
  const res = (await fetchFromAPI(apiUrl)) as APIres;

  const tableData = res.content;
  const pageData = res.page;

  return (
    <>
      <SubHeaderMain
        items={[
          { label: "학교 랭킹", href: "/" },
          { label: "유저 랭킹", href: "/rankings" },
        ]}
      />
      <div className="h-20"></div>
      <UserRankingSection
        tableData={tableData}
        apiurl={apiUrl}
        pageData={pageData}
      />
    </>
  );
}
