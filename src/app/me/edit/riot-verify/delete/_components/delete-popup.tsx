"use client";

import FallBackImage from "@/components/fallback-img";
import { useRouter } from "next/navigation";

export default function DeleteRiotVerifyPopUp({
  deleteAction,
}: {
  deleteAction: () => Promise<{ ok: true; error: null }>;
}) {
  const router = useRouter();
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
            라이엇 연동을 해제하시겠습니까?
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
            돌아가기
          </button>
          <button
            onClick={() => {
              deleteAction();

              router.push("/me");
            }}
            className="flex items-center justify-center
                      w-[195px] h-11 text-white rounded
                      bg-[#FF567933]
                      hover:bg-[#FF5679]
                      transition-colors duration-300 ease-in-out
                      text-center"
          >
            인증 해제
          </button>
        </div>
      </div>
    </>
  );
}
