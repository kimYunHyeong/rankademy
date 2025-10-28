import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import CheckPopup from "@/components/check-popup";

const mock = {
  title: "컴퓨터공학과 20학번 모집합니다",
  content:
    "본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문본문",
  groupId: "10",
  groupName: "서울과기대 컴공 20학번",
  uploadedAt: "24",
  contentImg: "Ezreal",
};

export default function Page() {
  const data = mock;
  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-12">
          <div className="flex text-[14px]">
            <Link
              href={`${data.groupId}/delete`}
              className="flex items-center justify-center border border-[#323036] w-[120px] h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
            >
              게시글 삭제
            </Link>
            <Link
              href={`${data.groupId}/edit`}
              className="flex items-center justify-center border border-[#323036] w-[120px] h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
            >
              게시글 수정
            </Link>
            <Link
              href={`${data.groupId}/up`}
              className="flex items-center justify-center border border-[#323036] w-[120px] h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center"
            >
              게시글 UP
            </Link>
          </div>

          <div className="flex">
            <span className="text-white text-xs mr-2">그룹원 모집</span>
            <Switch />
          </div>
        </div>
        <CheckPopup />

        <div className="mt-5"></div>
      </div>

      {/* 본문 */}
      <div className="flex flex-col border-[#25242A] border-2 rounded bg-[#25242A33] min-h-[480px] w-full h-[90%]">
        <div className="flex flex-1 flex-col gap-4 px-5 py-5 ">
          {/* 모집글 */}
          <div className="flex flex-col text-[#B1ACC1]">
            <span className="text-white text-2xl">{data.title}</span>
            <span className="my-3 text-s ">{data.content}</span>
            <span className="text-xs mt-5">
              {data.groupName} | {data.uploadedAt}분 전
            </span>
          </div>

          {/* 이미지 */}
          {data.contentImg && (
            <div className="relative w-full h-120 mx-auto my-10 flex items-center justify-center">
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${data.contentImg}.png`}
                alt={data.contentImg}
                fill
                className="rounded-xl object-contain"
                draggable={false}
              />
            </div>
          )}

          {/* 하단 버튼 */}
          <div className="flex mt-auto">
            <Link
              href={`/groups/${data.groupId}`}
              className="flex items-center justify-center border border-[#323036] w-[120px] h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
            >
              그룹 상세 정보
            </Link>
            <Link
              href="/me/edit"
              className="flex items-center justify-center border border-[#323036] w-[120px] h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
            >
              가입 요청하기(요청 로직 작성 필요)
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
