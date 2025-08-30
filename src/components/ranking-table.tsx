import univRanking from "@/mock/univdata.json";
import Image from "next/image";
export default async function RankingTable() {
  /*   const response = await fetch("@/mock/univdata");
  const univRanking: UnivData[] = await response.json();

  if (!response.ok) {
    return <div>오류가 발생했습니다.</div>;
  } */

  return (
    <div className="space-y-1">
      {/* Table Header */}
      <div className="rounded-md overflow-hidden bg-[#24192F] px-6 py-4 grid grid-cols-6 gap-4 text-sm font-medium text-gray-300">
        <div>랭킹</div>
        <div>학교명</div>
        <div>학생 수</div>
        <div>대항전 진행</div>
        <div>대항전 승리</div>
        <div>랭커</div>
      </div>

      {/* Table Body */}
      <div className=" [&>*]:rounded-md [&>*]:overflow-hidden space-y-1  divide-y divide-[#2E223F]">
        {univRanking.map((university, index) => (
          <div
            key={index}
            className={`px-6 py-4 grid grid-cols-6 gap-4 items-center hover:bg-gray-700/50 transition-colors
        ${
          index % 2 === 0
            ? index <= 2
              ? "bg-[#2E223F] bg-gradient-to-r from-[#FF5679]/20 to-transparent"
              : "bg-[#2E223F]"
            : index <= 2
            ? "bg-[#24192F] bg-gradient-to-r from-[#FF5679]/20 to-transparent"
            : "bg-[#24192F]"
        }
      `}
          >
            {/*1~3등 마름모 뱃지 */}
            <div className="flex items-center ">
              {index <= 2 ? (
                <div
                  className="w-8 h-8 rotate-45 flex items-center justify-center"
                  style={{
                    backgroundColor: "#1D1921",
                    border: "2px solid transparent",
                    borderImage: "linear-gradient(135deg, #FFA1D9, #FF5679) 1",
                    borderImageSlice: 1,
                  }}
                >
                  <span className="-rotate-45 text-[#FFA1D9] text-sm font-medium leading-none">
                    {index + 1}
                  </span>
                </div>
              ) : (
                <span className="text-white font-medium ">{index + 1}</span>
              )}
            </div>

            {/* 대학 이름 + 아이콘 */}
            <div className="flex items-center space-x-3">
              <Image
                src={`/univ-emblem/${university.univName}.png`}
                width={40}
                height={40}
                alt={`${university.univName}의 로고`}
                className="rounded-full"
              />
              {index <= 2 ? (
                <span className=" bg-[linear-gradient(149.06deg,_#FFA1D9_10.49%,_#FF5679_60.64%)] bg-clip-text text-transparent font-bold">
                  {university.univName}
                </span>
              ) : (
                <span className="text-white">{university.univName}</span>
              )}
            </div>

            {/* 통계 */}
            <div className="text-gray-300">{university.studentCnt}</div>
            <div className="text-gray-300">{university.competitionCnt}</div>
            <div className="text-gray-300">{university.competitionWinCnt}</div>

            {/* 랭커 정보 */}
            <div className="flex items-center space-x-2">
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/13.10.1/img/champion/${university.ranker.icon}.png`}
                width={40}
                height={40}
                alt={`${university.ranker.icon}의 로고`}
              />

              <span className="text-gray-300 text-sm">
                {university.ranker.username}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="my-5 h-10 text-white  flex justify-between ">
        <div>---</div>
        <div>페이지 네비게이션</div>
        <div>---</div>
      </div>
    </div>
  );
}
