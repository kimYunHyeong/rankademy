// src/components/modal.tsx
"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  // 포털 대상과 마운트 여부를 state로 관리
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  // 1) 클라이언트 마운트 후에만 container를 잡음
  useEffect(() => {
    setMounted(true);
    setContainer(document.getElementById("modal-root") as HTMLElement | null);
  }, []);

  // 2) dialog가 DOM에 붙은 다음에 showModal 실행
  useEffect(() => {
    if (!mounted || !container) return;
    const dlg = dialogRef.current;
    if (!dlg) return;

    // 다음 프레임에 실행하면 연결이 확실함
    const id = requestAnimationFrame(() => {
      if (!dlg.open) {
        try {
          dlg.showModal();
          dlg.scrollTo({ top: 0 });
        } catch {
          // showModal은 이미 열린 dialog에 호출하면 throw 가능
        }
      }
    });
    return () => cancelAnimationFrame(id);
  }, [mounted, container]);

  // 서버/프리렌더 단계 또는 아직 container가 없으면 아무 것도 렌더하지 않음
  if (!mounted || !container) return null;

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
      <div
        className="fixed inset-0"
        onClick={() => {
          router.back();

          setTimeout(() => {
            window.location.reload();
          }, 100);
        }}
      />

      {/* 정중앙 배치 컨테이너 */}
      <div
        className="
          fixed inset-0
          flex items-center justify-center
          pointer-events-none
        "
      >
        <div
          className="
            pointer-events-auto
            w-auto h-auto max-w-[90vw] max-h-[90vh]
            rounded bg-[#110D17]
            overflow-auto
          "
        >
          {children}
        </div>
      </div>
    </dialog>,
    container
  );
}
