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
  competitionId: 1,
  status: "SCHEDULED",
  team1: {
    teamId: 1,
    teamName: "Rankademy",
    univName: "서울과학기술대학교",
    groupName: "Rankademy 그룹",
    groupLogo: "string",
    intro: "랭크 전문 팀",
    createdAt: "2025-01-01T12:00:00",
    isActive: true,
    avgTierInfo: {
      tier: "unranked",
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
          tier: "unranked",
          rank: 1,
          lp: 0,
          mappedTier: 0,
        },
      },
    ],
    isTeamLeader: true,
    isMyTeam: true,
  },
  team2: {
    teamId: 1,
    teamName: "Rankademy",
    univName: "서울과학기술대학교",
    groupName: "Rankademy 그룹",
    groupLogo: "string",
    intro: "랭크 전문 팀",
    createdAt: "2025-01-01T12:00:00",
    isActive: true,
    avgTierInfo: {
      tier: "UNRANKED",
      rank: "I",
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
          tier: "UNRANKED",
          rank: "I",
          lp: 0,
          mappedTier: 0,
        },
      },
    ],
    isTeamLeader: true,
    isMyTeam: true,
  },
};

export default function Page() {
  const data = mock;
  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-3">
        <span>대항전 (진행 전)</span>
      </div>

      {/* 본문 */}
      <div className="flex flex-col w-full justify-center items-center">
        {/* 주의문구 | 결과등록 */}
        <div className="flex w-full my-6 items-center gap-5">
          <div className="flex justify-center items-center rounded w-[90%] h-[44px] bg-[#25242A] text-white">
            <Image
              src="/images/caution-triangle.png"
              alt="경고"
              width={24}
              height={24}
              className="object-contain ml-5 mr-1"
            />
            <span>경기 결과 화면을 꼭 캡쳐해주세요</span>
          </div>

          <Link
            href={`${data.competitionId}/register`}
            className="flex items-center justify-center w-[10%] h-[44px] text-white rounded bg-[#FF567933] text-center"
          >
            결과등록
          </Link>
        </div>

        {/* 1팀 정보 */}
        <div className="flex gap-5">
          {/* 빨간 깃발 */}
          <div className="w-[30%] relative flex ">
            {/* 깃발 배경 */}
            <Image
              src="/images/competition-flag-red.png"
              alt="flag-red"
              width={320}
              height={500}
              className="shrink-0 select-none"
              priority
            />
            {/* 오버레이: 가운데 정렬 */}
            <div className="absolute inset-0 grid place-items-center pointer-events-none">
              <div className="flex flex-col items-center text-center -translate-y-6">
                {/* 로고 + 테두리 (완전 겹치기) */}
                <div className="relative w-[240px] h-[240px] mb-6">
                  {/* 학교 로고 */}
                  <Image
                    src={`/univ-emblem/${data.team1.univName}.png`}
                    alt={data.team1.univName}
                    fill
                    className="object-contain rounded-full z-10 -translate-y-[10px]"
                  />
                  {/* 로고 테두리 오버레이 */}
                  <Image
                    src="/images/competition-flag-round-red.png"
                    alt="logo-border"
                    fill
                    className="object-contain z-20 scale-110"
                  />
                </div>
                {/* 텍스트 */}
                <div className="max-w-[260px]">
                  <div className="text-[#FF5679] text-lg font-semibold drop-shadow-lg">
                    {data.team1.teamName}
                  </div>

                  <div className="text-[#B1ACC1] text-sm mt-2 drop-shadow-lg">
                    {data.team1.univName} | {data.team1.groupName}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 첫 팀 멤버 테이블 */}
          <div className="w-[70%] h-[80%] overflow-x-auto mt-5">
            <table className="w-full table-fixed border-separate border-spacing-y-1">
              {/* 헤더 */}
              <thead>
                <tr className="bg-[#24192F] text-xs text-gray-300">
                  <th className="rounded-l px-6 py-4 w-[20%] text-left">
                    라인
                  </th>
                  <th className="px-6 py-4 w-[30%] text-left">유저명</th>
                  <th className="px-6 py-4 w-[30%] text-left">전공</th>
                  <th className="rounded-r px-6 py-4 w-[25%] text-left">
                    티어
                  </th>
                </tr>
              </thead>

              {/* 바디 */}
              <tbody className="text-xs">
                {data.team1.teamMembers.map((m, i) => {
                  const rank = i + 1;
                  const rowBg = defaultRowClassName(rank);
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
        <div className="flex items-center justify-center h-30">
          <Image
            src="/images/competition-versus.png"
            alt="versus-icon"
            width={58}
            height={106}
          />
        </div>

        {/* 2팀 정보 */}
        <div className="flex gap-5">
          {/* 2팀 멤버 테이블 */}
          <div className="w-[70%] h-[80%] overflow-x-auto mt-5">
            <table className="w-full table-fixed border-separate border-spacing-y-1">
              {/* 헤더 */}
              <thead>
                <tr className="bg-[#24192F] text-xs text-gray-300">
                  <th className="rounded-l px-6 py-4 w-[20%] text-left">
                    라인
                  </th>
                  <th className="px-6 py-4 w-[30%] text-left">유저명</th>
                  <th className="px-6 py-4 w-[30%] text-left">전공</th>
                  <th className="rounded-r px-6 py-4 w-[25%] text-left">
                    티어
                  </th>
                </tr>
              </thead>

              {/* 바디 */}
              <tbody className="text-xs">
                {data.team2.teamMembers.map((m, i) => {
                  const rank = i + 1;
                  const rowBg = defaultRowClassName(rank);
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
          <div className="w-[30%] relative flex justify-center">
            {/* 깃발 배경 */}

            <Image
              src="/images/competition-flag-blue.png"
              alt="flag-blue"
              width={320}
              height={500}
              className="shrink-0 select-none"
              priority
            />

            {/* 오버레이: 가운데 정렬 */}

            <div className="absolute inset-0 grid place-items-center pointer-events-none">
              <div className="flex flex-col items-center text-center -translate-y-6">
                {/* 로고 + 테두리 (완전 겹치기) */}
                <div className="relative w-[240px] h-[240px] mb-6">
                  {/* 학교 로고 */}
                  <Image
                    src={`/univ-emblem/${data.team2.univName}.png`}
                    alt={data.team2.univName}
                    fill
                    className="object-contain rounded-full z-10 -translate-y-[10px]"
                  />
                  {/* 로고 테두리 오버레이 */}
                  <Image
                    src="/images/competition-flag-round-blue.png"
                    alt="logo-border"
                    fill
                    className="object-contain z-20 scale-110"
                  />
                </div>
                {/* 텍스트 */}
                <div className="max-w-[260px]">
                  <div className="text-[#467BFF] text-lg font-semibold drop-shadow-lg">
                    {data.team2.teamName}
                  </div>

                  <div className="text-[#B1ACC1] text-sm mt-2 drop-shadow-lg">
                    {data.team2.univName} | {data.team2.groupName}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
