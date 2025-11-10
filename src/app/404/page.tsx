import FallBackImage from "@/components/fallback-img";
import Link from "next/link";

export default function Page404() {
  return (
    <>
      <div className="flex justify-center items-center  h-full">
        <div
          className="flex flex-col justify-center items-center
                     w-800 h-200 
                     border border-[#323036] rounded 
                     bg-[#25242A] text-white 
                     p-4"
        >
          <FallBackImage
            src="/images/logo-underside.png"
            alt="Rankademy 로고"
            width={300}
            height={200}
            className="object-contain"
          />

          <span className="text-white text-2xl">
            페이지를 찾을 수 없습니다!
          </span>

          <span className="text-[#B1ACC1] text-s mt-5 ">
            지금 입력하신 주소의 페이지는 사라졌거나 다른 페이지로
            변경되었습니다.
          </span>
          <span className="text-[#B1ACC1] text-s mb-15">
            주소를 다시 확인해주세요.
          </span>

          {/* 닫기 버튼 */}
          <Link
            href={"/"}
            className="flex items-center justify-center w-30 h-15 text-white rounded bg-[#FF567933] text-center hover:bg-[#FF5679] transition-colors duration-300 ease-in-out"
          >
            홈으로
          </Link>
        </div>
      </div>
    </>
  );
}
