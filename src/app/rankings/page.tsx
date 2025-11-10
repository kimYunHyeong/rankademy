import UserRankingSection from "./_components/userRankingSection";
import SubHeaderMain from "@/components/sub-header-main";

export default async function UserRankingPage() {
  return (
    <>
      <SubHeaderMain
        items={[
          { label: "학교 랭킹", href: "/" },
          { label: "유저 랭킹", href: "/rankings" },
        ]}
      />
      <div className="h-20"></div>
      <UserRankingSection />
    </>
  );
}
