import { PaginationData } from "@/types";
import { sendCompetitionReq } from "../../_components/actions";
import CompetitionRequestSection from "./_components/competitionRequstSection";
import { fetchFromAPI } from "@/utils/fetcher";

export type TeamInfo = {
  teamId: number;
  teamName: string;
  groupId: number;
  groupName: string;
};

type MyTeamList = {
  content: TeamInfo[];
  page: PaginationData;
};

const mock = {
  content: [
    {
      teamId: 1,
      teamName: "컴퓨터공학과",
      groupId: 1,
      groupName: "서울과학기술대학교",
    },
    {
      teamId: 2,
      teamName: "컴퓨터공학과",
      groupId: 2,
      groupName: "서울과학기술대학교",
    },
    {
      teamId: 3,
      teamName: "컴퓨터공학과",
      groupId: 1,
      groupName: "서울과학기술대학교",
    },
  ],
  page: {
    size: 3,
    number: 0,
    totalElements: 3,
    totalPages: 1,
  },
};

export default async function CompetitionRequestPage({
  params,
}: {
  params: Promise<{ teamId: number }>;
}) {
  const { teamId } = await params;

  /* const res = (await fetchFromAPI(`teams/my`)) as MyTeamList; */
  const data = mock;
  return (
    <CompetitionRequestSection
      otherTeamId={teamId}
      data={data.content}
      pageData={data.page}
      submitAction={sendCompetitionReq}
    />
  );
}
