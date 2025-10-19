import type { tier } from "@/types";
import SubHeaderMain from "@/components/sub-header-main";
import TableAndSearchUserRanking from "@/components/table-and-search-user-ranking";
import { mockUserRanking } from "@/mock/userRanking";
import { fetchFromAPI } from "@/utils/fetcher";

export type userRanking = {
  userId: number;
  puuid: string;
  summonerName: string;
  summonerTag: string;
  summonerIcon: number;
  univName: string;
  tierInfo: {
    tier: tier;
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

export default async function UserRankingPage() {
  let data: userRanking[] = [];

  try {
    const res = await fetchFromAPI("/rankings/univ");
    data = res as userRanking[];
  } catch (err) {
    console.error("데이터를 불러오지 못했습니다:", err);
    data = []; //fallback
  }

  const mock: userRanking[] = mockUserRanking;

  return (
    <>
      <SubHeaderMain
        items={[
          { label: "학교 랭킹", href: "/" },
          { label: "유저 랭킹", href: "/rankings" },
        ]}
      />
      <div className="h-20"></div>
      <TableAndSearchUserRanking data={mock} />
    </>
  );
}
