import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import FallBackImage from "@/components/fallback-img";
import Image from "next/image";
import RowScrollContainer from "@/components/row-scroll-container";
import { fetchFromAPI } from "@/utils/fetcher";
import { CHAMPION_IMG_URL } from "@/lib/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

type RecruitDetail = {
  postId: number;
  groupId: number;
  groupName: string;
  title: string;
  content: string;
  requirements: string;
  createdAt: string;
  isJoined: boolean;
};

const mock: RecruitDetail = {
  postId: 1,
  groupId: 1,
  groupName: "string",
  title: "string",
  content: "string",
  requirements: "string",
  createdAt: "2025-11-02T06:59:25.531Z",
  isJoined: true,
};

export default async function RecruitDetailPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;

  const res = (await fetchFromAPI(`/groups/${groupId}/post`)) as RecruitDetail;
  const data = res;
  return (
    <>
      {/* 그룹 리더일 때 표시할 정보 */}
      {
        /* groupDetailData.isLeader */ false && (
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
            </div>
          </>
        )
      }

      {/* 그룹 가입 요청 */}
      <RowScrollContainer>
        <div></div>
      </RowScrollContainer>
      <div className="mt-5"></div>

      {/* 본문 */}
      <div className="flex flex-col border-[#25242A] border-2 rounded bg-[#25242A33] min-h-[480px] w-full h-[90%]">
        <div className="flex flex-1 flex-col gap-4 px-5 py-5 ">
          {/* 모집글 */}
          <div className="flex flex-col text-[#B1ACC1]">
            <span className="text-white text-2xl">{data.title}</span>
            <span className="my-3 text-s ">{data.content}</span>
            <span className="text-xs mt-5">
              {data.groupName} | {dayjs(data.createdAt).fromNow()}
            </span>
          </div>

          {/* 이미지 */}
          {data.content && (
            <div className="relative w-full h-120 mx-auto my-10 flex items-center justify-center">
              <FallBackImage
                src={`${CHAMPION_IMG_URL}${data.content}.png`}
                width={120}
                height={120}
                alt={data.content}
                className="rounded object-contain"
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
            {!data.isJoined && (
              <Link
                href="/me/edit"
                className="flex items-center justify-center border border-[#323036] w-[120px] h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
              >
                가입 요청하기(요청 로직 작성 필요)
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
