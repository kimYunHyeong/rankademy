import Link from "next/link";
import RecruitListSection from "./_components/recruit-list-section";
import SubHeaderMain from "@/components/sub-header-main";

export default async function RecruitListPage() {
  return (
    <>
      <SubHeaderMain
        items={[
          { label: "내 그룹", href: "/groups" },
          { label: "모집 게시판", href: "/groups/recruits" },
        ]}
        className="my-3"
      />
      <div className="h-8"></div>
      <div className="flex items-center justify-end my-5">
        <Link
          href="create"
          className="flex items-center justify-center 
      border border-[#323036] 
      w-[120px] h-11 
      text-[#B1ACC1] rounded 
      bg-[#25242A33] text-center mt-10 mr-2"
        >
          그룹 생성
        </Link>

        <Link
          href={`recruits/edit`}
          className="flex items-center justify-center 
      border border-[#323036] 
      w-[120px] h-11 
      text-[#B1ACC1] rounded 
      bg-[#25242A33] text-center mt-10"
        >
          모집글 작성
        </Link>
      </div>
      <RecruitListSection />;
    </>
  );
}
