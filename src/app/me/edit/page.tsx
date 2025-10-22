"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { userInfoData } from "@/mock/userInfoData";
import { capitalize } from "@/utils/capitalize";
import { calcWinRate } from "@/utils/calc-winrate";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const POSITIONS = ["top", "jungle", "middle", "bottom", "utility"] as const;
export type Position = "" | (typeof POSITIONS)[number];

type FormState = {
  major: string;
  admissionYear: string;
  description: string;
  position: {
    main: Position;
    sub: Position;
  };
};

const positionIconSelected = (p?: string) =>
  `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-${p}.svg`;

const positionIcon = (p?: string) =>
  `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-${p}-light.svg`;

function PositionSquare({ value }: { value?: Position }) {
  const active = Boolean(value);
  return (
    <div
      className={
        "relative rounded border w-[50px] h-[50px] flex items-center justify-center " +
        (active
          ? "border-[#25242A] bg-[#323036]"
          : "border-[#FF5679] bg-[#25242A]")
      }
    >
      {active ? (
        <Image
          src={positionIconSelected(value)}
          alt={value!}
          width={50}
          height={50}
        />
      ) : null}
      {active && (
        <span className="pointer-events-none absolute inset-0 rounded ring-2 ring-[#25242A]/60" />
      )}
    </div>
  );
}

