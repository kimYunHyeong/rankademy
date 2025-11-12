import Link from "next/link";
import FallBackImage from "@/components/fallback-img";
import { capitalize } from "@/utils/capitalize";
import { POSITION_IMG_URL, SUMMONER_ICON_URL, TIER_IMG_URL } from "@/lib/api";
import { TeamMember, Tier } from "@/types";
import { fetchFromAPI } from "@/utils/fetcher";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

/* 목데이터 */
import { mockScrimTeamDetail } from "@/mock/scrimTeamDetail";

export type ScrimTeamDetail = {
  scrimTeamId: number;
  scrimTeamName: string;
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
  scrimTeamMembers: TeamMember[];
};

export default async function Page({
  params,
}: {
  params: Promise<{ scrimTeamId: number }>;
}) {
  const { scrimTeamId } = await params;
  /*  const res = (await fetchFromAPI(
    `scrim-teams/${scrimTeamId}`
  )).data as ScrimTeamDetail;
 */
  const data = mockScrimTeamDetail;

  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-2">
        <span>스크림</span>
      </div>
      <div className="h-10"></div>

      {/* 스크림팀 장인지 아닌지 여부에 따라 렌더링 */}
      {!data.scrimTeamId ? (
        <>
          <div className="flex justify-end text-[14px] mb-5">
            <Link
              href={`${scrimTeamId}/edit`}
              className="flex items-center justify-center border border-[#323036] w-[120px] h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
            >
              수정하기
            </Link>

            <Link
              href={`${scrimTeamId}/delete`}
              className="flex items-center justify-center border border-[#323036] w-[120px] h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
            >
              삭제하기
            </Link>
          </div>

          <div className="h-8"></div>
        </>
      ) : null}

      {/* 팀 정보 */}
      <div className="flex h-[30%]">
        {/* 첫번째 div: 그룹의 정보 표현 */}
        <div className="p-4 h-[300px] w-[85%] bg-[#25242A33] border-2 border-[#25242A] rounded mr-2.5 text-white overflow-hidden pr-24">
          {/* 이미지와 정보를 분리하는 div */}
          <div className="flex pt-5 justify-center gap-2 max-md:flex-wrap">
            <div className="flex-1 min-w-0">
              <h2 className="flex items-center text-[40px] leading-tight wrap-break-words">
                {data.scrimTeamName}
              </h2>

              {/* 시간 */}
              <div className="flex flex-wrap items-center text-[#B1ACC1] text-xs mt-5 mb-8">
                {/* 시간 */}
                <span className="wrap-break-word">
                  {dayjs(data.createdAt).fromNow()}
                </span>
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

        {/* 티어 */}
        <div className="p-4 h-[300px] w-[15%] bg-[#25242A33] border-2 border-[#25242A] rounded  text-white overflow-hidden flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <FallBackImage
              src={`${TIER_IMG_URL}${data.avgTierInfo.tier.toLowerCase()}.svg`}
              alt={data.avgTierInfo.tier.toLowerCase()}
              width={95}
              height={95}
              className="shrink-0"
            />

            <div className="flex flex-col justify-center items-center">
              <div className="flex">
                <span className="text-white mr-1">
                  {capitalize(data.avgTierInfo.tier.toLowerCase())}
                </span>

                <span className="text-white">{data.avgTierInfo.rank}</span>
              </div>

              <span className="text-[#B1ACC1] justify-center items-center">
                {data.avgTierInfo.lp}LP
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 팀 멤버 테이블 */}
      <div className="w-full overflow-x-auto mt-5">
        <table className="w-full table-fixed border-separate border-spacing-y-1">
          {/* 헤더 */}
          <thead>
            <tr className="bg-[#24192F] text-xs text-gray-300">
              <th className="rounded-l px-6 py-4 w-[8%] text-left">라인</th>
              <th className="px-6 py-4 w-[52%] text-left">유저명</th>
              <th className="px-6 py-4 w-[15%] text-left">학교</th>
              <th className="rounded-r px-6 py-4 w-[15%] text-left">티어</th>
            </tr>
          </thead>

          {/* 바디 */}
          <tbody className="text-xs">
            {data.scrimTeamMembers.map((m, i) => {
              const rank = i + 1;
              const rowBg = defaultRowClassName(rank);
              return (
                <tr
                  key={`member-${m.memberId}-${i}`}
                  className={`${rowBg} text-white`}
                >
                  {/* 라인 */}
                  <td className="rounded-l px-6 py-4 w-[8%] text-left">
                    <FallBackImage
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
                        <FallBackImage
                          src={`${SUMMONER_ICON_URL}${m.summonerIcon}.png`}
                          alt={m.summonerIcon.toString()}
                          width={30}
                          height={30}
                          className="shrink-0"
                        />
                        <span>{m.summonerName}</span>
                        <span>#{m.summonerTag}</span>
                      </div>
                    </Link>
                  </td>

                  {/* 학교 */}
                  <td className="px-6 py-4 w-[20%] text-left">
                    <span>{m.univName}</span>
                  </td>

                  {/* 티어 */}
                  <td className="rounded-r px-6 py-4 w-[12%] text-left">
                    <div className="flex items-center gap-2">
                      <FallBackImage
                        src={`${TIER_IMG_URL}${m.tierInfo.tier.toLowerCase()}.svg`}
                        alt={m.tierInfo.tier.toLowerCase()}
                        width={30}
                        height={30}
                      />
                      <div>
                        <div className="flex">
                          <span>
                            {capitalize(m.tierInfo.tier.toLowerCase())}
                          </span>
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
