import Link from "next/link";
import FallBackImage from "@/components/fallback-img";
import { fetchFromAPI } from "@/utils/fetcher";
import { CHAMPION_IMG_URL } from "@/lib/api";
import GroupRecruitmentLeaderSection from "./_components/groupLeaderSection";
import { GroupJoinRequestMsg, PaginationData } from "@/types";
import NotJoinedSection from "./_components/notJoinedSection";
import { groupJoinAction } from "../../[groupId]/actions";

import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.locale("ko");

/* 목데이터 */
const mock: RecruitDetail = {
  postId: 1,
  groupId: 1,
  groupName: "string",
  title: "string",
  content: "string",
  requirements: "string",
  createdAt: "2025-11-02T06:59:25.531Z",
  isJoined: true,
  isLeader: true,
  isRecruiting: true,
};

export type RecruitDetail = {
  postId: number;
  groupId: number;
  groupName: string;
  title: string;
  content: string;
  requirements: string;
  createdAt: string;
  isJoined: boolean;
  isLeader: boolean;
  isRecruiting: boolean;
};

export type GroupJoinRequestMsgRes = {
  content: GroupJoinRequestMsg[];
  page: PaginationData;
};

export default async function RecruitDetailPage({
  params,
}: {
  params: Promise<{ groupId: number }>;
}) {
  const { groupId } = await params;

  /* 모집 게시글 데이터 */
  const data = (await fetchFromAPI(`/groups/${groupId}/post`))
    .data as RecruitDetail;

  /* 그룹 가입 요청 데이터 */
  const groupJoinRequestData: GroupJoinRequestMsg[] =
    data.isLeader === true
      ? (
          (await fetchFromAPI(`/groups/${groupId}/join-requests?page=0`))
            .data as GroupJoinRequestMsgRes
        ).content ?? []
      : [];

  return (
    <>
      {/* 그룹 리더일 때 표시할 정보 */}
      {data.isLeader && (
        <GroupRecruitmentLeaderSection
          joinReqData={groupJoinRequestData}
          groupId={groupId}
          recruitStatus={data.isRecruiting}
        />
      )}

      <div className="mt-5"></div>

      {/* 본문 */}
      <div className="flex flex-col border-[#25242A] border-2 rounded bg-[#25242A33] min-h-[480px] w-full h-[90%]">
        <div className="flex flex-1 flex-col gap-4 px-5 py-5 ">
          {/* 모집글 */}
          <div className="flex flex-col text-[#B1ACC1]">
            <span className="text-white text-2xl">{data.title}</span>

            <span className="text-xs mt-5">
              {data.groupName} | {dayjs(data.createdAt).fromNow()}
            </span>
          </div>

          {/* 본문 */}
          <div className="flex flex-col text-[#B1ACC1]">
            <span className="my-3 text-s ">{data.content}</span>
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
              <NotJoinedSection groupId={groupId} onSubmit={groupJoinAction} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
