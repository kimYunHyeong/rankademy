import { Position, Tier } from "@/types";
import InfoSection from "./_components/infoSection";
import { fetchFromAPI } from "@/utils/fetcher";

/* 목데이터 */
import { mockMyProfile } from "@/mock/myProfile";

export type MyProfile = {
  id: number;
  username: string;
  summonerInfo: {
    summonerName: string;
    summonerTag: string;
    summonerIcon: number;
    tierInfo: {
      tier: Tier;
      rank: string;
      lp: number;
      mappedTier: number;
    };
    winCount: number;
    lossCount: number;
    winRate: number;
  };
  univInfo: {
    univName: string;
    univVerified: boolean;
    major: string;
    admissionYear: number;
  };
  description: string;
  mostChampionIds: string[];
  mainPosition: Position;
  subPosition: Position;
};

export default async function MyPage() {
  const apiUrl = "/me";
  const data = await fetchFromAPI(apiUrl);

  return <InfoSection data={data} />;
}
