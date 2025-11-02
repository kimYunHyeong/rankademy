import { PaginationData } from "@/types";
import { fetchFromAPI } from "@/utils/fetcher";
import RecruitListSection from "./_components/recruit-list-section";

export type recruit = {
  postId: number;
  groupId: number;
  groupName: string;
  title: string;
  content: string;
  createdAt: string;
};

type APIres = {
  content: recruit[];
  page: PaginationData;
};

/* 목데이터 */
const mockRecruits: APIres = {
  content: [
    {
      postId: 1,
      groupId: 10,
      groupName: "서울과기대 컴공 20학번",
      title: "컴퓨터공학과 20학번 모집합니다",
      content:
        "본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문",
      createdAt: "2025-10-28T16:12:39.857Z",
    },
  ],
  page: {
    size: 10,
    number: 0,
    totalElements: 0,
    totalPages: 0,
  },
};

export default async function RecruitListPage() {
  const resRequestedUrl = "?page=0";
  const res = (await fetchFromAPI(`/groups/posts${resRequestedUrl}`)) as APIres;

  return <RecruitListSection data={res.content} pageData={res.page} />;
}
