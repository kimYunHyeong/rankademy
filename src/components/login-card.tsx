import FallBackImage from "@/components/fallback-img";
import Link from "next/link";

export default function LoginCard() {
  return (
    <div className="w-[700px] h-[570px]  bg-[#323036] flex flex-col items-center">
      <FallBackImage
        src="/images/logo-underside.png"
        alt="Rankademy 로고"
        width={147}
        height={110}
        className="my-15"
      />

      <div className="my-5">
        {/* 카카오 로그인 */}
        <Link href={`http://api.rankademy.kr/oauth2/authorization/kakao`}>
          <div className="bg-[#FEE500] w-[572px] h-16 flex rounded justify-center items-center">
            <FallBackImage
              src="/images/kakao-logo.png"
              alt="카카오 로고"
              width={48}
              height={48}
              className="w-[10%] ml-10"
            />
            <span className="w-[90%] text-black text-center">
              카카오 로그인
            </span>
          </div>
        </Link>

        {/* 네이버 로그인 */}
        <Link href={`http://api.rankademy.kr/oauth2/authorization/naver`}>
          <div className="bg-[#03C75A] w-[572px] h-16 flex rounded justify-center items-center my-5">
            <FallBackImage
              src="/images/naver-logo.png"
              alt="네이버 로고"
              width={48}
              height={48}
              className="w-[10%] ml-10"
            />
            <span className="w-[90%] text-white text-center">
              네이버 로그인
            </span>
          </div>
        </Link>

        <Link href={`http://api.rankademy.kr/oauth2/authorization/google`}>
          {/* 구글 로그인 */}
          <div className="bg-white w-[572px] h-16 flex rounded justify-center items-center">
            <FallBackImage
              src="/images/google-logo.png"
              alt="구글 로고"
              width={48}
              height={48}
              className="w-[10%] ml-10"
            />
            <span className="w-[90%] text-black text-center">구글 로그인</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
