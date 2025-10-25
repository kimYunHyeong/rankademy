import SubHeaderUnivRanking from "@/components/sub-header-univ-ranking";
import UnivUserRankingSection from "./_components/univUserRankingSection";
import { serverFetchFromAPI } from "@/utils/fetcher.server";
import type { Position, Tier, PaginationData } from "@/types";

const mockOptions = {
  major: [
    { label: "컴퓨터공학과", value: "컴퓨터공학과" },
    { label: "전자공학과", value: "전자공학과" },
  ],
};

export type univUserRanking = {
  userId: number;
  puuid: string;
  summonerName: string;
  summonerTag: string;
  summonerIcon: number;
  tierInfo: { tier: Tier; rank: string; lp: number; mappedTier: number };
  winRate: number;
  winCount: number;
  lossCount: number;
  mainPosition: Position;
  subPosition: Position;
  admissionYear: number;
  major: string;
};

type APIres = {
  content: univUserRanking[];
  page: PaginationData;
};

type Params = Promise<{ univName: string }>;

export default async function UnivUserRankingPage({
  params,
}: {
  params: Params;
}) {
  const { univName } = await params;
  const requieredQuery = `?univName=${univName}`;
  const apiUrl = `/rankings/univ/${univName}${requieredQuery}`;
  const res = (await serverFetchFromAPI(apiUrl)) as APIres;

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

      <UnivUserRankingSection
        tableData={tableData}
        apiurl={apiUrl}
        pageData={pageData}
        univName={univName}
      />
    </>
  );
}
