import FallBackImage from "@/components/fallback-img";
import { capitalize } from "@/utils/capitalize";

import { MyProfile } from "@/app/me/page";
import {
  CHAMPION_IMG_URL,
  POSITION_IMG_URL,
  SUMMONER_ICON_URL,
  TIER_IMG_URL,
} from "@/lib/api";

export default function IDCard({ data }: { data: MyProfile }) {
  return (
    <div className="w-[500px] h-[670px] flex justify-center p-6 border-2 border-[#323036] rounded-xl bg-[#FF56790D]">
      <div className="text-white">
        {/* 사진 및 칭호 */}
        <div>
          <FallBackImage
            src={`${SUMMONER_ICON_URL}${data.summonerInfo.summonerIcon}.png`}
            alt={"summonerIcon"}
            width={140}
            height={140}
            className="rounded-2xl"
          />
          <div className="w-[140px] h-[26px] border border-[#323036] rounded bg-[#FF56790D] flex items-center justify-center mt-1">
            <span className="bg-[linear-gradient(149.06deg,#FFA1D9_10.49%,#FF5679_60.64%)] bg-clip-text text-transparent font-semibold ">
              {"칭호"}
            </span>
          </div>
        </div>

        {/* 닉네임 */}
        <div className="flex flex-col my-5">
          <span className="font-semibold text-[#B1ACC1] text-[12px] mb-2">
            닉네임
          </span>
          <div>
            <span className="text-[32px]">
              {data.summonerInfo.summonerName}
            </span>
            <span className="ml-4 text-[32px] text-[#B1ACC1]">
              #{data.summonerInfo.summonerTag}
            </span>
          </div>
        </div>

        {/* 소속 */}
        <div className="flex flex-col my-5">
          <span className="font-semibold text-[#B1ACC1] text-[12px] mb-2">
            소속
          </span>
          <span className="text-s mb-1">{"서울과학기술대학교"}</span>
          <span className="text-xs">
            {data.univInfo.major} | {data.univInfo.admissionYear}학번
          </span>
        </div>

        {/* 소개글 */}
        <div className="flex flex-col my-5">
          <span className="font-semibold text-[#B1ACC1] text-[12px] mb-2 ">
            소개글
          </span>
          <span className="block text-sm max-h-24 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none]">
            {data.description}
          </span>
        </div>

        {/* 유저 정보 */}
        <div className="flex flex-col">
          {/* 모스트, 포지션, 티어 */}
          <div className="grid  grid-cols-[4fr_3fr_3fr]">
            <div>
              <span className="font-semibold text-[#B1ACC1] text-[12px] mb-2">
                모스트 챔피언
              </span>
              <div className="flex">
                <FallBackImage
                  src={`${CHAMPION_IMG_URL}${data.mostChampionIds[0]}.png`}
                  alt={"Most Champion 1"}
                  width={40}
                  height={40}
                />
                <FallBackImage
                  src={`${CHAMPION_IMG_URL}${data.mostChampionIds[1]}.png`}
                  alt={"Most Champion 2"}
                  width={40}
                  height={40}
                />
                <FallBackImage
                  src={`${CHAMPION_IMG_URL}${data.mostChampionIds[2]}.png`}
                  alt={"Most Champion 3"}
                  width={40}
                  height={40}
                />
              </div>
            </div>

            <div>
              <span className="font-semibold text-[#B1ACC1] text-[12px] mb-2">
                포지션
              </span>
              <div className="flex">
                <FallBackImage
                  src={`${POSITION_IMG_URL}${data.mainPosition.toLowerCase()}.svg`}
                  alt={data.mainPosition}
                  width={40}
                  height={40}
                />
                <FallBackImage
                  src={`${POSITION_IMG_URL}${data.subPosition.toLowerCase()}.svg`}
                  alt={data.subPosition}
                  width={40}
                  height={40}
                />
              </div>
            </div>

            <div>
              <span className="font-semibold text-[#B1ACC1] text-[12px] mb-2">
                티어
              </span>
              <div className="flex">
                <FallBackImage
                  src={`${TIER_IMG_URL}${data.summonerInfo.tierInfo.tier.toLowerCase()}.svg`}
                  alt={data.summonerInfo.tierInfo.tier}
                  width={40}
                  height={40}
                />
                <div className="flex flex-col ml-1 text-xs justify-center">
                  <span>
                    {capitalize(data.summonerInfo.tierInfo.tier.toLowerCase())}{" "}
                    {data.summonerInfo.tierInfo.rank}
                  </span>
                  <span>{data.summonerInfo.tierInfo.lp}LP</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mt-5 font-semibold text-[#B1ACC1] text-[12px] mb-2">
              승률
            </div>

            <div className="flex items-center gap-2 w-full">
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
              <span className="ml-3 text-sm text-white">
                {Math.floor(data.summonerInfo.winRate)}%
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* 왼쪽 로고 */}
      <div>
        <FallBackImage
          src={`/images/logo-greyfont.png`}
          alt={"logo-greyfont"}
          width={80}
          height={50}
        />
      </div>
    </div>
  );
}
