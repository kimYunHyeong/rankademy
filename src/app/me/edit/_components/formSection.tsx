"use client";

import { useState } from "react";
import { Position } from "@/types";
import { MyProfile } from "../../page";
import { CHAMPION_IMG_URL, SUMMONER_ICON_URL, TIER_IMG_URL } from "@/lib/api";
import FallBackImage from "@/components/fallback-img";
import Link from "next/link";
import { capitalize } from "@/utils/capitalize";
import { useRouter } from "next/navigation";
import PositionPicker from "./position-select";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import RiotVerifySection from "@/components/riot-verify";

type FormState = {
  username: string;
  major: string;
  admissionYear: number;
  description: string;
  mainPosition: Position;
  subPosition: Position;
};

/* 학번 선택 필터 */
export type FilterOption = { label: string; value: string };
type FilterValue = { admissionYear: string };

/* 학번 옵션 */
const ADMISSION_YEAR_OPTIONS: FilterOption[] = Array.from(
  { length: 2025 - 1979 + 1 },
  (_, i) => {
    const year = 1979 + i;
    return { label: `${String(year).slice(2)}학번`, value: String(year) };
  }
).reverse();

export default function FormSection({
  data,
  updateProfile,
}: {
  data: MyProfile;
  updateProfile: (formData: FormData) => Promise<void>;
}) {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    username: data.username ?? "",
    major: data.univInfo.major ?? "",
    admissionYear: data.univInfo.admissionYear ?? 2025,
    description: data.description ?? "",
    mainPosition: (data.mainPosition ?? "ANY") as Position,
    subPosition: (data.subPosition ?? "ANY") as Position,
  });

  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-3">
        <span>마이페이지</span>
      </div>

      {/* 수정 제출 */}
      <form
        action={async (formData: FormData) => {
          try {
            await updateProfile(formData);
            router.push("/me");
          } catch (err: any) {
            alert(
              err?.message ?? "에러가 발생하여 내용이 반영되지 않았습니다."
            );
            // 이전 페이지로
            router.back();
          }
        }}
        className="flex flex-col gap-5"
      >
        <div className="flex items-center justify-end px-20">
          <button
            type="submit"
            className="flex items-center justify-center 
              w-[120px] h-11 
              text-white rounded 
              bg-[#FF567933] text-center mt-4  hover:opacity-90 transition"
          >
            저장하기
          </button>
        </div>

        <div className="flex px-20 gap-5">
          {/* 좌측 카드들 */}
          <div className="w-[80%] flex flex-col mr-1">
            {/* 소환사 이름 */}
            <div className="flex items-center border-2 border-[#323036] w-full h-[148px] text-[#B1ACC1] rounded bg-[#25242A33] text-center mt-2 p-6">
              <FallBackImage
                src={`${SUMMONER_ICON_URL}${data.summonerInfo.summonerIcon}.png`}
                alt={data.summonerInfo.summonerIcon.toString()}
                width={100}
                height={100}
                className="rounded-2xl mr-4"
              />

              <div className="flex flex-col items-start">
                <input
                  name={
                    data.username === form.username ? undefined : "username"
                  }
                  className="bg-[#323036] border border-[#323036] rounded px-3 py-2 text-white"
                  value={form.username}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue === data.username) return null;

                    setForm((prev) => ({ ...prev, username: newValue }));
                  }}
                  placeholder="유저 이름"
                />
                <div className="text-[40px] ">
                  <span className="text-white">
                    {data.summonerInfo.summonerName}
                  </span>
                  <span>#{data.summonerInfo.summonerTag}</span>
                </div>
              </div>
            </div>

            {/* 기본 정보 그리드 */}
            <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 items-start border-2 border-[#323036] w-full h-[412px] text-white rounded bg-[#25242A33] mt-5 p-6">
              {/* 소속 */}
              <span className="font-semibold text-sm">소속</span>
              <div className="flex items-center gap-2 text-sm">
                {data.univInfo.univVerified ? (
                  <>
                    <span>{data.univInfo.univName}</span>
                    <FallBackImage
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
                name="major"
                className="bg-[#323036] border border-[#323036] rounded px-3 py-2 text-white"
                value={form.major}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, major: e.target.value }))
                }
                placeholder="전공"
              />

              {/* 학번 */}
              <span className="font-semibold text-sm">학번</span>
              <div className="flex items-center">
                <Select
                  value={String(form.admissionYear) || undefined}
                  onValueChange={(e) => {
                    setForm((prev) => ({
                      ...prev,
                      admissionYear: Number(e),
                    }));
                  }}
                >
                  <SelectTrigger className="bg-[#323036] w-full border border-[#323036] rounded px-3 py-2 text-white">
                    <SelectValue
                      placeholder={`${String(data.univInfo.admissionYear).slice(
                        2
                      )}학번`}
                    />
                  </SelectTrigger>
                  <SelectContent className="bg-[#323036] border border-[#323036] rounded px-3 py-2 text-white">
                    {ADMISSION_YEAR_OPTIONS.map((o) => (
                      <SelectItem
                        key={o.value}
                        value={o.value}
                        className="hover:bg-[#24192F] focus:bg-[#24192F] focus:text-white"
                      >
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 값 제출용 hidden filed */}
              <input
                type="hidden"
                name="admissionYear"
                value={form.admissionYear ?? ""}
              />

              <span className="font-semibold text-sm self-start mt-0.5">
                소개글
              </span>
              <textarea
                name="description"
                className="text-sm leading-relaxed text-left wrap-break-word max-h-[140px] overflow-y-auto scrollbar-none bg-[#323036] border border-[#323036] rounded px-3 py-2 text-white resize-none"
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                rows={5}
                placeholder="자기소개를 입력하세요"
              />
            </div>

            {/* 라이엇 연동 */}
            <RiotVerifySection />
          </div>

          {/* 우측 사이드 */}
          <div className="flex flex-col border-2 border-[#323036] w-[20%] h-[480px] text-white rounded bg-[#25242A33] mt-2 p-6">
            {/* 포지션 선택 */}
            <div className="mb-6">
              <span className="font-bold ml-1 ">포지션</span>
              <div className="flex mt-2 gap-x-2">
                <PositionPicker
                  value={form.mainPosition}
                  onChange={(v) =>
                    setForm((prev) => ({ ...prev, mainPosition: v }))
                  }
                />
                {form.mainPosition !== "ANY" && (
                  <PositionPicker
                    value={form.subPosition}
                    onChange={(v) =>
                      setForm((prev) => ({ ...prev, subPosition: v }))
                    }
                  />
                )}
              </div>
              {/* 폼 전송을 위한 hidden input */}
              <input
                type="hidden"
                name="mainPosition"
                value={form.mainPosition ?? ""}
              />
              <input
                type="hidden"
                name="subPosition"
                value={form.subPosition ?? ""}
              />
            </div>

            {/* 모스트 정보 */}
            <div>
              <span className="font-bold ml-1">모스트 챔피언</span>
              <div className="flex mt-3 mb-7 mr-1">
                {!data.mostChampionIds[0] ? (
                  <div
                    className="bg-[#25242A]
                               border rounded border-[#323036]
                               w-[50px] h-[50px]
                               flex items-center justify-center
                               mr-2"
                  />
                ) : (
                  <FallBackImage
                    src={`${CHAMPION_IMG_URL}${data.mostChampionIds[0]}.png`}
                    alt={data.mostChampionIds[0]}
                    width={50}
                    height={50}
                    className="mr-1"
                  />
                )}

                {!data.mostChampionIds[1] ? (
                  <div
                    className="bg-[#25242A]
                              border rounded border-[#323036]
                              w-[50px] h-[50px]
                              flex items-center justify-center
                              mr-2"
                  />
                ) : (
                  <FallBackImage
                    src={`${CHAMPION_IMG_URL}${data.mostChampionIds[1]}.png`}
                    alt={data.mostChampionIds[1]}
                    width={50}
                    height={50}
                    className="mr-1"
                  />
                )}

                {!data.mostChampionIds[2] ? (
                  <div
                    className="bg-[#25242A]
                              border rounded border-[#323036]
                              w-[50px] h-[50px]
                              flex items-center justify-center
                              mr-2"
                  />
                ) : (
                  <FallBackImage
                    src={`${CHAMPION_IMG_URL}${data.mostChampionIds[2]}.png`}
                    alt={data.mostChampionIds[2]}
                    width={50}
                    height={50}
                    className="mr-1"
                  />
                )}
              </div>
            </div>

            {/* 티어 */}
            <div className="flex flex-col gap-2 mb-5">
              <span className="font-bold">티어</span>

              <div className="flex">
                <FallBackImage
                  src={`${TIER_IMG_URL}${data.summonerInfo.tierInfo.tier.toLowerCase()}.svg`}
                  alt={data.summonerInfo.tierInfo.tier}
                  width={60}
                  height={60}
                  className=" mr-2"
                />
                <div className="text-[12px] mt-2">
                  <div className="flex ">
                    <span>
                      {capitalize(
                        data.summonerInfo.tierInfo.tier.toLowerCase()
                      )}
                    </span>
                    <span className="w-1" />
                    <span>{data.summonerInfo.tierInfo.rank}</span>
                  </div>
                  <span>{data.summonerInfo.tierInfo.lp}</span>
                </div>
              </div>
            </div>

            <div>
              <div className="mt-3 font-bold">승률</div>

              <div className="flex items-center gap-2 w-full my-3">
                <div className="relative flex-1 w-40 h-[30px] border-[#323036] rounded bg-[#110D17] overflow-hidden">
                  <div
                    className="h-full bg-[#FF567980]"
                    style={{ width: `${data.summonerInfo.winRate}%` }}
                  />
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
                    {data.summonerInfo.winCount}승
                  </span>
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
                    {data.summonerInfo.lossCount}패
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 액션 */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Link
            href="/me"
            className="text-sm underline text-[#B1ACC1] hover:text-white"
          >
            돌아가기
          </Link>
        </div>
      </form>
    </>
  );
}
