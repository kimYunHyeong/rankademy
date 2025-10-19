import SubHeaderUnivRanking from "@/components/sub-header-univ-ranking";
import { mockUnivUserRanking } from "@/mock/univUserRanking";
import { position, tier } from "@/types";
import { fetchFromAPI } from "@/utils/fetcher";
import TableSearchAndFilterUnivUser from "@/components/table-search-and-filter-univ-user";

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
  tierInfo: {
    tier: tier;
    rank: string;
    lp: number;
    mappedTier: number;
  };
  winRate: number;
  winCount: number;
  lossCount: number;
  mainPosition: position;
  subPosition: position;
  admissionYear: number;
  major: string;
};

export default async function UnivUserRankingPage({
  params,
}: {
  params: Promise<{ univName: string }>;
}) {
  const { univName } = await params;
  const decodedUnivName = decodeURIComponent(univName);
  let data: univUserRanking[] = [];

  /*   try {
    const res = await fetchFromAPI(`/rankings/univ/${univName}`);
    data = res as univUserRanking[];
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
            href: `/rankings/univ/${univName}/groups`,
          },
          {
            label: "유저 랭킹",
            href: `/rankings/univ/${decodedUnivName}/users`,
          },
        ]}
        headerHeight={260}
      />

      <div className=" mx-auto px-6">
        <TableSearchAndFilterUnivUser
          data={mockUnivUserRanking}
          options={mockOptions}
        />
      </div>
    </>
  );
}
