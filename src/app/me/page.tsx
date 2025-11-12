import { Position, Tier } from "@/types";
import InfoSection from "./_components/infoSection";
import { fetchFromAPI } from "@/utils/fetcher";

/* 목데이터 */
import { mockMyProfile } from "@/mock/myProfile";

export type MyProfile = {
  id: number;
  username: string;
  summonerInfo: {
    puuid: string;
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
    univMail: string;
    major: string;
    admissionYear: number;
  };
  description: string;
  mostChampionIds: string[];
  mainPosition: Position;
  subPosition: Position;
  labels: string[];
};

export default async function MyPage() {
  const apiUrl = "/me";
  const data = (await fetchFromAPI(apiUrl)).data as MyProfile;

  const riotVerifyStatus: boolean = data.summonerInfo.puuid ? true : false;

  return <InfoSection data={data} riotVerifyStatus={riotVerifyStatus} />;
}
