import SubHeaderMain from "@/components/sub-header-main";
import GroupCards from "@/components/group-cards";

export default function Group() {
  const mockGroups = [
    {
      group: { name: "컴퓨터공학과", icon: "Jinx" },
      createdAt: "2025.07.27",
      description:
        "소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글",
    },
    {
      group: { name: "전자공학과", icon: "Ezreal" },
      createdAt: "2025.06.15",
      description:
        "이곳은 전자공학과 그룹입니다. 다양한 프로젝트와 연구를 함께하며 즐거운 분위기를 추구합니다.",
    },
    {
      group: { name: "경영학과", icon: "Ahri" },
      createdAt: "2025.05.01",
      description:
        "경영학과 그룹은 학문적 탐구와 실무적 감각을 동시에 추구합니다. 언제든 참여 환영!",
    },
    {
      group: { name: "디자인학과", icon: "Lux" },
      createdAt: "2025.04.20",
      description:
        "디자인학과 그룹에서는 창의적인 아이디어와 시각적 표현을 중심으로 다양한 활동을 진행합니다.",
    },
  ];

  return (
    <>
      <SubHeaderMain
        items={[
          { label: "내 그룹", href: "/groups" },
          { label: "모집 게시판", href: "/rankings" },
        ]}
      />

      <div className="h-20"></div>

      <div className="text-white">그룹 알람</div>

      <div className="h-25"></div>

      <GroupCards data={mockGroups} />
    </>
  );
}
