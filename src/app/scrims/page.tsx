import Link from "next/link";
import SubHeaderMain from "@/components/sub-header-main";
import React from "react";
import ScrimTeamListSection from "./_components/scrim-list-section";

export default async function ScrimTeamListPage() {
  return (
    <>
      {/* 대항전/스크림 선택 */}
      <SubHeaderMain
        items={[
          { label: "대항전", href: "/competitions" },
          { label: "스크림", href: "/scrims" },
        ]}
        className="my-3"
      />
      <div className="h-8"></div>
      {/*팀 생성 */}
      <div className="flex items-center justify-end my-5">
        <Link
          href={`scrims/create`}
          className="flex items-center justify-center 
      border border-[#323036] 
      w-[120px] h-11 
      text-[#B1ACC1] rounded 
      bg-[#25242A33] text-center mt-10"
        >
          팀 생성
        </Link>
      </div>
      <ScrimTeamListSection />
    </>
  );
}
