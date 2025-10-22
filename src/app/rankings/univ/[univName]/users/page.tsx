import SubHeaderUnivRanking from "@/components/sub-header-univ-ranking";
import TableSearchAndFilterUnivUser from "@/components/table-search-and-filter-univ-user";
import { fetchFromAPI } from "@/utils/fetcher";
import type { position, tier } from "@/types";

const mockOptions = {
  major: [
    { label: "컴퓨터공학과", value: "컴퓨터공학과" },
    { label: "전자공학과", value: "전자공학과" },
  ],
};

export type univUserRanking = {
  userId: number;
  puuid: string;
  summonerName: string;
  summonerTag: string;
  summonerIcon: number;
  tierInfo: { tier: tier; rank: string; lp: number; mappedTier: number };
  winRate: number;
  winCount: number;
  lossCount: number;
  mainPosition: position;
  subPosition: position;
  admissionYear: number;
  major: string;
};

type Search = {
  page?: string;
  major?: string;
  admissionYear?: string;
  mainPosition?: string;
};

export default async function UnivUserRankingPage({
  params,
  searchParams,
}: {
  params: Promise<{ univName: string }>;
  searchParams: Promise<Search>;
}) {
  const { univName } = await params;
  const sp = await searchParams;

  const decodedUnivName = decodeURIComponent(univName);

  // 쿼리 파싱
  const page = Number(sp.page ?? "0") || 0;
  const major = sp.major ?? "";
  const admissionYear =
    sp.admissionYear != null && sp.admissionYear !== ""
      ? Number(sp.admissionYear)
      : undefined;
  const mainPosition = sp.mainPosition ?? "";

  // URLSearchParams 생성
  const queryParams = new URLSearchParams();
  queryParams.set("page", String(page));
  if (major) queryParams.set("major", major);
  if (admissionYear != null && !Number.isNaN(admissionYear)) {
    queryParams.set("admissionYear", String(admissionYear));
  }
  if (mainPosition) queryParams.set("mainPosition", mainPosition);

  let data: univUserRanking[] = [];
  try {
    // ⚠️ API 경로에는 "인코딩된" 세그먼트를 쓰는 게 안전합니다.
    const res = await fetchFromAPI(
      `/rankings/univ/${univName}?${queryParams.toString()}`
    );
    data = (res ?? []) as univUserRanking[];
  } catch (err) {
    console.error("데이터를 불러오지 못했습니다:", err);
    data = [];
  }

  return (
    <>
      {/* 상단 고정 헤더 */}
      <SubHeaderUnivRanking
        univName={decodedUnivName}
        univNameEn="SEOUL NATIONAL UNIVERSITY OF SCIENCE AND TECHNOLOGY"
        logoSrc={`/univ-emblem/${encodeURIComponent(decodedUnivName)}.png`}
        items={[
          { label: "그룹 랭킹", href: `/rankings/univ/${univName}/groups` },
          { label: "유저 랭킹", href: `/rankings/univ/${univName}/users` },
        ]}
        headerHeight={260}
      />

      <div className="mx-auto px-6">
        <TableSearchAndFilterUnivUser data={data} options={mockOptions} />
      </div>
    </>
  );
}
