import Link from "next/link";
import CheckPopup from "@/components/check-popup";
import Image from "next/image";
import { capitalize } from "@/utils/capitalize";

type scrimTeamDetailResponse = {
  scrimTeamId: number;
  scrimTeamName: string;
  intro: string;
  createdAt: string;
  isActive: boolean;
  avgTierInfo: {
    tier: string;
    rank: string;
    lp: number;
    mappedTier: number;
  };
  scrimTeamMembers: [
    {
      memberId: number;
      position: string;
      summonerName: string;
      summonerTag: string;
      summonerIcon: number;
      univName: string;
      tierInfo: {
        tier: string;
        rank: string;
        lp: number;
        mappedTier: number;
      };
    }
  ];
};

// ✅ 배열로 수정된 타입
type ScrimTeamDetailResponse = {
  scrimTeamId: number;
  scrimTeamName: string;
  intro: string;
  createdAt: string;
  isActive: boolean;
  avgTierInfo: {
    tier: string;
    rank: string; // number가 아니라 string
    lp: number;
    mappedTier: number;
  };
  scrimTeamMembers: {
    memberId: number;
    position: string;
    summonerName: string;
    summonerTag: string;
    summonerIcon: number; // 프로필 아이콘 ID 등 숫자
    univName: string;
    tierInfo: {
      tier: string;
      rank: string; // number가 아니라 string
      lp: number;
      mappedTier: number;
    };
  }[];
};

const mock: ScrimTeamDetailResponse = {
  scrimTeamId: 1,
  scrimTeamName: "Rankademy",
  intro:
    "랭크 전문 팀 랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀",
  createdAt: "2025-01-01T12:00:00",
  isActive: true,
  avgTierInfo: {
    tier: "emerald",
    rank: "1", // ← string으로 변환
    lp: 0,
    mappedTier: 0,
  },
  scrimTeamMembers: [
    {
      memberId: 10,
      position: "top",
      summonerName: "Ranker",
      summonerTag: "KR1",
      summonerIcon: 0, // ← 숫자 필요: 임시 값
      univName: "서울과학기술대학교",
      tierInfo: { tier: "emerald", rank: "1", lp: 0, mappedTier: 0 },
    },
    {
      memberId: 11,
      position: "jungle",
      summonerName: "Ranker",
      summonerTag: "KR1",
      summonerIcon: 0,
      univName: "서울과학기술대학교",
      tierInfo: { tier: "emerald", rank: "1", lp: 0, mappedTier: 0 },
    },
    {
      memberId: 12,
      position: "middle",
      summonerName: "Ranker",
      summonerTag: "KR1",
      summonerIcon: 0,
      univName: "서울과학기술대학교",
      tierInfo: { tier: "emerald", rank: "1", lp: 0, mappedTier: 0 },
    },
    {
      memberId: 13,
      position: "bottom",
      summonerName: "Ranker",
      summonerTag: "KR1",
      summonerIcon: 0,
      univName: "서울과학기술대학교",
      tierInfo: { tier: "emerald", rank: "1", lp: 0, mappedTier: 0 },
    },
    {
      memberId: 14,
      position: "utility",
      summonerName: "Ranker",
      summonerTag: "KR1",
      summonerIcon: 0,
      univName: "서울과학기술대학교",
      tierInfo: { tier: "emerald", rank: "1", lp: 0, mappedTier: 0 },
    },
  ],
};

export default function Page() {
  const data = mock;
  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-2">
        <span>스크림</span>
      </div>
      <div className="h-10"></div>

      <div className="flex justify-end text-[14px] mb-5">
        <Link
          href={`${1}/edit`}
          className="flex items-center justify-center border border-[#323036] w-[120px] h-[44px] text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
        >
          수정하기
        </Link>

        <Link
          href={`${1}/delete`}
          className="flex items-center justify-center border border-[#323036] w-[120px] h-[44px] text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
        >
          삭제하기
        </Link>
      </div>

      <div className="h-8"></div>

      {/* 팀 정보 */}
      <div className="flex h-[30%]">
        {/* 첫번째 div: 그룹의 정보 표현 */}
        <div className="p-4 h-[300px] w-[80%] bg-[#25242A33] border-2 border-[#25242A] rounded mr-[10px] text-white overflow-hidden pr-24">
          {/* 이미지와 정보를 분리하는 div */}
          <div className="flex pt-[20px] justify-center gap-2 max-md:flex-wrap">
            <div className="flex-1 min-w-0">
              <h2 className="flex items-center text-[40px] leading-tight break-words">
                {data.scrimTeamName}
              </h2>

              {/* 시간 */}
              <div className="flex flex-wrap items-center text-[#B1ACC1] text-xs mt-5 mb-8">
                {/* 시간 */}
                <span className="break-words">{data.createdAt}</span>
              </div>

              <div className="h-3" />

              {/* 팀 설명: 높이 제한 + 휠 스크롤 가능(스크롤바 숨김) */}
              <div
                className="
                          text-[#B1ACC1]
                             max-h-20 overflow-y-auto
                             [scrollbar-width:none] [-ms-overflow-style:none]
                             [&::-webkit-scrollbar]:hidden
                              break-words
                          "
              >
                {data.intro}
              </div>
            </div>
          </div>
        </div>

        {/* 티어 */}
        <div className="p-4 h-[300px] w-[20%] bg-[#25242A33] border-2 border-[#25242A] rounded mr-[10px] text-white overflow-hidden flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/ranked-mini-crests/${data.avgTierInfo.tier}.svg`}
              alt={data.avgTierInfo.tier}
              width={95}
              height={95}
              className="shrink-0"
            />

            <div className="flex flex-col justify-center items-center">
              <div className="flex">
                <span className="text-white mr-1">
                  {capitalize(data.avgTierInfo.tier)}
                </span>

                <span className="text-white">{data.avgTierInfo.rank}</span>
              </div>

              <span className="text-[#B1ACC1] justify-center items-center">
                {data.avgTierInfo.lp}
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
              <th className="px-6 py-4 w-[15%] text-left">전공</th>
              <th className="rounded-r px-6 py-4 w-[15%] text-left">티어</th>
            </tr>
          </thead>

          {/* 바디 */}
          <tbody className="text-xs">
            {data.scrimTeamMembers.map((m, i) => {
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
                      src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-${m.position}.svg`}
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
                          src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/profileicon/${m.summonerIcon}.png`}
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
                    <span>{m.univName}</span>
                  </td>

                  {/* 티어 */}
                  <td className="rounded-r px-6 py-4 w-[12%] text-left">
                    <div className="flex items-center gap-2">
                      <Image
                        src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/ranked-mini-crests/${m.tierInfo.tier}.svg`}
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
