"use client";

import FallBackImage from "@/components/fallback-img";
import { redirect, useRouter } from "next/navigation";

export default function DeleteMePopUp({
  deleteAction,
}: {
  deleteAction: () => Promise<void>;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await deleteAction();
      await fetch("/auth/logout", {
        method: "POST",
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json" },
      });

      // ✅ 모달/인터셉팅을 완전히 우회
      if (typeof window !== "undefined") {
        window.location.replace("/");
      }
    } catch (e) {
      console.error(e);
      // 실패 시에만 모달 닫기(선택)
      router.back();
    }
  };

  return (
    <>
      <div className="flex flex-col w-[450px] h-60 border border-[#323036] rounded bg-[#25242A] text-white justify-center items-center">
        <div className=" flex flex-col justify-center items-center mb-5">
          <FallBackImage
            src={`/images/pink-caution.png`}
            alt={"pink-caution"}
            width={48}
            height={48}
          />
          <span className="text-white text-2xl my-3">
            회원을 탈퇴하시겠습니까?
          </span>
        </div>
        <div className="flex justify-end mt-5">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center 
                       border border-[#323036] 
                       w-[195px] h-11 text-[#B1ACC1] rounded 
                      hover:bg-[#24192F]
                      transition-colors duration-300 ease-in-out
                       bg-[#25242A33] text-center mr-3"
          >
            취소
          </button>
          <button
            onClick={() => {
              handleLogout();
            }}
            className="flex items-center justify-center
                      w-[195px] h-11 text-white rounded
                      bg-[#FF567933]
                      hover:bg-[#FF5679]
                      transition-colors duration-300 ease-in-out
                      text-center"
          >
            삭제하기
          </button>
        </div>
      </div>
    </>
  );
}
