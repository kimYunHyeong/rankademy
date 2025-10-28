"use client";

import { useState } from "react";
import { Position } from "@/types";
import { MyProfile } from "../../page";
import { CHAMPION_IMG_URL, SUMMONER_ICON_URL, TIER_IMG_URL } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { capitalize } from "@/utils/capitalize";
import PositionPicker from "./position-select";
import { updateProfile } from "../action";

type FormState = {
  username: string;
  major: string;
  admissionYear: string;
  description: string;
  mainPosition: Position;
  subPosition: Position;
};

export default function FormSection({ data }: { data: MyProfile }) {
  const [form, setForm] = useState<FormState>({
    username: data.username ?? "",
    major: data.univInfo.major ?? "",
    admissionYear: String(data.univInfo.admissionYear ?? ""),
    description: data.description ?? "",
    mainPosition: (data.mainPosition ?? "") as Position,
    subPosition: (data.subPosition ?? "") as Position,
  });

  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-3">
        <span>마이페이지</span>
      </div>

      {/* 수정 제출 */}
      <form action={updateProfile} className="flex flex-col gap-5">
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
              <Image
                src={`${SUMMONER_ICON_URL}${data.summonerInfo.summonerIcon}.png`}
                alt={data.summonerInfo.summonerIcon.toString()}
                width={100}
                height={100}
                className="rounded-2xl mr-4"
              />

              <div className="flex flex-col items-start">
                <input
                  name="username"
                  className="bg-[#323036] border border-[#323036] rounded px-3 py-2 text-white"
                  value={form.username}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, username: e.target.value }))
                  }
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
              <input
                name="admissionYear"
                className="bg-[#323036] border border-[#323036] rounded px-3 py-2 text-white"
                value={form.admissionYear}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    admissionYear: e.target.value,
                  }))
                }
                placeholder="22"
                inputMode="numeric"
              />

              {/* 소개글 */}
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
            <div className="flex items-center justify-between w-full h-[88px] text-white rounded bg-[#25242A] text-center mt-5 p-6">
              <div className="flex items-center">
                <Image
                  src="/images/riot-logo.png"
                  alt="riot-logo"
                  width={40}
                  height={40}
                />
                <span className="ml-8">라이엇 게임즈</span>
              </div>
              <Image
                src="/images/plus.png"
                alt="plus"
                width={20}
                height={20}
                className="items-end"
              />
            </div>
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
                <PositionPicker
                  value={form.subPosition}
                  onChange={(v) =>
                    setForm((prev) => ({ ...prev, subPosition: v }))
                  }
                />
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
                  <Image
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
                  <Image
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
                  <Image
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
                <Image
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
