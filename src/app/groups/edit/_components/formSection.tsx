"use client";

import { useState } from "react";
import { ImageUrl, ImageUrlRes } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreateGroupResult } from "../actions";
import GroupLogoUploadSection from "./ImageUploadSection";

/*  Pre-Signed URL 발급 객체 생성 */
export function makeImageUrlPayload(file: File | null): ImageUrl[] {
  if (!file) return [];
  return [
    {
      key: file.name,
      contentType: file.type,
    },
  ];
}

export default function CreateGroupFormSection({
  imgUrlAction,
  submitAction,
}: {
  submitAction: (formData: FormData) => Promise<CreateGroupResult>;
  imgUrlAction: (payload: ImageUrl[]) => Promise<ImageUrlRes[]>;
}) {
  const [form, setForm] = useState();
  const router = useRouter();

  const [logoUrl, setLogoUrl] = useState<string>("");

  async function handleLogoChange(file: File | null) {
    if (!file) return;

    try {
      // 1) 발급 요청
      const payload: ImageUrl[] = makeImageUrlPayload(file);
      const res: ImageUrlRes[] = await imgUrlAction(payload);

      const presignedUrl = res?.[0]?.presignedUrl ?? "";
      const publicUrl = res?.[0]?.publicUrl ?? "";

      if (!presignedUrl) throw new Error("presignedUrl 없음");

      const putRes = await fetch(presignedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      if (!putRes.ok) {
        console.error("❌ S3 PUT 실패", putRes.status, putRes.statusText);
        throw new Error(
          `S3 업로드 실패: ${putRes.status} ${putRes.statusText} `
        );
      }

      console.log("✅ S3 업로드 성공:", publicUrl);
      setLogoUrl(publicUrl);
      return publicUrl;
    } catch (e) {
      console.error("❌ 로고 업로드 실패:", e);
    }
  }

  /* 폼 제출 액션 */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res: CreateGroupResult = await submitAction(fd);

    if (!res.ok) {
      const err = res.error ?? {};
      alert(
        `그룹 생성 실패\n\n` +
          `상태 코드: ${err.status ?? "-"}\n` +
          (err.title ? `제목: ${err.title}\n` : "")
      );
      return;
    }
    // 성공 처리
    router.replace("/groups");
  }

  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-3">
        <span>그룹 생성</span>
      </div>
      <div className="h-20"></div>

      {/* 본문 */}
      <form
        onSubmit={handleSubmit}
        className="p-8 flex flex-col border-2 border-[#25242A] rounded bg-[#25242A33] w-full min-h-[480px] h-auto"
      >
        {/* 그룹 이름 */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-white text-sm">
            그룹 이름
          </label>
          <input
            id="name"
            name="name"
            className="bg-[#323036] border border-[#323036] rounded my-4 px-3 py-2 text-white"
            placeholder="그룹 이름을 입력하세요"
            required
          />
        </div>

        {/* 그룹 소개 */}
        <div className="flex flex-col my-10">
          <label
            htmlFor="about"
            className="text-white text-sm self-start mt-0.5"
          >
            그룹 소개
          </label>
          <textarea
            id="about"
            name="about"
            className="my-4 text-sm leading-relaxed text-left wrap-break-word max-h-[140px] overflow-y-auto scrollbar-none bg-[#323036] border border-[#323036] rounded px-3 py-2 text-white resize-none"
            rows={5}
            placeholder="그룹 소개를 입력하세요"
            required
          />
        </div>

        {/* 그룹 이미지 */}
        <div className="flex flex-col">
          <span className="text-white text-sm">그룹 이미지</span>
          <GroupLogoUploadSection
            onChange={(file) => handleLogoChange(file)}
            className="my-4"
          />
          {/* 숨겨진 input (FormData에서 name을 명시적으로 포함하기 위함) */}
          <input type="hidden" name="logoImage" value={logoUrl} readOnly />
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-end mt-5">
          <Link
            href={`/groups`}
            className="flex items-center justify-center border border-[#323036] w-[120px] h-11 text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
          >
            취소
          </Link>

          <button
            type="submit"
            className="flex items-center justify-center w-[120px] h-11 text-white rounded bg-[#FF567933] text-center  hover:bg-[#FF5679] transition-colors duration-300 ease-in-out"
          >
            그룹 생성하기
          </button>
        </div>
      </form>
    </>
  );
}
