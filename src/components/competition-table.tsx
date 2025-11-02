"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Query, CompetitionStatus } from "@/types";
import Image from "next/image";
import Link from "next/link";
import {
  CHAMPION_IMG_URL,
  POSITION_IMG_URL,
  SUMMONER_ICON_URL,
} from "@/lib/api";
import { fetchFromAPI } from "@/utils/fetcher";
import { GroupCompetitionResult } from "@/types";
import { formatDate } from "@/utils/format-date";

type Props = {
  data: GroupCompetitionResult[];
  apiurl: string;
  query?: Query;
  onData?: (rows: GroupCompetitionResult[], raw: any) => void;
  onLoadingChange?: (loading: boolean) => void;
};

/* api응답에서 테이블 데이터 추출  */
function extractRows<T>(res: any): T[] {
  if (Array.isArray(res)) return res as T[];
  if (Array.isArray(res?.content)) return res.content as T[];
  if (Array.isArray(res?.data)) return res.data as T[];
  return [];
}

export default function CompetitionTable({ data, apiurl, query }: Props) {
  // 내부 표시용 데이터 상태 (초기값은 props.data)
  const [rows, setRows] = React.useState<GroupCompetitionResult[]>(data ?? []);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<unknown>(null);

  // query / apiurl 변경 시마다 재요청
  React.useEffect(() => {
    let alive = true;

    const run = async () => {
      setLoading(true);

      setError(null);
      try {
        const res = await fetchFromAPI(apiurl, query);
        const nextRows = extractRows(res);
        if (!alive) return;
      } catch (e) {
        if (!alive) return;
        setError(e);
        console.error("CompetitionTable fetch failed:", e);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    };

    run();
    return () => {
      alive = false;
    };
  }, [apiurl, JSON.stringify(query)]);

  /* 클릭 시 상세정보 확인 */
  const [openIds, setOpenIds] = React.useState<Set<number>>(new Set());
  const toggleRow = (id: number) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <>
      <Table className="w-full border-none border-separate border-spacing-y-1 text-white text-xs">
        {/* 헤더 */}
        <TableHeader>
          <TableRow className=" bg-[#24192F] border-none pointer-events-none">
            <TableHead className="rounded-l w-[5%] text-center text-white text-xs"></TableHead>
            <TableHead className="w-[35%] text-white text-xs">그룹명</TableHead>
            <TableHead className="w-[25%] text-white text-xs">학교</TableHead>
            <TableHead className="w-[20%] text-white text-xs">
              진행일자
            </TableHead>
            <TableHead className="rounded-r w-[10%] text-white text-xs">
              결과
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => {
            const isOpen = openIds.has(row.competitionId);

            // 상태와 승패 정보
            const status = row.status as CompetitionStatus;
            const isWin = row.isWin === true;

            // 상태별 텍스트
            const statusTextMap: Record<CompetitionStatus, string> = {
              SCHEDULED: "진행중",
              COMPLETED: isWin ? "승리" : "패배",
              OPPOSED: "대기중",
              EXPIRED: "만료됨",
            };

            const statusText = statusTextMap[status] ?? "-";

            // 상태별 텍스트 색상
            const statusClass =
              status === "SCHEDULED"
                ? "text-[#B1ACC1]" // 진행중
                : status === "COMPLETED" && isWin
                ? "text-[#FF5679]" // 승리
                : "text-white"; // 패배 or 기타

            // 상태별 행 배경색
            let rowClassName = "";

            switch (status) {
              case "SCHEDULED": // 진행중
                rowClassName = "bg-[#323036] text-[#B1ACC1]  hover:bg-muted/50";
                break;
              case "COMPLETED": // 완료
                rowClassName = isWin
                  ? "bg-[#2E223F] bg-gradient-to-r from-[#FF5679]/20 to-[#2E223F]  hover:bg-muted/50" // 승리
                  : "bg-[#24192F]  hover:bg-muted/50"; // 패배
                break;
              default: // 대기중, 만료됨 등
                rowClassName = "bg-[#323036] text-[#B1ACC1] ";
                break;
            }

            return (
              <React.Fragment key={row.competitionId}>
                <TableRow
                  className={`${rowClassName} w-full h-18 [&>td]:py-4 cursor-pointer group border-none`}
                  onClick={
                    /* 완료상태인 대항전만 전적을 보여주도록 */
                    row.status === "COMPLETED"
                      ? () => toggleRow(row.competitionId)
                      : undefined
                  }
                >
                  {row.status === "SCHEDULED" ? (
                    <Link
                      href={`/competitions/result/${row.competitionId}`}
                      className="contents"
                    >
                      <TableCell className="rounded-l text-center border-none">
                        VS
                      </TableCell>
                      <TableCell className=" border-none">
                        <div className="flex items-center">
                          {/* 그룹 아이콘 | 그룹 이름 */}
                          {/*  <Image
                            src={`${CHAMPION_IMG_URL}${row.otherTeam.groupIcon}.png`}
                            alt={row.otherTeam.groupIcon}
                            width={40}
                            height={40}
                          /> */}
                          <span className="ml-3 justify-center">
                            {row.otherTeam.groupName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="border-none">
                        {/* 학교 */}
                        {row.otherTeamUnivName}
                      </TableCell>
                      <TableCell className="border-none">
                        {/* 진행일자 */}
                        {formatDate(row.submittedAt)}
                      </TableCell>
                      <TableCell
                        /* 결과 */
                        className={`rounded-r border-none ${statusClass}`}
                      >
                        {statusText}
                      </TableCell>
                    </Link>
                  ) : (
                    <>
                      <TableCell className="rounded-l text-center border-none">
                        VS
                      </TableCell>
                      <TableCell className=" border-none">
                        <div className="flex items-center">
                          {/* 그룹 아이콘 | 그룹 이름 */}
                          {/*  <Image
                            src={`${CHAMPION_IMG_URL}${row.otherTeam.groupIcon}.png`}
                            alt={row.otherTeam.groupIcon}
                            width={40}
                            height={40}
                          /> */}
                          <span className="ml-3 justify-center">
                            {row.otherTeam.groupName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="border-none">
                        {/* 학교 */}
                        {row.otherTeamUnivName}
                      </TableCell>
                      <TableCell className="border-none">
                        {/* 진행일자 */}
                        {formatDate(row.submittedAt)}
                      </TableCell>
                      <TableCell
                        /* 결과 */
                        className={`rounded-r border-none ${statusClass}`}
                      >
                        {statusText}
                      </TableCell>
                    </>
                  )}
                </TableRow>

                {/* 열었을 때 나오는 아코디언 데이터 */}
                {isOpen && (
                  <TableRow className="border-none hover:bg-transparent! transition-none">
                    <TableCell
                      colSpan={5}
                      className="w-full p-0 bg-transparent! "
                    >
                      <div className="rounded bg-[#25242A33] p-4 md:p-6 text-xs h-120 grid grid-rows-[9fr_1fr] overflow-hidden">
                        <div className="grid  grid-cols-[3fr_4fr_3fr] gap-6 items-stretch min-h-0">
                          {/* 왼쪽: 우리팀 */}
                          <div>
                            <div className="flex flex-col mb-5">
                              <span className="text-white text-[24px]">
                                {row.myTeam.teamName}
                              </span>
                              <span className="text-[#B1ACC1] text-[16px]">
                                {row.myTeam.groupName}
                              </span>
                            </div>

                            {/* 우리팀 유저 정보 */}
                            <div className="flex flex-col gap-2">
                              {row.myTeam.teamMembers.map((member, idx) => (
                                <div
                                  key={member.memberId ?? idx}
                                  className="flex items-center gap-2"
                                >
                                  <Image
                                    src={`${POSITION_IMG_URL}${member.position.toLowerCase()}.svg`}
                                    alt={String(member.position)}
                                    width={40}
                                    height={40}
                                    className="mb-3"
                                  />
                                  <Link href={`/user/${member.memberId}`}>
                                    <div className="flex items-center ml-8 mb-3">
                                      <Image
                                        src={`${SUMMONER_ICON_URL}${member.summonerIcon}.png`}
                                        alt={String(member.summonerIcon)}
                                        width={40}
                                        height={40}
                                        className="rounded"
                                      />
                                      <span className="ml-2">
                                        {member.summonerName}
                                      </span>
                                      <span className="ml-1">
                                        #{member.summonerTag}
                                      </span>
                                    </div>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 가운데: 승패 정보 */}
                          <div className="flex flex-col h-full self-stretch min-h-0 items-center justify-start select-none px-15">
                            {(() => {
                              const myId = row.myTeam.teamId;
                              const sets = [...row.setResults].sort(
                                (a, b) => a.setNumber - b.setNumber
                              );
                              const leftWins = sets.filter(
                                (s) => s.winnerTeamId === myId
                              ).length;
                              const rightWins = sets.length - leftWins;

                              return (
                                <>
                                  <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full mb-6">
                                    <div className="text-[45px] text-[#FF5679] justify-self-start">
                                      {leftWins}
                                    </div>
                                    <div className="text-2xl text-[#B1ACC1] justify-self-center">
                                      vs
                                    </div>
                                    <div className="text-[45px] text-[#B1ACC1] justify-self-end">
                                      {rightWins}
                                    </div>
                                  </div>

                                  <div className="w-full mt-7 flex-1 min-h-0 space-y-4 overflow-y-auto items-center justify-center">
                                    {sets.map((s, i) => {
                                      const leftWin = s.winnerTeamId === myId;
                                      return (
                                        <div
                                          key={s.setNumber ?? i}
                                          className="grid grid-cols-[1fr_auto_1fr] items-center w-full"
                                        >
                                          <span
                                            className={`text-2xl tracking-wider justify-self-start ${
                                              leftWin
                                                ? "text-[#FF5679]"
                                                : "text-[#B1ACC1]"
                                            }`}
                                          >
                                            {leftWin ? "W" : "L"}
                                          </span>
                                          <span className="text-[#B1ACC1] justify-self-center">
                                            Game {s.setNumber}
                                          </span>
                                          <span
                                            className={`text-2xl tracking-wider justify-self-end ${
                                              leftWin
                                                ? "text-[#B1ACC1]"
                                                : "text-[#FF5679]"
                                            }`}
                                          >
                                            {leftWin ? "L" : "W"}
                                          </span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </>
                              );
                            })()}
                          </div>

                          {/* 오른쪽: 상대팀 */}
                          <div>
                            <div className="flex flex-col mb-5">
                              <span className="text-white text-[24px]">
                                {row.otherTeam.teamName}
                              </span>
                              <span className="text-[#B1ACC1] text-[16px]">
                                {row.otherTeam.groupName}
                              </span>
                            </div>

                            <div className="flex flex-col gap-2">
                              {row.otherTeam.teamMembers.map((member, idx) => (
                                <div
                                  key={member.memberId ?? idx}
                                  className="flex items-center gap-2"
                                >
                                  <Image
                                    src={`${POSITION_IMG_URL}${member.position.toLocaleLowerCase()}.svg`}
                                    alt={String(
                                      member.position.toLocaleLowerCase()
                                    )}
                                    width={40}
                                    height={40}
                                    className="mb-3"
                                  />
                                  <Link href={`/user/${member.memberId}`}>
                                    <div className="flex items-center ml-8 mb-3">
                                      <Image
                                        src={`${SUMMONER_ICON_URL}${member.summonerIcon}.png`}
                                        alt={String(member.summonerIcon)}
                                        width={40}
                                        height={40}
                                        className="rounded"
                                      />
                                      <span className="ml-2">
                                        {member.summonerName}
                                      </span>
                                      <span className="ml-1">
                                        #{member.summonerTag}
                                      </span>
                                    </div>
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <Link href="/">
                          <div className="flex justify-center items-center text-center border border-[#323036] rounded text-xl bg-[#25242A33] h-11 cursor-pointer">
                            이의신청하기
                          </div>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}
