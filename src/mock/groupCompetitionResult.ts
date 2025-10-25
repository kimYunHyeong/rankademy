import { TeamMember, GroupCompetitionResult } from "@/types";

/* 예시용 팀 멤버 */
const mockMembers: TeamMember[] = [
  {
    memberId: 1,
    position: "TOP",
    summonerName: "IronHammer",
    summonerTag: "KR1",
    summonerIcon: 23,
    univName: "서울과학기술대학교",
    major: "컴퓨터공학과",
    admissionYear: 21,
    tierInfo: { tier: "Gold", rank: "1", lp: 74, mappedTier: 9 },
  },
  {
    memberId: 2,
    position: "JUNGLE",
    summonerName: "NightWolf",
    summonerTag: "KR2",
    summonerIcon: 57,
    univName: "서울과학기술대학교",
    major: "전자공학과",
    admissionYear: 20,
    tierInfo: { tier: "PLATINUM", rank: "2", lp: 20, mappedTier: 10 },
  },
  {
    memberId: 3,
    position: "MIDDLE",
    summonerName: "NightWolf",
    summonerTag: "KR2",
    summonerIcon: 57,
    univName: "서울과학기술대학교",
    major: "전자공학과",
    admissionYear: 20,
    tierInfo: { tier: "PLATINUM", rank: "2", lp: 20, mappedTier: 10 },
  },
  {
    memberId: 4,
    position: "BOTTOM",
    summonerName: "NightWolf",
    summonerTag: "KR2",
    summonerIcon: 57,
    univName: "서울과학기술대학교",
    major: "전자공학과",
    admissionYear: 20,
    tierInfo: { tier: "PLATINUM", rank: "2", lp: 20, mappedTier: 10 },
  },
  {
    memberId: 5,
    position: "UTILITY",
    summonerName: "NightWolf",
    summonerTag: "KR2",
    summonerIcon: 57,
    univName: "서울과학기술대학교",
    major: "전자공학과",
    admissionYear: 20,
    tierInfo: { tier: "PLATINUM", rank: "2", lp: 20, mappedTier: 10 },
  },
];

/* 목데이터 */
export const mockGroupCompetitionResult: GroupCompetitionResult[] = [
  {
    competitionId: 1,
    otherTeamUnivName: "홍익대학교",
    status: "COMPLETED",
    myTeam: {
      teamId: 101,
      teamName: "서울과기대 Alpha",
      groupName: "과기대 e스포츠단",
      teamMembers: mockMembers,
    },
    otherTeam: {
      teamId: 201,
      teamName: "홍익대 Blaze",
      groupName: "홍익대 게임학회",
      teamMembers: mockMembers,
    },
    submittedAt: "2025-10-20T15:30:00Z",
    isWin: true,
    setResults: [
      { setNumber: 1, winnerTeamId: 101 },
      { setNumber: 2, winnerTeamId: 201 },
      { setNumber: 3, winnerTeamId: 101 },
    ],
  },
  {
    competitionId: 2,
    otherTeamUnivName: "연세대학교",
    status: "COMPLETED",
    myTeam: {
      teamId: 101,
      teamName: "서울과기대 Alpha",
      groupName: "과기대 e스포츠단",
      teamMembers: mockMembers,
    },
    otherTeam: {
      teamId: 301,
      teamName: "연세대 Titans",
      groupName: "연세대 e스포츠연합",
      teamMembers: mockMembers,
    },
    submittedAt: "2025-10-23T12:00:00Z",
    isWin: false,
    setResults: [
      { setNumber: 1, winnerTeamId: 301 },
      { setNumber: 2, winnerTeamId: 301 },
    ],
  },
];
