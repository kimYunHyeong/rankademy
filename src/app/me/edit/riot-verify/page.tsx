import RiotVerifyCard from "@/components/riot-verify-card";
import { RiotVerify } from "./actions";

export default function RiotVerifySection() {
  return <RiotVerifyCard verifyAction={RiotVerify} />;
}
