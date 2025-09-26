import Image from "next/image";

export default function User() {
  return (
    <div className="flex">
      {/* 왼쪽 정보 */}
      <div className="text-white">
        {/* 사진 및 칭호 */}
        <div>
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${`Ezreal`}.png`}
            alt={`Ezreal`}
            width={30}
            height={30}
          />
          <div>{"부여된 칭호"}</div>
        </div>

        {/* 닉네임 */}
        <div>
          <span>닉네임</span>
          <span>{"니 카"}</span>
          <span>#{"Luffy"}</span>
        </div>

        {/* 소속 */}
        <div>
          <span>소속</span>
          <span>{"서울과학기술대학교"}</span>
          <span>
            {"컴퓨터공학과"} | {21}학번
          </span>
        </div>

        {/* 소개글 */}
        <div>
          <span>소개글</span>
          <span>{"소개글"}</span>
        </div>

        {/* 유저 정보 */}
        <div>
          <div>
            <span>모스트 챔피언</span>
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${`Ezreal`}.png`}
              alt={`Ezreal`}
              width={30}
              height={30}
            />
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${`Ezreal`}.png`}
              alt={`Ezreal`}
              width={30}
              height={30}
            />
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${`Ezreal`}.png`}
              alt={`Ezreal`}
              width={30}
              height={30}
            />
          </div>

          <div>
            <span>포지션</span>
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${`Ezreal`}.png`}
              alt={`Ezreal`}
              width={30}
              height={30}
            />
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${`Ezreal`}.png`}
              alt={`Ezreal`}
              width={30}
              height={30}
            />
          </div>

          <div>
            <span>티어</span>
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/15.17.1/img/champion/${`Ezreal`}.png`}
              alt={`Ezreal`}
              width={30}
              height={30}
            />
            <span>
              {"Emerald"} {4}
            </span>
            <span>{50}LP</span>
          </div>

          <div>승률 그래프</div>
        </div>
      </div>
      {/* 왼쪽 로고 */}
      <div>
        <Image src={`/images/logo.png`} alt={"logo"} width={150} height={30} />
      </div>
    </div>
  );
}
