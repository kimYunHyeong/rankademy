import Image from "next/image";

export default function MyPage() {
  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-3">
        <span>마이페이지</span>
      </div>

      <div className="flex flex-col">
        {/* 수정하기 버튼 */}
        <div className="flex items-center justify-end px-20">
          <div
            className="flex items-center justify-center 
                border border-[#323036] 
                w-[120px] h-[44px] 
                text-[#B1ACC1] rounded 
                bg-[#25242A33] text-center mt-10"
          >
            수정하기
          </div>
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
              src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${"Ezreal"}.png`}
              alt={"Ezreal"}
              width={100}
              height={100}
              className="rounded-2xl mr-4"
            />

            <div className="flex flex-col items-start">
              <span>소환사{"1231564"}</span>
              <div className="text-[40px] ">
                <span className="text-white">{"니 카 "}</span>
                <span>#{"luffy"}</span>
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
              {`서울과학기술대학교`}

              <Image
                src="/images/verified.png"
                alt={"verified"}
                width={20}
                height={20}
              />
            </div>

            {/* 학과 */}
            <span className="font-semibold text-sm">학과</span>
            <span className="text-sm">{`도예학과`}</span>

            {/* 학번 */}
            <span className="font-semibold text-sm">학번</span>
            <span className="text-sm">{`21`}학번</span>

            {/* 소개글 */}
            <span className="font-semibold text-sm self-start mt-[2px]">
              소개글
            </span>
            <p className="text-sm leading-relaxed text-left break-words max-h-[140px] overflow-y-auto scrollbar-none">
              {`소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글소개글`}
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

        <div
          className="flex items-center
                border-2 border-[#323036] 
                w-[20%] h-[480px]
                text-[#B1ACC1] rounded 
                bg-[#25242A33] text-center mt-10 p-[24px] "
        ></div>
      </div>
    </>
  );
}
