import UnivGroupRankingSection from "./_components/univGroupRankingSection";
import SubHeaderUnivRanking from "@/components/sub-header-univ-ranking";

export default async function UnivGroupRankingPage({
  params,
}: {
  params: Promise<{ univName: string }>;
}) {
  const { univName } = await params;

  return (
    <>
      {/* 상단 고정 헤더 */}
      <SubHeaderUnivRanking
        univName={decodeURIComponent(univName)}
        univNameEn="SEOUL NATIONAL UNIVERSITY OF SCIENCE AND TECHNOLOGY"
        logoSrc={`/univ-emblem/${decodeURIComponent(univName)}.png`}
        items={[
          {
            label: "그룹 랭킹",
            href: `/rankings/univ/${univName}/groups`,
          },
          {
            label: "유저 랭킹",
            href: `/rankings/univ/${univName}/users`,
          },
        ]}
        headerHeight={260}
      />

      <UnivGroupRankingSection univName={univName} />
    </>
  );
}
