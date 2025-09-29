import { univGroupData } from "@/types";

export const univGroupInfo: univGroupData = {
  group: {
    id: 1,
    name: "정글의 법칙",
    icon: "LeeSin",
  },
  memberCnt: 5,
  competition: {
    cnt: 10,
    win: 7,
  },
  tier: {
    rank: "gold",
    tier: 2,
    lp: 75,
  },
  groupLeader: {
    id: 101,
    userName: "SummonerOne",
    userTag: "#KR1",
    icon: "Ahri",
  },
  description:
    "서울과학기술대학교에서 가장 활발한 정글러 모임 서울과학기술대학교에서 가장 활발한 정글러 모임 서울과학기술대학교에서 가장 활발한 정글러 모임 서울과학기술대학교에서 가장 활발한 정글러 모임",
  createdAt: "25.07.27",
  latestMatch: [
    {
      oppose: {
        id: 1,
        name: "서울과기대팀",
        icon: "Ezreal",
      },
      result: "win",
    },
    {
      oppose: {
        id: 2,
        name: "서울과기대팀",
        icon: "Ezreal",
      },
      result: "lose",
    },
    {
      oppose: {
        id: 3,
        name: "서울과기대팀",
        icon: "Ezreal",
      },
      result: "win",
    },
  ],
};
