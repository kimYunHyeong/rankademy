"use client";

import FallBackImage from "@/components/fallback-img";
import { useRouter } from "next/navigation";

type Props = {
  img: string;
  text: string;
  subText?: string;
};

export default function PopupMessage({ img, text, subText }: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col w-[450px] h-60 border border-[#323036] rounded bg-[#25242A] text-white justify-center items-center">
      <div className="h-[85%] flex flex-col justify-center items-center">
        <FallBackImage
          src={`/images/${img}.png`}
          alt={img}
          width={48}
          height={48}
        />
        <span className="text-white text-2xl my-3">{text}</span>
        {subText && <span className="text-sm text-[#B1ACC1]">{subText}</span>}
      </div>

      <button
        onClick={() => {
          router.back();

          setTimeout(() => {
            window.location.reload();
          }, 100);
        }}
        className="h-[10%] text-xs text-[#B1ACC1]"
      >
        닫기
      </button>
    </div>
  );
}
