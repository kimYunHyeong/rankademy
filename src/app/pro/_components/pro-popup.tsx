"use client";

import FallBackImage from "@/components/fallback-img";
import { useRouter } from "next/navigation";

export default function ProPopUp() {
  const router = useRouter();
  return (
    <>
      <div
        className="flex flex-col justify-center items-center
                     w-[500px] h-100 
                     border border-[#323036] rounded 
                     bg-[#25242A] text-white 
                     p-4"
      >
        <FallBackImage
          src="/images/pro-active.png"
          alt="Rankademy 로고"
          width={300}
          height={200}
          className="object-contain"
        />

        <span className="text-white text-2xl mb-15">
          PRO 구독 기능 업데이트 예정
        </span>

        {/* 닫기 버튼 */}
        <button
          onClick={() => {
            router.back();

            setTimeout(() => {
              window.location.reload();
            }, 100);
          }}
          className="h-[10%] text-xs text-[#B1ACC1] mt-5"
        >
          닫기
        </button>
      </div>
    </>
  );
}
