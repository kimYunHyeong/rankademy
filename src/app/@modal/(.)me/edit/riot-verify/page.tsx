import RiotVerifyCard from "@/components/riot-verify-card";
import { RiotVerify } from "@/app/me/edit/riot-verify/actions";

export default function RiotVerifySection() {
  return <RiotVerifyCard verifyAction={RiotVerify} />;
}
