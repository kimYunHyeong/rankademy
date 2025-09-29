"use client";

import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({ top: 0 });
    }
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={() => router.back()}
      className="
        m-0 p-0 border-none bg-transparent
        backdrop:bg-black/50
      "
    >
      {/* 클릭 닫기용 오버레이 */}
      <div className="fixed inset-0" onClick={() => router.back()} />

      {/* 정중앙 배치 컨테이너 */}
      <div
        className="
          fixed inset-0
          flex items-center justify-center
          pointer-events-none   /* 오버레이 클릭 통과 */
        "
      >
        <div
          className="
            pointer-events-auto  /* 콘텐츠는 클릭 가능 */
            w-[500px] h-[670px] rounded-2xl bg-[#110D17]
          "
        >
          {children}
        </div>
      </div>
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
}
