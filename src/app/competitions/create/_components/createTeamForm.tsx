"use client";

import FallBackImage from "@/components/fallback-img";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import TeamRegisterInput from "@/components/team-register-input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { GroupSummaryList } from "@/app/groups/recruits/edit/page";
import { Position } from "@/types";

type FormMember = {
  userId: number;
  position: Position;
};

export type CreateTeamFormBody = {
  groupId: number;
  name: string;
  intro: string;
  representativeId: number;
  members: FormMember[];
};

export default function CreateTeamFrom({
  userId,
  groupList,
  submitAction,
}: {
  userId: number;
  groupList: GroupSummaryList[];
  submitAction: (
    body: CreateTeamFormBody
  ) => Promise<{ ok: boolean; status: number; detail?: string; data?: any }>;
}) {
  const router = useRouter();

  // 소속 그룹
  const [selectedId, setSelectedId] = useState<number>(
    groupList?.[0]?.groupId ?? 0
  );

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

    const body: CreateTeamFormBody = {
      name: teamName.trim(),
      groupId: selectedId,
      intro: intro.trim(),
      representativeId: userId,
      members,
    };

    try {
      const res = await submitAction(body);
      if (!res.ok) {
        if (res.status === 409) {
          alert(`팀 멤버들 중 중복되는 유저가 있을 수 없습니다.`);
        } else {
          alert(`에러코드 [${res.status}]: ${res.detail}`);
        }

        return;
      }

      router.push("/competitions");
    } catch (err: any) {
      console.error("💥 handleSubmit Error:", err);
      alert("요청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
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

        {/* 소속 그룹 */}
        <div className="flex flex-col mb-5">
          <span className="text-white text-sm mb-2">소속 그룹</span>
          <Select
            value={selectedId ? String(selectedId) : undefined}
            onValueChange={(v) => {
              const id = Number(v);
              setSelectedId(id);
            }}
          >
            <SelectTrigger className="w-28 h-11 border-[#323036] bg-[#1D1921] text-[#B1ACC1] rounded">
              <SelectValue placeholder="그룹 선택" />
            </SelectTrigger>

            <SelectContent className="border-[#323036] bg-[#1D1921] text-[#B1ACC1] rounded">
              {groupList.map((group) => (
                <SelectItem
                  key={group.groupId}
                  value={String(group.groupId)}
                  className="data-[state=checked]:bg-[#FF5679] data-[state=checked]:text-white"
                >
                  {group.groupName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 팀원 등록 */}
        <div className="flex flex-col">
          <span className="text-white text-sm mb-5">팀원 등록</span>

          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <TeamRegisterInput
              groupId={selectedId}
              position="TOP"
              onSelect={(userId: number | null) => {
                if (!userId) return;
                upsertMember("TOP", userId);
              }}
            />
            <TeamRegisterInput
              groupId={selectedId}
              position="JUNGLE"
              onSelect={(userId: number | null) => {
                if (!userId) return;
                upsertMember("JUNGLE", userId);
              }}
            />
            <TeamRegisterInput
              groupId={selectedId}
              position="MIDDLE"
              onSelect={(userId: number | null) => {
                if (!userId) return;
                upsertMember("MIDDLE", userId);
              }}
            />
            <TeamRegisterInput
              groupId={selectedId}
              position="BOTTOM"
              onSelect={(userId: number | null) => {
                if (!userId) return;
                upsertMember("BOTTOM", userId);
              }}
            />
            <TeamRegisterInput
              groupId={selectedId}
              position="UTILITY"
              onSelect={(userId: number | null) => {
                if (!userId) return;
                upsertMember("UTILITY", userId);
              }}
            />
          </div>
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
            <span className="text-white">
              대표자 연락처를 꼭 포함해주세요. 한 번 생성한 팀은 수정할 수
              없습니다.
            </span>
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
        <input
          type="hidden"
          name="groupId"
          value={String(selectedId)}
          readOnly
        />
        <input
          type="hidden"
          name="representativeId"
          value={String(representativeId ?? 0)}
          readOnly
        />
        <input
          type="hidden"
          name="members"
          value={JSON.stringify(members)}
          readOnly
        />

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
