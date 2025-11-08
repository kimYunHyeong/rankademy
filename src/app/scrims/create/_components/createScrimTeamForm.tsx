"use client";

import FallBackImage from "@/components/fallback-img";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import TeamRegisterInput from "@/components/team-register-input";
import { Position } from "@/types";

type FormMember = {
  userId: number;
  position: Position;
};

type FormBody = {
  name: string;
  intro: string;
  representativeId: number;
  members: FormMember[];
};

export default function CreateScrimTeamFrom({
  submitAction,
}: {
  submitAction: (formData: FormData) => Promise<void>;
}) {
  const router = useRouter();

  // 팀명/소개/대표자
  const [teamName, setTeamName] = useState<string>("");
  const [intro, setIntro] = useState<string>("");
  const [representativeId, setRepresentativeId] = useState<number | null>(null);

  // 팀원: 포지션별 1명만 유지 (upsert)
  const [members, setMembers] = useState<FormMember[]>([]);

  const upsertMember = (position: Position, userId: number) => {
    setMembers((prev) => {
      const next = prev.filter((m) => m.position !== position);
      next.push({ userId, position });
      return next;
    });
  };

  // 대표자 후보: 현재 선택된 멤버 목록
  const representativeOptions = useMemo(() => members, [members]);

  // 대표자가 팀원에서 제거되면 대표자 해제
  const currentMemberIds = useMemo(
    () => new Set(members.map((m) => m.userId)),
    [members]
  );
  if (representativeId !== null && !currentMemberIds.has(representativeId)) {
    setRepresentativeId(null);
  }

  // 제출
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const body: FormBody = {
      name: teamName.trim(),
      intro: intro.trim(),
      representativeId: representativeId ?? members[0].userId,
      members,
    };

    // FormData에 직렬화
    const fd = new FormData();
    fd.append("name", body.name);
    fd.append("intro", body.intro);
    fd.append("representativeId", String(body.representativeId));
    fd.append("members", JSON.stringify(body.members));

    await submitAction(fd);
  };

  return (
    <form
      className="flex w-full justify-center items-center"
      onSubmit={handleSubmit}
    >
      {/* 본문 */}
      <div className="p-8 flex flex-col border-2 border-[#25242A] rounded bg-[#25242A33] w-[75%] min-h-[480px] h-auto">
        {/* 팀 이름 */}
        <div className="flex flex-col">
          <span className="text-white text-sm">팀 이름</span>
          <input
            name="name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="bg-[#323036] border border-[#323036] rounded my-4 px-3 py-2 text-white"
            placeholder="팀 이름"
            required
          />
        </div>

        {/* 팀원 등록 */}
        <div className="flex flex-col">
          <span className="text-white text-sm mb-5">팀원 등록</span>

          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <TeamRegisterInput
              position="TOP"
              onSelect={(userId: number | null) => {
                if (!userId) return;
                upsertMember("TOP", userId);
              }}
            />
            <TeamRegisterInput
              position="JUNGLE"
              onSelect={(userId: number | null) => {
                if (!userId) return;
                upsertMember("JUNGLE", userId);
              }}
            />
            <TeamRegisterInput
              position="MIDDLE"
              onSelect={(userId: number | null) => {
                if (!userId) return;
                upsertMember("MIDDLE", userId);
              }}
            />
            <TeamRegisterInput
              position="BOTTOM"
              onSelect={(userId: number | null) => {
                if (!userId) return;
                upsertMember("BOTTOM", userId);
              }}
            />
            <TeamRegisterInput
              position="UTILITY"
              onSelect={(userId: number | null) => {
                if (!userId) return;
                upsertMember("UTILITY", userId);
              }}
            />
          </div>

          {/* 대표자 선택 (선택된 팀원 중에서) */}
          {/* <div className="flex flex-col mt-6">
            <span className="text-white text-sm mb-2">대표자</span>
            <Select
              value={
                representativeId !== null ? String(representativeId) : undefined
              }
              onValueChange={(v) => setRepresentativeId(Number(v))}
            >
              <SelectTrigger className="w-48 h-11 border-[#323036] bg-[#1D1921] text-[#B1ACC1] rounded">
                <SelectValue placeholder="대표자 선택" />
              </SelectTrigger>
              <SelectContent className="border-[#323036] bg-[#1D1921] text-[#B1ACC1] rounded">
                {representativeOptions.length === 0 ? (
                  <SelectItem value="0" disabled>
                    팀원을 먼저 선택하세요
                  </SelectItem>
                ) : (
                  representativeOptions.map((m) => (
                    <SelectItem
                      key={`${m.position}-${m.userId}`}
                      value={String(m.userId)}
                    >
                      {m.position} · {m.userId}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div> */}
        </div>

        {/* 팀 소개 */}
        <div className="flex flex-col my-10">
          <div className="flex">
            <span className="text-white text-sm self-start mt-0.5">
              팀 소개
            </span>
            <FallBackImage
              src="/images/caution-triangle.png"
              alt="경고"
              width={24}
              height={24}
              className="object-contain ml-5 mr-1"
            />
            <span className="text-white">대표자 연락처를 꼭 포함해주세요</span>
          </div>

          <textarea
            name="intro"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            className="my-4 text-sm h-[200px] leading-relaxed text-left wrap-break-word max-h-[250px] overflow-y-auto scrollbar-none bg-[#323036] border border-[#323036] rounded px-3 py-2 text-white resize-none"
            rows={5}
            placeholder="팀 소개"
            required
          />
        </div>

        {/* 숨김 필드: groupId / representativeId / members(JSON) */}

        <div className="flex justify-end mt-5">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center justify-center border border-[#323036] w-[120px] h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2 hover:bg-[#24192F] transition-colors duration-300 ease-in-out"
          >
            취소
          </button>
          <button
            type="submit"
            className="flex items-center justify-center w-[120px] h-11 text-white rounded bg-[#FF567933] text-center hover:bg-[#FF5679] transition-colors duration-300 ease-in-out"
          >
            게시하기
          </button>
        </div>
      </div>
    </form>
  );
}
