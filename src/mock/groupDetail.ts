import { GroupDetail } from "@/types";
export const mockGroupDetail: GroupDetail = {
  groupId: 101,
  name: "서울과기대 로얄로더스",
  about:
    "서울과학기술대학교의 대표 리그오브레전드 팀입니다. 꾸준한 연습과 팀워크로 전국 대학 대항전 상위권을 노리고 있습니다.",
  logoImageUrl: "Zac",
  avgTierInfo: {
    tier: "PLATINUM",
    rank: "1",
    lp: 84,
    mappedTier: 4,
  },
  competitionInfo: {
    winCount: 32,
    lossCount: 18,
    winRate: 64.0,
  },
  capacity: 10,
  memberCnt: 7,
  leader: {
    id: 1,
    summonerName: "RoyalAce",
    summonerTag: "KR1",
    summonerIcon: 55,
  },
  createdAt: "2024-11-10T14:35:00Z",
  isJoined: true,
  isLeader: false,
};