function PositionPicker({
  value,
  onChange,
}: {
  value: Position;
  onChange: (v: Position) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button type="button" className="rounded focus:outline-none">
            <PositionSquare value={value} />
          </button>
        </PopoverTrigger>

        <PopoverContent
          side="bottom"
          align="start"
          className="w-auto p-2 bg-[#323036] border border-black/60"
        >
          <div className="grid grid-cols-5 gap-2">
            {POSITIONS.map((p) => {
              const active = value === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    onChange(p);
                    setOpen(false);
                  }}
                  className={
                    "relative rounded border w-[46px] h-[46px] flex items-center justify-center transition " +
                    (active
                      ? "border-[#FF5679] bg-[#FF5679]"
                      : "border-[#323036] hover:border-[#FF5679]/60 hover:bg-white/5")
                  }
                  title={p}
                >
                  <Image src={positionIcon(p)} alt={p} width={42} height={42} />
                  {active && (
                    <span className="pointer-events-none absolute inset-0 rounded ring-2 ring-[#FF5679]/60" />
                  )}
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function SquarePreview({
  kind, // "position" | "champion"
  value,
  size = 50,
}: {
  kind: "position" | "champion";
  value?: string;
  size?: number;
}) {
  if (!value) {
    return (
      <div
        className="bg-[#25242A] border border-[#323036] rounded"
        style={{ width: size, height: size }}
      />
    );
  }
  const src =
    kind === "position"
      ? `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-${value}.svg`
      : `https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${value}.png`;
  return (
    <Image
      src={src}
      alt={value}
      width={size}
      height={size}
      className={kind === "champion" ? "rounded" : ""}
    />
  );
}

export default function EditMyPage() {
  const initial = useMemo(() => userInfoData, []);

  // ⬇⬇ 명시 제네릭 + 초기값을 Position으로 정규화
  const [form, setForm] = useState<FormState>({
    major: initial.major ?? "",
    admissionYear: String(initial.admissionYear ?? ""),
    description: initial.description ?? "",
    position: {
      main: (initial.position.main ?? "") as Position,
      sub: (initial.position.sub ?? "") as Position,
    },
  });
  const pct = useMemo(
    () => calcWinRate(Number(initial.record.win), Number(initial.record.cnt)),
    [initial.record.win, initial.record.cnt]
  );

  const handle =
    (path: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const value = e.target.value;
      setForm((prev) => {
        const next: any = structuredClone(prev);
        const keys = path.split(".");
        let cur = next;
        for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
        cur[keys[keys.length - 1]] = value;
        return next;
      });
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 서버 액션 / API 연동
    // await updateProfile(form)
    console.log("submit payload:", form);
    // router.push("/mypage");
  };

  const onReverify = () => {
    // TODO: 재인증 플로우 연결
    // router.push("/verify");
    alert("재인증 플로우로 이동(placeholder)!");
  };

  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-3">
        <span>마이페이지</span>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        {/* 상단 액션 바 */}
        <div className="flex items-center justify-end px-20">
          <button
            type="submit"
            className="flex items-center justify-center 
              w-[120px] h-[44px] 
              text-white rounded 
              bg-[#FF567933] text-center mt-4  hover:opacity-90 transition"
          >
            저장하기
          </button>
        </div>

        <div className="flex px-20 gap-5">
          {/* 좌측 카드들 */}
          <div className="w-[80%] flex flex-col mr-1">
            {/* 프로필/소환사 */}
            <div
              className="flex items-center
                            border-2 border-[#323036] 
                            w-full h-[148px]
                            text-[#B1ACC1] rounded 
                            bg-[#25242A33] text-center mt-2 p-[24px]"
            >
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${initial.user.icon}.png`}
                alt={initial.user.icon}
                width={100}
                height={100}
                className="rounded-2xl mr-4"
              />

              <div className="flex flex-col items-start">
                <span>소환사{initial.user.id}</span>
                <div className="text-[40px] ">
                  <span className="text-white">{initial.user.userName} </span>
                  <span>#{initial.user.userTag}</span>
                </div>
              </div>
            </div>

            {/* 기본 정보 그리드 */}
            <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 items-start border-2 border-[#323036] w-full h-[412px] text-white rounded bg-[#25242A33] mt-5 p-6">
              {/* 소속 */}
              <span className="font-semibold text-sm">소속</span>
              <div className="flex items-center gap-2 text-sm">
                {initial.verified ? (
                  <>
                    <span>{initial.univName}</span>
                    <Image
                      src="/images/verified.png"
                      alt="verified"
                      width={20}
                      height={20}
                    />

                    <Link
                      href="/me/verify"
                      className=" text-[#B1ACC1] hover:bg-[#25242A66] transition"
                    >
                      <span> 다시 인증하기 {">"}</span>
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/me/verify"
                    className=" text-white hover:bg-[#25242A66] transition"
                  >
                    <span className="text-[#B1ACC1]">인증하기 {">"}</span>
                  </Link>
                )}
              </div>

              {/* 학과 */}
              <span className="font-semibold text-sm">학과</span>
              <input
                className="bg-[#323036] border border-[#323036] rounded px-3 py-2 text-white"
                value={form.major}
                onChange={handle("major")}
                placeholder="전공"
              />

              {/* 학번 */}
              <span className="font-semibold text-sm">학번</span>
              <input
                className="bg-[#323036] border border-[#323036] rounded px-3 py-2 text-white"
                value={form.admissionYear}
                onChange={handle("admissionYear")}
                placeholder="2022"
                inputMode="numeric"
              />

              {/* 소개글 */}
              <span className="font-semibold text-sm self-start mt-[2px]">
                소개글
              </span>
              <textarea
                className="text-sm leading-relaxed text-left break-words max-h-[140px] overflow-y-auto scrollbar-none bg-[#323036] border border-[#323036] rounded px-3 py-2 text-white resize-none"
                value={form.description}
                onChange={handle("description")}
                rows={5}
                placeholder="자기소개를 입력하세요"
              />
            </div>

            {/* 연결 계정(읽기 전용) */}
            <div
              className="flex items-center justify-between
                            w-full h-[88px]
                            text-white  rounded 
                            bg-[#25242A] text-center mt-5 p-[24px]"
            >
              <div className="flex items-center">
                <Image
                  src="/images/riot-logo.png"
                  alt={"riot-logo"}
                  width={40}
                  height={40}
                />
                <span className="ml-8">라이엇 게임즈</span>
              </div>

              <Image
                src="/images/plus.png"
                alt={"plus"}
                width={20}
                height={20}
                className="items-end"
              />
            </div>
          </div>

          {/* 우측 사이드 */}
          <div className="flex flex-col border-2 border-[#323036] w-[20%] h-[480px] text-white rounded bg-[#25242A33] mt-2 p-6">
            {/* 포지션 */}
            <div className="mb-6">
              <span className="font-bold ml-1">포지션</span>

              <div className="flex ">
                {/* 메인 선택 */}
                <PositionPicker
                  value={form.position.main as Position}
                  onChange={(v) =>
                    setForm((prev) => ({
                      ...prev,
                      position: { ...prev.position, main: v },
                    }))
                  }
                />

                {/* 서브 선택 */}
                <PositionPicker
                  value={form.position.sub as Position}
                  onChange={(v) =>
                    setForm((prev) => ({
                      ...prev,
                      position: { ...prev.position, sub: v },
                    }))
                  }
                />
              </div>
            </div>

            {/* 모스트 챔피언=*/}
            <div className="mb-6">
              <span className="font-bold ml-1">모스트 챔피언</span>
              <div className="flex mt-3 mb-3 gap-2">
                <SquarePreview kind="champion" value={initial.most.first} />
                <SquarePreview kind="champion" value={initial.most.second} />
                <SquarePreview kind="champion" value={initial.most.third} />
              </div>
            </div>

            {/* 티어: 보기 전용 */}
            <div className="mb-6">
              <span className="font-bold">티어</span>
              <div className="flex items-start mt-3 gap-3">
                <Image
                  src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/ranked-mini-crests/${initial.tier.rank}.svg`}
                  alt={initial.tier.rank}
                  width={48}
                  height={48}
                />
                <div className="flex flex-col text-[12px]">
                  <div className="flex items-center gap-2">
                    <span>{capitalize(initial.tier.rank)}</span>
                    <span>{initial.tier.tier}</span>
                  </div>
                  <span>{initial.tier.lp} LP</span>
                </div>
              </div>
            </div>

            {/* 승률: 보기 전용 */}
            <div>
              <div className="font-bold">승률</div>
              <div className="flex items-center gap-2 w-full my-4">
                <div className="relative flex-1 w-[160px] h-[30px] border-[#323036] rounded-[4px] bg-[#110D17] overflow-hidden">
                  <div
                    className="h-full bg-[#FF567980]"
                    style={{ width: `${pct}%` }}
                  />
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
                    {initial.record.win}승
                  </span>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
                    {initial.record.cnt - initial.record.win}패
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 액션(돌아가기 링크) */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Link
            href="/me"
            className="text-sm underline text-[#B1ACC1] hover:text-white"
          >
            ← 돌아가기
          </Link>
        </div>
      </form>
    </>
  );
}
