import SubHeaderUnivRanking from "@/components/sub-header-univ-ranking";
import type { tier } from "@/types";
import { mockUnivGroupRanking } from "@/mock/univGroupRanking";
import { fetchFromAPI } from "@/utils/fetcher";
import TableSearchAndFilterUnivGroup from "@/components/table-search-and-filter-univ-group";

const mockOptions = {
  major: [
    { label: "컴퓨터공학과", value: "컴퓨터공학과" },
    { label: "전자공학과", value: "전자공학과" },
  ],
};

export type univGruopRanking = {
  groupId: number;
  name: string;
  logoImageUrl: string;
  capacity: number;
  memberCnt: number;
  competitionTotalCnt: number;
  competitionWinCnt: number;
  avgTierInfo: {
    tier: tier;
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

export default async function UnivGruopRankingPage({
  params,
}: {
  params: Promise<{ univName: string }>;
}) {
  const { univName } = await params;
  const decodedUnivName = decodeURIComponent(univName);
  let data: univGruopRanking[] = [];

  /*   try {
    const res = await fetchFromAPI(
      `/rankings/univ/"서울과학기술대학교"/groups`
    );
    data = res as univGruopRanking[];
  } catch (err) {
    console.error("데이터를 불러오지 못했습니다:", err);
    data = [];
  } */

  return (
    <>
      {/* 상단 고정 헤더 */}
      <SubHeaderUnivRanking
        univName={decodedUnivName}
        univNameEn="SEOUL NATIONAL UNIVERSITY OF SCIENCE AND TECHNOLOGY"
        logoSrc={`/univ-emblem/${decodedUnivName}.png`}
        items={[
          {
            label: "그룹 랭킹",
            href: `/rankings/univ/${decodedUnivName}/groups`,
          },
          {
            label: "유저 랭킹",
            href: `/rankings/univ/${decodedUnivName}/users`,
          },
        ]}
        headerHeight={260}
      />

      <div className=" mx-auto px-6">
        <TableSearchAndFilterUnivGroup
          data={mockUnivGroupRanking}
          options={mockOptions}
        />
      </div>
    </>
  );
}
