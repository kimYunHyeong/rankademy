import { GroupInfo } from "@/components/group-info";
import { univGroupInfo } from "@/mock/groupInfoData";
import { CompetitionTable } from "@/components/competition-table";

export default function Page() {
  const mock = [
    {
      id: "1",
      groupName: "컴퓨터공학과 팀",
      school: "서울과학기술대학교",
      date: "2025.08.31",
      result: "win",
      details: (
        <div className="space-y-2">
          <p>세부 결과: 3 : 2</p>
          <p>Game 1: W</p>
          <p>Game 2: L</p>
          <p>Game 3: W</p>
          <p>Game 4: L</p>
          <p>Game 5: W</p>
        </div>
      ),
    },
    {
      id: "2",
      groupName: "컴퓨터공학과 팀",
      school: "서울과학기술대학교",
      date: "2025.08.31",
      result: "win",
      details: (
        <div className="space-y-2">
          <p>세부 결과: 3 : 2</p>
          <p>Game 1: W</p>
          <p>Game 2: L</p>
          <p>Game 3: W</p>
          <p>Game 4: L</p>
          <p>Game 5: W</p>
        </div>
      ),
    },
    {
      id: "3",
      groupName: "컴퓨터공학과 팀",
      school: "서울과학기술대학교",
      date: "2025.08.31",
      result: "lose",
      details: (
        <div className="space-y-2">
          <p>세부 결과: 3 : 2</p>
          <p>Game 1: W</p>
          <p>Game 2: L</p>
          <p>Game 3: W</p>
          <p>Game 4: L</p>
          <p>Game 5: W</p>
        </div>
      ),
    },
    {
      id: "4",
      groupName: "컴퓨터공학과 팀",
      school: "서울과학기술대학교",
      date: "2025.08.31",
      result: "lose",
      details: (
        <div className="space-y-2">
          <p>세부 결과: 3 : 2</p>
          <p>Game 1: W</p>
          <p>Game 2: L</p>
          <p>Game 3: W</p>
          <p>Game 4: L</p>
          <p>Game 5: W</p>
        </div>
      ),
    },
    {
      id: "5",
      groupName: "컴퓨터공학과 팀",
      school: "서울과학기술대학교",
      date: "2025.08.31",
      result: "lose",
      details: (
        <div className="space-y-2">
          <p>세부 결과: 3 : 2</p>
          <p>Game 1: W</p>
          <p>Game 2: L</p>
          <p>Game 3: W</p>
          <p>Game 4: L</p>
          <p>Game 5: W</p>
        </div>
      ),
    },
    {
      id: "6",
      groupName: "컴퓨터공학과 팀",
      school: "서울과학기술대학교",
      date: "2025.08.31",
      result: "lose",
      details: (
        <div className="space-y-2">
          <p>세부 결과: 3 : 2</p>
          <p>Game 1: W</p>
          <p>Game 2: L</p>
          <p>Game 3: W</p>
          <p>Game 4: L</p>
          <p>Game 5: W</p>
        </div>
      ),
    },
    {
      id: "7",
      groupName: "컴퓨터공학과 팀",
      school: "서울과학기술대학교",
      date: "2025.08.31",
      result: "lose",
      details: (
        <div className="space-y-2">
          <p>세부 결과: 3 : 2</p>
          <p>Game 1: W</p>
          <p>Game 2: L</p>
          <p>Game 3: W</p>
          <p>Game 4: L</p>
          <p>Game 5: W</p>
        </div>
      ),
    },
    {
      id: "8",
      groupName: "컴퓨터공학과 팀",
      school: "서울과학기술대학교",
      date: "2025.08.31",
      result: "lose",
      details: (
        <div className="space-y-2">
          <p>세부 결과: 3 : 2</p>
          <p>Game 1: W</p>
          <p>Game 2: L</p>
          <p>Game 3: W</p>
          <p>Game 4: L</p>
          <p>Game 5: W</p>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-center text-white">대항전 기록</div>

      <GroupInfo group={univGroupInfo} />
      <div className="h-4"></div>
      <CompetitionTable data={mock} />
    </>
  );
}
