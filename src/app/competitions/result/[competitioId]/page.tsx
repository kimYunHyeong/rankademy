import Image from "next/image";
import Link from "next/link";
import { capitalize } from "@/utils/capitalize";

type teamDetailResponse = {
  teamId: number;
  teamName: string;
  univName: string;
  groupName: string;
  groupLogo: string;
  intro: string;
  createdAt: string;
  isActive: boolean;
  avgTierInfo: {
    tier: string;
    rank: number;
    lp: number;
    mappedTier: number;
  };
  teamMembers: [
    {
      memberId: number;
      position: string;
      summonerName: string;
      summonerTag: string;
      summonerIcon: string;
      univName: string;
      admissionYear: string;
      tierInfo: {
        tier: string;
        rank: number;
        lp: number;
        mappedTier: number;
      };
    }
  ];
  isTeamLeader: boolean;
  isMyTeam: boolean;
};

const mock = {
  teamId: 1,
  teamName: "Rankademy",
  univName: "서울과학기술대학교",
  groupName: "Rankademy 그룹",
  groupLogo: "Zac",
  intro:
    "랭크 전문 팀 랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀랭크 전문 팀",
  createdAt: "2025-01-01T12:00:00",
  isActive: true,
  avgTierInfo: {
    tier: "emerald",
    rank: 1,
    lp: 0,
    mappedTier: 0,
  },
  teamMembers: [
    {
      memberId: 10,
      position: "top",
      summonerName: "Ranker",
      summonerTag: "KR1",
      summonerIcon: "Ezreal",
      univName: "서울과학기술대학교",
      admissionYear: 2021,
      tierInfo: {
        tier: "emerald",
        rank: 1,
        lp: 0,
        mappedTier: 0,
      },
    },
    {
      memberId: 11,
      position: "jungle",
      summonerName: "Ranker",
      summonerTag: "KR1",
      summonerIcon: "Ezreal",
      univName: "서울과학기술대학교",
      admissionYear: 2021,
      tierInfo: {
        tier: "emerald",
        rank: 1,
        lp: 0,
        mappedTier: 0,
      },
    },
    {
      memberId: 12,
      position: "middle",
      summonerName: "Ranker",
      summonerTag: "KR1",
      summonerIcon: "Ezreal",
      univName: "서울과학기술대학교",
      admissionYear: 2021,
      tierInfo: {
        tier: "emerald",
        rank: 1,
        lp: 0,
        mappedTier: 0,
      },
    },
    {
      memberId: 13,
      position: "bottom",
      summonerName: "Ranker",
      summonerTag: "KR1",
      summonerIcon: "Ezreal",
      univName: "서울과학기술대학교",
      admissionYear: 2021,
      tierInfo: {
        tier: "emerald",
        rank: 1,
        lp: 0,
        mappedTier: 0,
      },
    },
    {
      memberId: 14,
      position: "utility",
      summonerName: "Ranker",
      summonerTag: "KR1",
      summonerIcon: "Ezreal",
      univName: "서울과학기술대학교",
      admissionYear: 2021,
      tierInfo: {
        tier: "emerald",
        rank: 1,
        lp: 0,
        mappedTier: 0,
      },
    },
  ],
  isTeamLeader: true,
  isMyTeam: true,
};

export default function Page() {
  const data = mock;
  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-3">
        <span>대항전 (진행 전)</span>
      </div>
      <div className="h-6"></div>

      <div className="flex">
        <div className="w-[50%] justify-end">
          <Image
            src="/images/competition-red-flag.png"
            alt={"Ezreal"}
            width={320}
            height={500}
            className="shrink-0"
          />
        </div>
        {/* 첫 팀 멤버 테이블 */}
        <div className="w-[50%] h-[80%] overflow-x-auto mt-5">
          <table className="w-full table-fixed border-separate border-spacing-y-1">
            {/* 헤더 */}
            <thead>
              <tr className="bg-[#24192F] text-xs text-gray-300">
                <th className="rounded-l px-6 py-4 w-[20%] text-left">라인</th>
                <th className="px-6 py-4 w-[30%] text-left">유저명</th>
                <th className="px-6 py-4 w-[30%] text-left">전공</th>
                <th className="rounded-r px-6 py-4 w-[25%] text-left">티어</th>
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
                    <td className="rounded-l px-6 py-4 w-[20%] text-left">
                      <Image
                        src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-${m.position}.svg`}
                        alt={m.position}
                        width={32}
                        height={32}
                      />
                    </td>

                    {/* 유저명 */}
                    <td className="px-6 py-4 w-[35%] text-left">
                      <Link href={`/user/${m.memberId}`}>
                        <div className="flex items-center gap-2 min-w-0">
                          <Image
                            src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${m.summonerIcon}.png`}
                            alt={m.summonerIcon}
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
                    <td className="px-6 py-4 w-[35%] text-left">
                      <div className="flex flex-col">
                        <span>{m.admissionYear ?? "학과"}</span>
                        <span>{m.admissionYear}학번</span>
                      </div>
                    </td>

                    {/* 티어 */}
                    <td className="rounded-r px-6 py-4 w-[15%] text-left">
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
