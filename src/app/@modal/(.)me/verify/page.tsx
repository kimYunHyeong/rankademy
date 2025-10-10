"use client";

import Modal from "@/components/modal";
import VerifyCard from "@/components/verify-card";
import { userInfoData } from "@/mock/userInfoData";

export default function Page(props: any) {
  const data = userInfoData;
  return (
    <Modal>
      <VerifyCard
        onRequestCode={async (email) => {
          // API 호출 예시
          // await fetch("/api/verify/request", { method:"POST", body: JSON.stringify({ email }) })
          console.log("request code:", email);
        }}
        onVerifyCode={async (email, code) => {
          // await fetch("/api/verify/confirm", { method:"POST", body: JSON.stringify({ email, code }) })
          console.log("verify:", email, code);
        }}
      />
    </Modal>
  );
}
