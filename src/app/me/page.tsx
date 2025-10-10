import Image from "next/image";
import { capitalize } from "@/utils/capitalize";
import { calcWinRate } from "@/utils/calc-winrate";
import { userInfoData } from "@/mock/userInfoData";
import Link from "next/link";

export default function MyPage() {
  const data = userInfoData;

  const pct = calcWinRate(data.record.win, data.record.cnt);

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
      w-[120px] h-[44px] 
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
                bg-[#25242A33] text-center mt-10 p-[24px]"
          >
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${data.user.icon}.png`}
              alt={data.user.icon}
              width={100}
              height={100}
              className="rounded-2xl mr-4"
            />

            <div className="flex flex-col items-start">
              <span>소환사{data.user.id}</span>
              <div className="text-[40px] ">
                <span className="text-white">{data.user.userName} </span>
                <span>#{data.user.userTag}</span>
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
              {data?.verified ? (
                <>
                  <span>{data.univName}</span>
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
            <span className="text-sm">{data.major}</span>

            {/* 학번 */}
            <span className="font-semibold text-sm">학번</span>
            <span className="text-sm">{data.admissionYear}학번</span>

            {/* 소개글 */}
            <span className="font-semibold text-sm self-start mt-[2px]">
              소개글
            </span>
            <p className="text-sm leading-relaxed text-left break-words max-h-[140px] overflow-y-auto scrollbar-none">
              {data.description}
            </p>
          </div>

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

        {/* 오른쪽 유저 정보 */}
        <div
          className="flex flex-col 
                border-2 border-[#323036] 
                w-[20%] h-[480px]
                text-white rounded 
                bg-[#25242A33] mt-10 p-[24px] "
        >
          {/* 포지션 정보 */}
          <div>
            <span className="font-bold ml-1">포지션</span>
            <div className="flex mt-3 mb-7 mr-1">
              {!data.position.main ? (
                <div
                  className="bg-[#25242A]
                               border rounded border-[#323036]
                               w-[50px] h-[50px]
                               flex items-center justify-center
                               mr-2"
                />
              ) : (
                <Image
                  src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-${data.position.main}.svg`}
                  alt={data.position.main}
                  width={50}
                  height={50}
                  className="mr-1"
                />
              )}

              {!data.position.sub ? (
                <div
                  className="bg-[#25242A]
                              border rounded border-[#323036]
                              w-[50px] h-[50px]
                              flex items-center justify-center
                              mr-2"
                />
              ) : (
                <Image
                  src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/position-${data.position.sub}.svg`}
                  alt={data.position.sub}
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
              {!data.most.first ? (
                <div
                  className="bg-[#25242A]
                               border rounded border-[#323036]
                               w-[50px] h-[50px]
                               flex items-center justify-center
                               mr-2"
                />
              ) : (
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${data.most.first}.png`}
                  alt={data.most.first}
                  width={50}
                  height={50}
                  className="mr-1"
                />
              )}

              {!data.most.second ? (
                <div
                  className="bg-[#25242A]
                              border rounded border-[#323036]
                              w-[50px] h-[50px]
                              flex items-center justify-center
                              mr-2"
                />
              ) : (
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${data.most.second}.png`}
                  alt={data.most.second}
                  width={50}
                  height={50}
                  className="mr-1"
                />
              )}

              {!data.most.third ? (
                <div
                  className="bg-[#25242A]
                              border rounded border-[#323036]
                              w-[50px] h-[50px]
                              flex items-center justify-center
                              mr-2"
                />
              ) : (
                <Image
                  src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${data.most.third}.png`}
                  alt={data.most.third}
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
                src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/ranked-mini-crests/${data.tier.rank}.svg`}
                alt={data.tier.rank}
                width={60}
                height={60}
                className=" mr-2"
              />
              <div className="text-[12px]">
                <div className="flex ">
                  <span>{capitalize(data.tier.rank)}</span>
                  <span className="w-1" />
                  <span>{data.tier.tier}</span>
                </div>
                <span>{data.tier.lp}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="mt-5 font-bold">승률</div>

            <div className="flex items-center gap-2 w-full my-5">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
