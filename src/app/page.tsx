import UnivRankingSection from "@/_components/univRankingSection";
import SubHeaderMain from "@/components/sub-header-main";
import { serverFetchFromAPI } from "@/utils/fetcher.server";
import { paginationData } from "@/types";

/* 목데이터 */
import mockUnivRanking from "@/mock/univRanking.json";
const mock: univRanking[] = mockUnivRanking;

export type univRanking = {
  univName: string;
  totalUserCnt: number;
  competitionTotalCnt: number;
  competitionWinCnt: number;
  rankerDto: {
    id: number;
    summonerName: string;
    summonerTag: string;
    summonerIcon: number;
  };
};

type APIres = {
  content: univRanking[];
  page: paginationData;
};

export default async function Home() {
  const apiUrl = "/rankings/univ";
  const res = (await serverFetchFromAPI(apiUrl)) as APIres;

  const tableData = res.content;
  const pageData = res.page;

  return (
    <>
      <SubHeaderMain
        items={[
          { label: "학교 랭킹", href: "/" },
          { label: "유저 랭킹", href: "/rankings" },
        ]}
      />
      <div className="h-20"></div>
      <UnivRankingSection
        tableData={tableData}
        apiurl={apiUrl}
        pageData={pageData}
      />
    </>
  );
}
