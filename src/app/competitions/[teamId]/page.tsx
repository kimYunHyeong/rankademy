import Link from "next/link";
import CheckPopup from "@/components/check-popup";
import RowScrollContainer from "@/components/row-scroll-container";
import Image from "next/image";
import { capitalize } from "@/utils/capitalize";
import { Position, Tier } from "@/types";
import {
  CHAMPION_IMG_URL,
  POSITION_IMG_URL,
  SUMMONER_ICON_URL,
  TIER_IMG_URL,
} from "@/lib/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

import { mockTeamDetail } from "@/mock/teamDeatil";
import { fetchFromAPI } from "@/utils/fetcher";

export type TeamMember = {
  memberId: number;
  position: Position;
  summonerName: string;
  summonerTag: string;
  summonerIcon: number;
  univName: string;
  major: string;
  admissionYear: number;
  tierInfo: {
    tier: Tier;
    rank: string;
    lp: number;
    mappedTier: number;
    flattenString: string;
  };
};

export type TeamDetail = {
  teamId: number;
  teamName: string;
  univName: string;
  groupName: string;
  groupLogo: string;
  intro: string;
  createdAt: string;
  isActive: boolean;
  avgTierInfo: {
    tier: Tier;
    rank: string;
    lp: number;
    mappedTier: number;
    flattenString: string;
  };
  teamMembers: TeamMember[];
  isTeamLeader: boolean;
  isMyTeam: boolean;
};

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const { teamId } = await params;

  /* const res = (await fetchFromAPI(`/teams/${teamId}`)) as TeamDetail; */
  const data = mockTeamDetail;
  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-2">
        <span>대항전</span>
      </div>
      <div className="h-10"></div>

      {/* 팀장 렌더링 | 팀원 렌더링 */}
      {data.isMyTeam && data.isTeamLeader ? (
        <>
          <div className="flex text-[14px] mb-5">
            <Link
              href={`${teamId}/delete`}
              className="flex items-center justify-center border border-[#323036] w-[120px] h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
            >
              게시글 삭제
            </Link>
            <Link
              href={`${teamId}/edit`}
              className="flex items-center justify-center border border-[#323036] w-[120px] h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
            >
              게시글 수정
            </Link>
          </div>

          {/* 대항전 관련 알람 */}
          <RowScrollContainer>
            <CheckPopup />
          </RowScrollContainer>
          <div className="mb-8"></div>
        </>
      ) : data.isMyTeam && !data.isTeamLeader ? (
        <div className="flex justify-end mb-8">
          <Link
            href={`${teamId}/request`}
            className=" text-[#B1ACC1] border border-[#323036] rounded p-2 cursor-pointer hover:bg-[#FF567920] transition-colors "
          >
            팀 탈퇴하기
          </Link>
        </div>
      ) : null}

      {/* 팀 정보 */}
      <div className="flex h-[30%]">
        {/* 첫번째 div: 그룹의 정보 표현 */}
        <div className="p-4 h-[300px] w-[75%] bg-[#25242A33] border-2 border-[#25242A] rounded mr-2.5 text-white overflow-hidden pr-24">
          {/* 이미지와 정보를 분리하는 div */}
          <div className="flex pt-5 justify-center gap-2 max-md:flex-wrap">
            <div className="flex-1 min-w-0">
              <h2 className="flex items-center text-[40px] leading-tight wrap-break-word">
                {data.teamName}
              </h2>

              {/* 그룹 | 시간 | 평균티어 */}
              <div className="flex flex-wrap items-center text-[#B1ACC1] text-xs mt-5 mb-8">
                {/* 그룹 */}
                <span className="wrap-break-word">{data.groupName}</span>
                <span className="mx-2 opacity-50">|</span>

                {/* 학교 */}
                <span className="wrap-break-wordword">{data.univName}</span>
                <span className="mx-2 opacity-50">|</span>

                {/* 시간 */}
                <span className="wrap-break-word">
                  {dayjs(data.createdAt).fromNow()}
                </span>
                <span className="mx-2 opacity-50">|</span>

                {/* 티어 */}
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <Image
                      src={`${TIER_IMG_URL}${data.avgTierInfo.tier.toLowerCase()}.svg`}
                      alt={data.avgTierInfo.tier}
                      width={30}
                      height={30}
                      className="shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex">
                        <span>
                          {capitalize(data.avgTierInfo.tier.toLowerCase())}
                        </span>
                        <span className="w-1" />
                        <span>{data.avgTierInfo.rank}</span>
                      </div>
                      <span>{data.avgTierInfo.lp}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-3" />

              {/* 팀 설명: 높이 제한 + 휠 스크롤 가능(스크롤바 숨김) */}
              <div
                className="
                          text-[#B1ACC1]
                             max-h-20 overflow-y-auto
                             [scrollbar-width:none] [-ms-overflow-style:none]
                             [&::-webkit-scrollbar]:hidden
                              wrap-break-word
                          "
              >
                {data.intro}
              </div>
            </div>
          </div>
        </div>
        <Image
          src={`${CHAMPION_IMG_URL}${data.groupLogo}.png`}
          alt={data.groupLogo}
          width={300}
          height={300}
          className="w-[25%] h-[300px] rounded-2xl ml-5 shrink-0"
        />
      </div>

      {/* 팀 멤버 테이블 */}
      <div className="w-full overflow-x-auto mt-5">
        <table className="w-full table-fixed border-separate border-spacing-y-1">
          {/* 헤더 */}
          <thead>
            <tr className="bg-[#24192F] text-xs text-gray-300">
              <th className="rounded-l px-6 py-4 w-[8%] text-left">라인</th>
              <th className="px-6 py-4 w-[52%] text-left">유저명</th>
              <th className="px-6 py-4 w-[15%] text-left">전공</th>
              <th className="rounded-r px-6 py-4 w-[15%] text-left">티어</th>
            </tr>
          </thead>

          {/* 바디 */}
          <tbody className="text-xs">
            {data.teamMembers.map((m, i) => {
              const rank = i + 1;
              const rowBg = defaultRowClassName(rank); // ⬅️ 행 색상 결정
              return (
                <tr
                  key={`member-${m.memberId}-${i}`}
                  className={`${rowBg} text-white`}
                >
                  {/* 라인 */}
                  <td className="rounded-l px-6 py-4 w-[8%] text-left">
                    <Image
                      src={`${POSITION_IMG_URL}${m.position.toLowerCase()}.svg`}
                      alt={m.position}
                      width={32}
                      height={32}
                    />
                  </td>

                  {/* 유저명 */}
                  <td className="px-6 py-4 w-[20%] text-left">
                    <Link href={`/user/${m.memberId}`}>
                      <div className="flex items-center gap-2 min-w-0">
                        <Image
                          src={`${SUMMONER_ICON_URL}${m.summonerIcon}.png`}
                          alt={m.summonerIcon.toString()}
                          width={30}
                          height={30}
                          className="shrink-0"
                        />
                        <span className="truncate">{m.summonerName}</span>
                        <span className="shrink-0">#{m.summonerTag}</span>
                      </div>
                    </Link>
                  </td>

                  {/* 전공/학번 */}
                  <td className="px-6 py-4 w-[20%] text-left">
                    <div className="flex flex-col">
                      <span>{m.major}</span>
                      <span>{m.admissionYear}학번</span>
                    </div>
                  </td>

                  {/* 티어 */}
                  <td className="rounded-r px-6 py-4 w-[12%] text-left">
                    <div className="flex items-center gap-2">
                      <Image
                        src={`${TIER_IMG_URL}${m.tierInfo.tier.toLowerCase()}.svg`}
                        alt={m.tierInfo.tier}
                        width={30}
                        height={30}
                      />
                      <div>
                        <div className="flex">
                          <span>{capitalize(m.tierInfo.tier)}</span>
                          <span className="w-1" />
                          <span>{m.tierInfo.rank}</span>
                        </div>
                        <span>{m.tierInfo.lp}</span>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 팀원이 아닐 시 결투 신청하기 렌더링 */}
      {!data.isMyTeam ? (
        <div className="flex justify-end mt-5">
          <Link
            href={`${teamId}/request`}
            className=" text-[#B1ACC1] border border-[#323036] rounded p-2 cursor-pointer hover:bg-[#FF567920] transition-colors "
          >
            결투 신청하기
          </Link>
        </div>
      ) : null}
    </>
  );
}

/* 행 스타일: 1~3위 그라데이션 + 짝/홀 배경색 */
function defaultRowClassName(rank: number) {
  const isTop3 = rank <= 3;
  const even = rank % 2 === 0;

  if (even) {
    return "bg-[#24192F]";
  } else {
    return "bg-[#2E223F]";
  }
}
