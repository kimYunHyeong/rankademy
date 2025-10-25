import CompetitionTable from "@/components/competition-table";

const mock = {
  totalCount: 1,
  competitions: [
    {
      competitionId: 1,
      otherTeamUnivName: "test group",
      status: "COMPLETED",
      myTeam: {
        teamId: 1,
        teamName: "myTeam",
        groupName: "test group",
        teamMembers: [
          {
            memberId: 1,
            position: "TOP",
            summonerName: "myTeamLeader",
            summonerTag: "KR1",
            summonerIcon: "Kaisa",
          },
          {
            memberId: 4,
            position: "JUNGLE",
            summonerName: "myTeammember0",
            summonerTag: "KR1",
            summonerIcon: "Kaisa",
          },
          {
            memberId: 5,
            position: "MIDDLE",
            summonerName: "myTeammember1",
            summonerTag: "KR1",
            summonerIcon: "Kaisa",
          },
          {
            memberId: 6,
            position: "BOTTOM",
            summonerName: "myTeammember2",
            summonerTag: "KR1",
            summonerIcon: "Kaisa",
          },
          {
            memberId: 7,
            position: "UTILITY",
            summonerName: "myTeammember3",
            summonerTag: "KR1",
            summonerIcon: "Kaisa",
          },
        ],
      },
      otherTeam: {
        teamId: 2,
        teamName: "otherTeam",
        groupName: "test group",
        groupIcon: "Ezreal",
        teamMembers: [
          {
            memberId: 2,
            position: "TOP",
            summonerName: "otherTeamLeader",
            summonerTag: "KR1",
            summonerIcon: "Kaisa",
          },
          {
            memberId: 8,
            position: "JUNGLE",
            summonerName: "otherTeammember0",
            summonerTag: "KR1",
            summonerIcon: "Kaisa",
          },
          {
            memberId: 9,
            position: "MIDDLE",
            summonerName: "otherTeammember1",
            summonerTag: "KR1",
            summonerIcon: "Kaisa",
          },
          {
            memberId: 10,
            position: "BOTTOM",
            summonerName: "otherTeammember2",
            summonerTag: "KR1",
            summonerIcon: "Kaisa",
          },
          {
            memberId: 11,
            position: "UTILITY",
            summonerName: "otherTeammember3",
            summonerTag: "KR1",
            summonerIcon: "Kaisa",
          },
        ],
      },
      submittedAt: "2025.09.21",
      isWin: true,
      setResults: [
        {
          setNumber: 1,
          winnerTeamId: 1,
        },
        {
          setNumber: 2,
          winnerTeamId: 2,
        },
        {
          setNumber: 3,
          winnerTeamId: 2,
        },
        {
          setNumber: 4,
          winnerTeamId: 1,
        },
        {
          setNumber: 5,
          winnerTeamId: 1,
        },
      ],
    },
    {
      competitionId: 2,
      otherTeamUnivName: "서울과기대",
      status: "COMPLETED",
      myTeam: {
        teamId: 1,
        teamName: "myTeam",
        groupName: "test group",
        teamMembers: [
          {
            memberId: 1,
            position: "TOP",
            summonerName: "myTeamLeader",
            summonerTag: "KR1",
            summonerIcon: "Kaisa",
          },
          {
            memberId: 4,
            position: "JUNGLE",
            summonerName: "myTeammember0",
            summonerTag: "KR1",
            summonerIcon: "Kaisa",
          },
          {
            memberId: 5,
            position: "MIDDLE",
            summonerName: "myTeammember1",
            summonerTag: "KR1",
            summonerIcon: "Kaisa",
          },
          {
            memberId: 6,
            position: "BOTTOM",
            summonerName: "myTeammember2",
            summonerTag: "KR1",
            summonerIcon: "Kaisa",
          },
          {
            memberId: 7,
            position: "UTILITY",
            summonerName: "myTeammember3",
            summonerTag: "KR1",
            summonerIcon: "Kaisa",
          },
        ],
      },
      otherTeam: {
        teamId: 2,
        teamName: "otherTeam",
        groupName: "test group",
        groupIcon: "Ezreal",
        teamMembers: [
          {
            memberId: 2,
            position: "TOP",
            summonerName: "otherTeamLeader",
            summonerTag: "KR1",
            summonerIcon: "Kaisa",
          },
          {
            memberId: 8,
            position: "JUNGLE",
            summonerName: "otherTeammember0",
            summonerTag: "KR1",
            summonerIcon: "Kaisa",
          },
          {
            memberId: 9,
            position: "MIDDLE",
            summonerName: "otherTeammember1",
            summonerTag: "KR1",
            summonerIcon: "Kaisa",
          },
          {
            memberId: 10,
            position: "BOTTOM",
            summonerName: "otherTeammember2",
            summonerTag: "KR1",
            summonerIcon: "Kaisa",
          },
          {
            memberId: 11,
            position: "UTILITY",
            summonerName: "otherTeammember3",
            summonerTag: "KR1",
            summonerIcon: "Kaisa",
          },
        ],
      },
      submittedAt: "2025.09.21",
      isWin: false,
      setResults: [
        {
          setNumber: 1,
          winnerTeamId: 1,
        },
        {
          setNumber: 2,
          winnerTeamId: 2,
        },
        {
          setNumber: 3,
          winnerTeamId: 2,
        },
        {
          setNumber: 4,
          winnerTeamId: 1,
        },
        {
          setNumber: 5,
          winnerTeamId: 1,
        },
      ],
    },
  ],
};

export default function Page() {
  const data = mock;
  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-2">
        <span>내 대항전</span>
      </div>
      <div className="h-10"></div>
      {/*   <CompetitionTable data={data} /> */}
    </>
  );
}
