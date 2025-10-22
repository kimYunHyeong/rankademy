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

type ApiRes = {
  content: userRanking[];
  page: string;
};

export default async function UserRankingPage() {
  const res = (await fetchFromAPI("/rankings/users")) as ApiRes;
  const userRanking = res.content as userRanking[];

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
      <TableAndSearchUserRanking data={userRanking} />
    </>
  );
}
