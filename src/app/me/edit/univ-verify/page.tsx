import VerifyCard from "@/components/verify-card";
import { sendEmail, verifyCode } from "./action";

export default function VerifyUnivPage() {
  return (
    <VerifyCard sendEmailAction={sendEmail} verifyCodeAction={verifyCode} />
  );
}
