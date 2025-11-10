import UnivRankingSection from "@/_components/univRankingSection";
import SubHeaderMain from "@/components/sub-header-main";

export default async function Home() {
  return (
    <>
      <SubHeaderMain
        items={[
          { label: "학교 랭킹", href: "/" },
          { label: "유저 랭킹", href: "/rankings" },
        ]}
      />
      <div className="h-20"></div>
      <UnivRankingSection />
    </>
  );
}
