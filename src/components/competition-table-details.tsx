// components/match-details.tsx
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { summonerDTO, groupDTO, position } from "@/types";

interface competitionTeamInfo {
  id: number;
  name: string;
  group: groupDTO;
  univ: string;
  emblemUrl?: string;
  members: {
    summooner: summonerDTO;
    position: position;
  }[];
}

interface competitionResult {
  result: {
    winner: competitionTeamInfo;
  };

  team: competitionTeamInfo[];
}

type GameLine = {
  label: string; // "Game 1"
  leftChampion?: string; // 왼쪽 팀 챔피언/아이콘 URL
  rightChampion?: string;
  leftResult: "W" | "L";
  rightResult: "W" | "L";
  leftRoleIcon?: string; // 라인/포지션 아이콘(선택) URL
  rightRoleIcon?: string;
};

export type CompetitionTableDetailProps = {
  left: competitionTeamInfo;
  right: competitionTeamInfo;
  leftScore: number; // 전체 스코어
  rightScore: number;
  games: GameLine[]; // 개별 게임 라인들(최대 5전/7전 등 자유)
  onAppealClick?: () => void; // "이의신청하기" 클릭 핸들러(선택)
};

function WL({ v }: { v: "W" | "L" }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded-md text-sm font-bold",
        v === "W" ? "text-[#FF5679]" : "text-muted-foreground"
      )}
      aria-label={v === "W" ? "Win" : "Lose"}
    >
      {v}
    </span>
  );
}

export default function CompetitionTableDetail({
  left,
  right,
  leftScore,
  rightScore,
  games,
  onAppealClick,
}: CompetitionTableDetailProps) {
  return (
    /* 제일 큰 컨테이너 */
    <div>
      {/* 왼쪽팀 */}
      <div>
        <div className="flex flex-col">
          <span>"컴퓨터공학과 팀"</span>
          <span> "서울과기대 그룹"</span>
        </div>

        <div>
          {" "}
          <div className="flex items-center gap-2">
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${"Ezreal"}.png`}
              alt={"Ezreal"}
              width={30}
              height={30}
            />
            <span>{"니 카"}</span>
            <span>{"#Luffy"}</span>
          </div>
        </div>
      </div>
      {/* 가운데 점수 */}
      <div>
        <div>"3" vs "2"</div>
        {/* 경기횟수만큼 반복 */}
        <div>"W" Game1 "L"</div>
      </div>
      {/* 오른쪽 팀 */}
      <div> "컴퓨터공학과 팀" "서울과기대 그룹"</div>

      {/* 하단 액션 */}
      <div className="mt-5">
        <Button
          variant="secondary"
          className="w-full h-12 rounded-lg bg-[#2A1E3C] hover:bg-[#35264B]"
          onClick={onAppealClick}
        >
          이의신청하기
        </Button>
      </div>
    </div>
  );
}
