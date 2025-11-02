import { GroupMember } from "@/types";

export const mockGroupMembers: GroupMember[] = [
  {
    summonerName: "SilverFox",
    summonerTag: "KR1",
    summonerIconId: 23,
    major: "컴퓨터공학과",
    admissionYear: 22,
    mainPosition: "MIDDLE",
    subPosition: "JUNGLE",
    tierInfo: {
      tier: "PLATINUM",
      rank: "2",
      lp: 75,
      mappedTier: 4,
    },
    recordInfo: {
      winCount: 68,
      lossCount: 45,
      winRate: 60.2,
    },
  },
  {
    summonerName: "CrimsonBlade",
    summonerTag: "KR2",
    summonerIconId: 45,
    major: "전자공학과",
    admissionYear: 21,
    mainPosition: "TOP",
    subPosition: "BOTTOM",
    tierInfo: {
      tier: "GOLD",
      rank: "2",
      lp: 92,
      mappedTier: 5,
    },
    recordInfo: {
      winCount: 54,
      lossCount: 40,
      winRate: 57.4,
    },
  },
  {
    summonerName: "Moonlight",
    summonerTag: "KR3",
    summonerIconId: 12,
    major: "산업디자인과",
    admissionYear: 20,
    mainPosition: "UTILITY",
    subPosition: "MIDDLE",
    tierInfo: {
      tier: "DIAMOND",
      rank: "4",
      lp: 30,
      mappedTier: 3,
    },
    recordInfo: {
      winCount: 75,
      lossCount: 50,
      winRate: 60.0,
    },
  },
];
