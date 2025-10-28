import { MyProfile } from "../page";
import Image from "next/image";
import { capitalize } from "@/utils/capitalize";
import Link from "next/link";
import {
  CHAMPION_IMG_URL,
  POSITION_IMG_URL,
  SUMMONER_ICON_URL,
  TIER_IMG_URL,
} from "@/lib/api";

export default function InfoSection({ data }: { data: MyProfile }) {
  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-3">
        <span>마이페이지</span>
      </div>

      <div className="flex flex-col gap-5">
        {/* 수정하기 버튼 */}
        <div className="flex items-center justify-end px-20">
          <Link
            href="/me/edit"
            className="flex items-center justify-center 
      border border-[#323036] 
      w-30 h-11 
      text-[#B1ACC1] rounded 
      bg-[#25242A33] text-center mt-10"
          >
            수정하기
          </Link>
        </div>
      </div>

      <div className="flex px-20 ">
        {/* 가운데 내용 */}
        <div className="w-[80%] flex flex-col mr-5">
          {/* 소환사 이름  */}
          <div
            className="flex items-center
                border-2 border-[#323036] 
                w-full h-[148px]
                text-[#B1ACC1] rounded 
                bg-[#25242A33] text-center mt-10 p-6"
          >
            <Image
              src={`${SUMMONER_ICON_URL}${data.summonerInfo.summonerIcon}.png`}
              alt={data.summonerInfo.summonerIcon.toString()}
              width={100}
              height={100}
              className="rounded-2xl mr-4"
            />

            <div className="flex flex-col items-start">
              <span>{data.username}</span>
              <div className="text-[40px] ">
                <span className="text-white">
                  {data.summonerInfo.summonerName}
                </span>
                <span>#{data.summonerInfo.summonerTag}</span>
              </div>
            </div>
          </div>

          <div
            className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 items-start 
             border-2 border-[#323036] 
             w-full h-[300px] text-white rounded 
             bg-[#25242A33] mt-5 p-6"
          >
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
            <span className="text-sm">{data.univInfo.major}</span>

            {/* 학번 */}
            <span className="font-semibold text-sm">학번</span>
            <span className="text-sm">{data.univInfo.admissionYear}학번</span>

            {/* 소개글 */}
            <span className="font-semibold text-sm self-start mt-0.5">
              소개글
            </span>
            <p className="text-sm leading-relaxed text-left wrap-break-word max-h-[140px] overflow-y-auto scrollbar-none">
              {data.description}
            </p>
          </div>

          <div
            className="flex items-center justify-between
                w-full h-[88px]
                text-white  rounded 
                bg-[#25242A] text-center mt-5 p-6"
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

        {/* 오른쪽 유저 정보 */}
        <div
          className="flex flex-col 
                border-2 border-[#323036] 
                w-[20%] h-[480px]
                text-white rounded 
                bg-[#25242A33] mt-10 p-6 "
        >
          {/* 포지션 정보 */}
          <div>
            <span className="font-bold ml-1">포지션</span>
            <div className="flex mt-3 mb-7 mr-1">
              {!data.mainPosition ? (
                <div
                  className="bg-[#25242A]
                               border rounded border-[#323036]
                               w-[50px] h-[50px]
                               flex items-center justify-center
                               mr-2"
                />
              ) : (
                <Image
                  src={`${POSITION_IMG_URL}${data.mainPosition.toLowerCase()}.svg`}
                  alt={data.mainPosition.toLowerCase()}
                  width={50}
                  height={50}
                  className="mr-1"
                />
              )}

              {!data.subPosition ? (
                <div
                  className="bg-[#25242A]
                              border rounded border-[#323036]
                              w-[50px] h-[50px]
                              flex items-center justify-center
                              mr-2"
                />
              ) : (
                <Image
                  src={`${POSITION_IMG_URL}${data.subPosition.toLowerCase()}.svg`}
                  alt={data.subPosition.toLowerCase()}
                  width={50}
                  height={50}
                  className="mr-1"
                />
              )}
            </div>
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
                    {capitalize(data.summonerInfo.tierInfo.tier.toLowerCase())}
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
              <div className="relative flex-1 w-40 h-[30px] border-[#323036] rounded-lg bg-[#110D17] overflow-hidden">
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
    </>
  );
}
