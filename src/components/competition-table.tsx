"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { position } from "@/types";
import Image from "next/image";
import Link from "next/link";

type memberDTO = {
  memberId: string | number;
  position: position;
  summonerName: string;
  summonerTag: string;
  summonerIcon: string;
};

type competition = {
  competitionId: string | number;
  otherTeamUnivName: string;
  status: string;
  myTeam: {
    teamId: number;
    teamName: string;
    groupName: string;
    teamMembers: memberDTO[];
  };
  otherTeam: {
    teamId: number;
    teamName: string;
    groupName: string;
    groupIcon: string;
    teamMembers: memberDTO[];
  };
  submittedAt: string;
  isWin: boolean;
  setResults: setResults[];
};

type setResults = {
  setNumber: number;
  winnerTeamId: number;
};

export type ApiResponse = {
  totalCount: number;
  competitions: competition[];
};

export default function CompetitionTable({ data }: { data: ApiResponse }) {
  const competitions = data.competitions;
  const [openIds, setOpenIds] = React.useState<Set<string>>(new Set());
  const toggleRow = (id: string) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  // ✅ 페이지네이션 상태
  const pageSize = 15; // 한 페이지에 보여줄 행 수
  const [page, setPage] = React.useState(1);

  const total = data.competitions.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pageData = data.competitions.slice(start, end);

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
          {pageData.map((row) => {
            const isOpen = openIds.has(row.competitionId.toString());
            const isWin = row.isWin === true;
            const rowClassName = isWin
              ? "bg-[#2E223F] bg-gradient-to-r from-[#FF5679]/20 to-[#2E223F]"
              : "bg-[#24192F]";

            return (
              <React.Fragment key={row.competitionId}>
                <TableRow
                  className={`${rowClassName} [&>td]:py-4 cursor-pointer group border-none hover:bg-gray-700/50 transition-colors`}
                  onClick={() => toggleRow(row.competitionId.toString())}
                >
                  <TableCell className="rounded-l text-center border-none">
                    VS
                  </TableCell>
                  <TableCell className=" flex items-center border-none">
                    <Image
                      src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${row.otherTeam.groupIcon}.png`}
                      alt={row.otherTeam.groupIcon}
                      width={40}
                      height={40}
                    />
                    <span className="ml-3">{row.otherTeam.groupName}</span>
                  </TableCell>
                  <TableCell className="border-none">
                    {row.otherTeamUnivName}
                  </TableCell>
                  <TableCell className="border-none">
                    {row.submittedAt.toString()}
                  </TableCell>
                  <TableCell
                    className={`rounded-r border-none ${
                      isWin ? "text-[#FF5679]" : "text-white"
                    }`}
                  >
                    {isWin ? "승리" : "패배"}
                  </TableCell>
                </TableRow>

                {/* 열었을 때 나오는 아코디언 데이터 */}
                {isOpen && (
                  <TableRow className="border-none hover:!bg-transparent transition-none">
                    <TableCell
                      colSpan={5}
                      className="w-full p-0 !bg-transparent "
                    >
                      <div className="rounded bg-[#25242A33] p-4 md:p-6 text-xs h-120 grid grid-rows-[9fr_1fr] overflow-hidden">
                        <div className="grid  grid-cols-[3fr_4fr_3fr] gap-6 items-start">
                          {/* 왼쪽: 우리팀 */}
                          <div>
                            {/* 우리학교 그룹 정보 */}
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
                                  {/* 포지션 아이콘 */}
                                  <Image
                                    src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-${member.position}.svg`}
                                    alt={member.position}
                                    width={40}
                                    height={40}
                                  />
                                  {/* 소환사 정보 */}
                                  <Link href={`/user/${member.memberId}`}>
                                    <div className="flex items-center ml-8 mb-3">
                                      <Image
                                        src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${member.summonerIcon}.png`}
                                        alt={member.summonerIcon}
                                        width={40}
                                        height={40}
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
                          <div className="flex flex-col items-center justify-start select-none  px-15">
                            {(() => {
                              // 안전하게 정렬 + 승수 계산
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
                                  {/* 총 스코어 */}
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

                                  {/* 게임별 스코어 라인업 */}
                                  <div className="w-full space-y-4 mt-7">
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
                            {/* 상대 그룹 정보 */}
                            <div className="flex flex-col mb-5">
                              <span className="text-white text-[24px]">
                                {row.otherTeam.teamName}
                              </span>
                              <span className="text-[#B1ACC1] text-[16px]">
                                {row.otherTeam.groupName}
                              </span>
                            </div>

                            {/* 상대 유저 정보 */}
                            <div className="flex flex-col gap-2">
                              {row.otherTeam.teamMembers.map((member, idx) => (
                                <div
                                  key={member.memberId ?? idx}
                                  className="flex items-center gap-2"
                                >
                                  <Image
                                    src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-${member.position}.svg`}
                                    alt={member.position}
                                    width={40}
                                    height={40}
                                  />
                                  <Link href={`/user/${member.memberId}`}>
                                    <div className="flex items-center ml-8 mb-3">
                                      <Image
                                        src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${member.summonerIcon}.png`}
                                        alt={member.summonerIcon}
                                        width={40}
                                        height={40}
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

                        {/* 아랫부분: 이의신청*/}
                        <Link href="/" passHref>
                          <div className="flex justify-center items-center text-center border border-[#323036] rounded text-xl bg-[#25242A33] h-13 cursor-pointer">
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

      {/* 페이지네이션 */}
      <div className="w-full mt-4">
        <Pagination className="w-full">
          <PaginationContent className="flex w-full justify-between items-center">
            {/* 왼쪽: 이전 버튼 */}
            <div>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className={`rounded-sm w-[28px] h-[28px] px-3 py-1 text-xs font-medium transition-colors
              border border-[#323036] text-[#B1ACC1]
              hover:bg-[#FF5679] hover:text-[#110D17] hover:border-none
              ${page === 1 ? "pointer-events-none opacity-50" : ""}`}
                />
              </PaginationItem>
            </div>

            {/* 가운데: 페이지 숫자 */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={page === i + 1}
                    onClick={() => setPage(i + 1)}
                    className={`w-[28px] h-[28px] rounded-sm px-3 py-1 text-xs font-medium transition-colors
                ${
                  page === i + 1
                    ? "bg-[#FF5679] text-[#110D17] border-none"
                    : "border border-[#323036] text-[#B1ACC1] hover:bg-[#FF5679] hover:text-[#110D17] hover:border-none"
                }`}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </div>

            {/* 오른쪽: 다음 버튼 */}
            <div>
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className={`rounded-sm w-[28px] h-[28px] px-3 py-1 text-xs font-medium transition-colors
              border border-[#323036] text-[#B1ACC1]
              hover:bg-[#FF5679] hover:text-[#110D17] hover:border-none
              ${page === totalPages ? "pointer-events-none opacity-50" : ""}`}
                />
              </PaginationItem>
            </div>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
