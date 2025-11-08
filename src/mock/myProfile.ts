import { MyProfile } from "@/app/me/page";
import { Tier, Position } from "@/types";

export const mockMyProfile: MyProfile = {
  id: 1,
  username: "rankhero",
  summonerInfo: {
    puuid: "2",
    summonerName: "랭크히어로",
    summonerTag: "KR1",
    summonerIcon: 5883,
    tierInfo: {
      tier: "DIAMOND" as Tier,
      rank: "1",
      lp: 75,
      mappedTier: 4,
    },
    winCount: 142,
    lossCount: 96,
    winRate: 59.6,
  },
  univInfo: {
    univName: "서울과학기술대학교",
    univMail: "ajsl9749@naver.com",
    major: "컴퓨터공학과",
    admissionYear: 2021,
  },
  description:
    "팀파이트 중심의 정글러. 시야 장악과 오브젝트 컨트롤에 자신 있습니다.",
  mostChampionIds: ["Ezreal", "Kaisa"],
  mainPosition: "JUNGLE",
  subPosition: "TOP",
};
