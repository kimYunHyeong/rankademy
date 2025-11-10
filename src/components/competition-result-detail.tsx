import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { POSITION_IMG_URL, SUMMONER_ICON_URL } from "@/lib/api";
import { GroupCompetitionResult } from "@/types";
import FallBackImage from "./fallback-img";
import { opposeCompetition } from "@/app/groups/actions";

export default function CompetitionResultDetail({
  data,
  isJoined,
}: {
  data: GroupCompetitionResult;
  isJoined: boolean;
}) {
  return (
    <>
      <TableRow className="border-none hover:bg-transparent! transition-none">
        <TableCell colSpan={5} className="w-full p-0 bg-transparent! ">
          <div className="rounded bg-[#25242A33] p-4 md:p-6 text-xs h-120 grid grid-rows-[9fr_1fr] overflow-hidden">
            <div className="grid  grid-cols-[3fr_4fr_3fr] gap-6 items-stretch min-h-0">
              {/* 왼쪽: 우리팀 */}
              <div>
                <div className="flex flex-col mb-5">
                  <span className="text-white text-[24px]">
                    {data.myTeam.teamName}
                  </span>
                  <span className="text-[#B1ACC1] text-[16px]">
                    {data.myTeam.groupName}
                  </span>
                </div>

                {/* 우리팀 유저 정보 */}
                <div className="flex flex-col gap-2">
                  {data.myTeam.teamMembers.map((member, idx) => (
                    <div
                      key={member.memberId ?? idx}
                      className="flex items-center gap-2"
                    >
                      <FallBackImage
                        src={`${POSITION_IMG_URL}${member.position.toLowerCase()}.svg`}
                        alt={String(member.position)}
                        width={40}
                        height={40}
                        className="mb-3"
                      />
                      <Link href={`/user/${member.memberId}`}>
                        <div className="flex items-center ml-8 mb-3">
                          <FallBackImage
                            src={`${SUMMONER_ICON_URL}${member.summonerIcon}.png`}
                            alt={String(member.summonerIcon)}
                            width={40}
                            height={40}
                            className="rounded"
                          />
                          <span className="ml-2">{member.summonerName}</span>
                          <span className="ml-1">#{member.summonerTag}</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* 가운데: 승패 정보 */}
              <div className="flex flex-col h-full self-stretch min-h-0 items-center justify-start select-none px-15">
                {(() => {
                  const myId = data.myTeam.teamId;
                  const sets = [...data.setResults].sort(
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
                                  leftWin ? "text-[#FF5679]" : "text-[#B1ACC1]"
                                }`}
                              >
                                {leftWin ? "W" : "L"}
                              </span>
                              <span className="text-[#B1ACC1] justify-self-center">
                                Game {s.setNumber}
                              </span>
                              <span
                                className={`text-2xl tracking-wider justify-self-end ${
                                  leftWin ? "text-[#B1ACC1]" : "text-[#FF5679]"
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
                    {data.otherTeam.teamName}
                  </span>
                  <span className="text-[#B1ACC1] text-[16px]">
                    {data.otherTeam.groupName}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {data.otherTeam.teamMembers.map((member, idx) => (
                    <div
                      key={member.memberId ?? idx}
                      className="flex items-center gap-2"
                    >
                      <FallBackImage
                        src={`${POSITION_IMG_URL}${member.position.toLocaleLowerCase()}.svg`}
                        alt={String(member.position.toLocaleLowerCase())}
                        width={40}
                        height={40}
                        className="mb-3"
                      />
                      <Link href={`/user/${member.memberId}`}>
                        <div className="flex items-center ml-8 mb-3">
                          <FallBackImage
                            src={`${SUMMONER_ICON_URL}${member.summonerIcon}.png`}
                            alt={String(member.summonerIcon)}
                            width={40}
                            height={40}
                            className="rounded"
                          />
                          <span className="ml-2">{member.summonerName}</span>
                          <span className="ml-1">#{member.summonerTag}</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {isJoined ?? (
              <button
                onClick={() => opposeCompetition}
                className="flex justify-center items-center text-center border border-[#323036] rounded text-xl bg-[#25242A33] h-11 cursor-pointer"
              >
                이의신청하기
              </button>
            )}
          </div>
        </TableCell>
      </TableRow>
    </>
  );
}
