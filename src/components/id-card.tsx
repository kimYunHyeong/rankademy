import Image from "next/image";
import { capitalize } from "@/utils/capitalize";
import { calcWinRate } from "@/utils/calc-winrate";
import { summonerDTO, userData } from "@/types";

type props = userData;

export default function IDCard({ data }: { data: props }) {
  const pct = calcWinRate(data.record.win, data.record.cnt);

  return (
    <div className="w-[500px] h-[670px] flex justify-center p-6 border-[2px] border-[#323036] rounded-xl bg-[#FF56790D]">
      <div className="text-white">
        {/* 사진 및 칭호 */}
        <div>
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${data.user.icon}.png`}
            alt={data.user.icon}
            width={140}
            height={140}
            className="rounded-2xl"
          />
          <div className="w-[140px] h-[26px] border border-[#323036] rounded bg-[#FF56790D] flex items-center justify-center mt-1">
            <span className="bg-[linear-gradient(149.06deg,#FFA1D9_10.49%,#FF5679_60.64%)] bg-clip-text text-transparent font-semibold ">
              {data.emblem}
            </span>
          </div>
        </div>

        {/* 닉네임 */}
        <div className="flex flex-col my-5">
          <span className="font-semibold text-[#B1ACC1] text-[12px] mb-2">
            닉네임
          </span>
          <div>
            <span className="text-[32px]">{data.user.userName}</span>
            <span className="ml-4 text-[32px] text-[#B1ACC1]">
              #{data.user.userTag}
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
            {data.major} | {data.admissionYear}학번
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
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${data.most.first}.png`}
                  alt={data.most.first}
                  width={40}
                  height={40}
                />
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${data.most.second}.png`}
                  alt={data.most.second}
                  width={40}
                  height={40}
                />
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${data.most.third}.png`}
                  alt={data.most.third}
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
                <Image
                  src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-${data.position.main}.svg`}
                  alt={data.position.main}
                  width={40}
                  height={40}
                />
                <Image
                  src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-${data.position.sub}.svg`}
                  alt={data.position.sub}
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
                <Image
                  src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/ranked-mini-crests/${data.tier.rank}.svg`}
                  alt={data.tier.rank}
                  width={40}
                  height={40}
                />
                <div className="flex flex-col ml-1 text-xs justify-center">
                  <span>
                    {capitalize(data.tier.rank)} {data.tier.tier}
                  </span>
                  <span>{data.tier.lp}LP</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mt-5 font-semibold text-[#B1ACC1] text-[12px] mb-2">
              승률
            </div>

            <div className="flex items-center gap-2 w-full">
              <div className="relative flex-1 w-[160px] h-[30px] border-[#323036] rounded-[4px] bg-[#110D17] overflow-hidden">
                <div
                  className="h-full bg-[#FF567980]"
                  style={{ width: `${pct}%` }}
                />
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
                  {data.record.win}승
                </span>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white font-medium">
                  {data.record.cnt - data.record.win}패
                </span>
              </div>
              <span className="ml-3 text-sm text-white">{pct}%</span>
            </div>
          </div>
        </div>
      </div>
      {/* 왼쪽 로고 */}
      <div>
        <Image
          src={`/images/logo-greyfont.png`}
          alt={"logo-greyfont"}
          width={80}
          height={50}
        />
      </div>
    </div>
  );
}
