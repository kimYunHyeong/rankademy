import PopupMessage from "@/components/popup-message";

export default async function DeleteGroupMemberOkPage({
  searchParams,
}: {
  searchParams: Promise<{
    userId: number;
    summonerName: string;
    summonerTag: string;
  }>;
}) {
  const sp = await searchParams;
  const summonerName = sp.summonerName;
  const summonerTag = sp.summonerTag;
  return (
    <PopupMessage
      img="round-check"
      text={`${summonerName}#${summonerTag}님이 추방되었습니다.`}
    />
  );
}
