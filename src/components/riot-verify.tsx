import FallBackImage from "./fallback-img";
import Link from "next/link";

export default function RiotVerifySection() {
  return (
    <>
      <Link href={"/me/edit/riot-verify"}>
        <div
          className="flex items-center justify-between
                w-full h-[88px]
                text-white  rounded 
                bg-[#25242A] text-center mt-5 p-6"
        >
          <div className="flex items-center">
            <FallBackImage
              src="/images/riot-logo.png"
              alt={"riot-logo"}
              width={40}
              height={40}
            />
            <span className="ml-8">라이엇 게임즈</span>
          </div>

          <FallBackImage
            src="/images/plus.png"
            alt={"plus"}
            width={20}
            height={20}
            className="items-end"
          />
        </div>
      </Link>
    </>
  );
}
