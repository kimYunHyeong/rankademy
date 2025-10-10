import IDCard from "@/components/id-card";
import { userInfoData } from "@/mock/userInfoData";

export default function User() {
  return (
    <div className="min-h-dvh flex justify-center items-center">
      <IDCard data={userInfoData} />
    </div>
  );
}
