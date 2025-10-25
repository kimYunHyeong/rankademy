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
import { Query } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { POSITION_IMG_URL, SUMMONER_ICON_URL } from "@/lib/api";
import { fetchFromAPI } from "@/utils/fetcher";
import { GroupCompetitionResult } from "@/types";

/* 테이블에 어떤 내용이 들어갈지 관리, 페이지에서 인자로 넘기는 것 */
export type CompetitionTableProps = {
  data: GroupCompetitionResult[];
  pageSize?: number; // 기본 10
  initialPage?: number; // 기본 1
  showCountText?: boolean; // "1–10 / 246건" 같은 표기
  onPageChange?: (page: number) => void;
  onData?: (rows: GroupCompetitionResult[], raw: any) => void;
  onLoadingChange?: (loading: boolean) => void;
  apiurl: string;
  query?: Query;
};

/* api응답에서 테이블 데이터 추출  */
function extractRows<T>(res: any): T[] {
  if (Array.isArray(res)) return res as T[];
  if (Array.isArray(res?.content)) return res.content as T[];
  if (Array.isArray(res?.data)) return res.data as T[];
  return [];
}

export default function CompetitionTable({
  data,
  apiurl,
  query,
  onData,
  onLoadingChange,
}: CompetitionTableProps) {
  // 내부 표시용 데이터 상태 (초기값은 props.data)
  const [rows, setRows] = React.useState<GroupCompetitionResult[]>(data ?? []);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<unknown>(null);

  // query / apiurl 변경 시마다 재요청
  React.useEffect(() => {
    let alive = true;

    const run = async () => {
      setLoading(true);
      onLoadingChange?.(true);
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
        onLoadingChange?.(false);
      }
    };

    run();
    return () => {
      alive = false;
    };
  }, [apiurl, JSON.stringify(query)]);

  /* 클릭 시 상세정보 확인 */
  const [openIds, setOpenIds] = React.useState<Set<string>>(new Set());
  const toggleRow = (id: string) =>
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
                    {/* ⚠️ otherTeam.groupIcon이 타입에 없다면 필드 추가하거나 아래 이미지를 제거하세요 */}
                    {/* <Image
                      src={`${CHAMPION_IMG_URL}${row.otherTeam.groupIcon}.png`}
                      alt={String(row.otherTeam.groupIcon)}
                      width={40}
                      height={40}
                    /> */}
                    <span className="ml-3">{row.otherTeam.groupName}</span>
                  </TableCell>
                  <TableCell className="border-none">
                    {row.otherTeamUnivName}
                  </TableCell>
                  <TableCell className="border-none">
                    {new Date(row.submittedAt).toLocaleString()}
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

                        <Link href="/" passHref>
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
