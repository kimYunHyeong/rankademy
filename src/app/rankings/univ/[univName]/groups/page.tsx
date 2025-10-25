import UnivGroupRankingSection from "./_components/univGroupRankingSection";
import SubHeaderUnivRanking from "@/components/sub-header-univ-ranking";
import { fetchFromAPI } from "@/utils/fetcher";
import { PaginationData, Tier } from "@/types";

/* 목데이터 */
import { mockUnivGroupRanking } from "@/mock/univGroupRanking";
const mock: univGroupRanking[] = mockUnivGroupRanking;

export type univGroupRanking = {
  groupId: number;
  name: string;
  logoImageUrl: string;
  capacity: number;
  memberCnt: number;
  competitionTotalCnt: number;
  competitionWinCnt: number;
  avgTierInfo: {
    tier: Tier;
    rank: string;
    lp: number;
    mappedTier: number;
  };
  leader: {
    id: number;
    summonerName: string;
    summonerTag: string;
    summonerIcon: number;
  };
};

type APIres = {
  content: univGroupRanking[];
  page: PaginationData;
};

type Params = Promise<{ univName: string }>;

export default async function UnivGroupRankingPage({
  params,
}: {
  params: Params;
}) {
  const { univName } = await params;
  const requieredQuery = `?page=0&univName=${univName}`;
  const apiUrl = `/rankings/univ/${univName}/groups${requieredQuery}`;
  const res = (await fetchFromAPI(apiUrl)) as APIres;

  const tableData = res.content;
  const pageData = res.page;

  return (
    <>
      {/* 상단 고정 헤더 */}
      <SubHeaderUnivRanking
        univName={decodeURIComponent(univName)}
        univNameEn="SEOUL NATIONAL UNIVERSITY OF SCIENCE AND TECHNOLOGY"
        logoSrc={`/univ-emblem/${decodeURIComponent(univName)}.png`}
        items={[
          {
            label: "그룹 랭킹",
            href: `/rankings/univ/${univName}/groups`,
          },
          {
            label: "유저 랭킹",
            href: `/rankings/univ/${univName}/users`,
          },
        ]}
        headerHeight={260}
      />

      <UnivGroupRankingSection
        tableData={tableData}
        apiurl={apiUrl}
        pageData={pageData}
        univName={univName}
      />
    </>
  );
}
