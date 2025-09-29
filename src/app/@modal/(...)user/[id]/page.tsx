import IDcard from "@/components/id-card";
import Modal from "@/components/modal";
import { userData } from "@/types";

export default function Page(props: any) {
  const mock = {
    univName: "서울과학기술대학교",
    admissionYear: 20,
    major: "컴퓨터공학과",
    user: { id: 1, userName: "니 카", userTag: "luffy", icon: "Ezreal" },
    position: { main: "bottom", sub: "jungle" },
    tier: { rank: "silver", tier: 4, lp: 32 },
    record: { win: 210, cnt: 480 },
    emblem: "하드캐리",
    description:
      "소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글",
    most: {
      first: "Ezreal",
      second: "Kaisa",
      third: "Yunara",
    },
  } satisfies userData;

  return (
    <Modal>
      <IDcard data={mock} />
    </Modal>
  );
}
