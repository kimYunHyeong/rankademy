import VerifyCard from "@/components/verify-card";
import { sendEmail, verifyCode } from "./verify-action";

export default function VerifyUnivPage() {
  return (
    <VerifyCard sendEmailAction={sendEmail} verifyCodeAction={verifyCode} />
  );
}
