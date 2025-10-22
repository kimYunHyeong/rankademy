import SubHeaderMain from "@/components/sub-header-main";
import mockUnivRanking from "@/mock/univRanking.json";
import { fetchFromAPI } from "@/utils/fetcher";
import TableAndSearchMain from "@/components/table-and-search-main";

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
  content: string;
};

const mock: univRanking[] = mockUnivRanking;

export default async function Home() {
  const res = (await fetchFromAPI(
    "/rankings/univ" /* , {
    userNameKey: "안녕",
  } */
  )) as univRanking[];

  /*   const data = res.content; */

  return (
    <>
      <SubHeaderMain
        items={[
          { label: "학교 랭킹", href: "/" },
          { label: "유저 랭킹", href: "/rankings" },
        ]}
      />
      <div className="h-20"></div>
      <TableAndSearchMain data={res} />
    </>
  );
}
