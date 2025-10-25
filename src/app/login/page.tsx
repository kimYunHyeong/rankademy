"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginCard from "@/components/login-card";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.replace("/");
    }
  }, [router]);
  return (
    <div className="flex justify-center items-center h-full bg-[#0F0E12]">
      <LoginCard />
    </div>
  );
}
