"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DeleteRecruits() {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col w-[450px] h-[240px] border border-[#323036] rounded bg-[#25242A] text-white justify-center items-center">
        <div className=" flex flex-col justify-center items-center mb-5">
          <Image
            src={`/images/pink-caution.png`}
            alt={"pink-caution"}
            width={48}
            height={48}
          />
          <span className="text-white text-2xl my-3">
            게시글을 삭제하시겠습니까?
          </span>
        </div>
        <div className="flex justify-end mt-5">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center border border-[#323036] w-[195px] h-[44px] text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-3"
          >
            취소
          </button>
          <button className="flex items-center justify-center  w-[195px] h-[44px]  text-white rounded bg-[#FF567933] text-center">
            삭제하기(로직 필요)
          </button>
        </div>
      </div>
    </>
  );
}
