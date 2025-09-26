"use client";

import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: ReactNode }) {
  /*
  처음 화면에 렌더링될 때는 dialog태그가 보이지 않는 상태일 것임
  그 값을 조정해주기위해 참조객체 선언
  */
  const dialogRef = useRef<HTMLDialogElement>(null);

  /* 만약 현재 상태가 꺼져있다면
강제로 모달을 보이도록 만들고
모달이 등장하자마자 스크롤이 가장 상단에 위치하도록 만든다
*/
  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, []);

  const router = useRouter();

  /* createPortal은 리엑트에서 제공하는 함수
    dialog 태그를 반환한다
    dom요소로 "modal-root"라는 요소를 찾아서
    그 타입을  HTMLElement로 단언함
    */
  return createPortal(
    <dialog
      /* esc를 누르면 모달이 꺼지도록 */
      onClose={() => router.back()}
      /* 만약 배경을 클릭하면 뒤로가기 
      nodeName의 타입을 아직 타입스크립트에서 지원하지 않기 때문에 as any로 감싸줌
      */
      onClick={(e) => {
        if ((e.target as any).nodeName === "DIALOG") {
          router.back();
        }
      }}
      ref={dialogRef}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
}
