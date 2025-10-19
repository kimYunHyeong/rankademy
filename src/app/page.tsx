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

export default async function Home() {
  let data: univRanking[] = [];

  try {
    const res = await fetchFromAPI("/rankings/univ");
    data = res as univRanking[];
  } catch (err) {
    console.error("데이터를 불러오지 못했습니다:", err);
    data = []; //fallback
  }

  const mock: univRanking[] = mockUnivRanking;

  return (
    <>
      <SubHeaderMain
        items={[
          { label: "학교 랭킹", href: "/" },
          { label: "유저 랭킹", href: "/rankings" },
        ]}
      />
      <div className="h-20"></div>
      <TableAndSearchMain data={mock} />
    </>
  );
}
