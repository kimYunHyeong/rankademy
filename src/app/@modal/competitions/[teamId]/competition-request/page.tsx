import { PaginationData } from "@/types";
import { sendCompetitionReq } from "@/app/competitions/_components/actions";
import CompetitionRequestSection from "@/app/competitions/[teamId]/competition-request/_components/competitionRequstSection";
import Modal from "@/components/modal";

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

export default async function ModalCompetitionRequestPage({
  params,
}: {
  params: Promise<{ teamId: number }>;
}) {
  const { teamId } = await params;

  /* const res = (await fetchFromAPI(`teams/my`)).data as MyTeamList; */
  const data = mock;
  return (
    <Modal>
      <CompetitionRequestSection
        otherTeamId={teamId}
        data={data.content}
        pageData={data.page}
        submitAction={sendCompetitionReq}
      />
    </Modal>
  );
}
