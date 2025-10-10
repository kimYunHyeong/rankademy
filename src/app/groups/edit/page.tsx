"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function GroupImageUpload({
  onChange,
  initialPreviewUrl,
  accept = "image/*",
  maxSizeMB = 5,
  className = "",
}: {
  onChange?: (file: File | null) => void;
  initialPreviewUrl?: string;
  accept?: string;
  maxSizeMB?: number;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialPreviewUrl ?? null
  );
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  useEffect(() => {
    if (!previewUrl) {
      setAspectRatio(null);
      return;
    }
    const img = new window.Image();
    img.onload = () => {
      if (img.width && img.height) setAspectRatio(img.width / img.height);
    };
    img.src = previewUrl;
  }, [previewUrl]);

  const openFileDialog = () => inputRef.current?.click();

  const validateAndSet = (file: File) => {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("이미지 파일만 업로드할 수 있어요.");
      return;
    }
    const limit = maxSizeMB * 1024 * 1024;
    if (file.size > limit) {
      setError(`파일 용량이 너무 커요. 최대 ${maxSizeMB}MB까지 가능합니다.`);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onChange?.(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) validateAndSet(f);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) validateAndSet(f);
  };

  const clearImage = () => {
    setPreviewUrl(null);
    setAspectRatio(null);
    if (inputRef.current) inputRef.current.value = "";
    onChange?.(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        role="button"
        tabIndex={0}
        aria-label="그룹 이미지 업로드"
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && openFileDialog()
        }
        onClick={openFileDialog}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={[
          "relative w-full rounded",
          "border border-[#323036] bg-[#323036] text-[#B1ACC1]",
          "flex items-center justify-center overflow-hidden",
          "transition-colors",
          isDragging ? "outline outline-[#B1ACC1]/60" : "",
          className,
        ].join(" ")}
        // 프리뷰가 없을 땐 고정 높이, 있으면 이미지 비율대로 자동 높이
        style={
          previewUrl && aspectRatio
            ? { aspectRatio } // e.g. 16/9
            : undefined
        }
      >
        {previewUrl ? (
          <>
            {/* 이미지 전체 보이기 (잘림 없음) */}
            <img
              src={previewUrl}
              alt="미리보기"
              className="w-full h-full object-contain"
              draggable={false}
            />

            {/* 오버레이 */}
            <div className="pointer-events-none absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-xs md:text-sm">
                클릭하거나 이미지를 다시 드래그해 변경
              </span>
            </div>

            {/* 우상단 삭제 버튼 */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                clearImage();
              }}
              className="absolute top-2 right-2 rounded bg-black/50 px-2 py-1 text-xs hover:bg-black/70"
            >
              제거
            </button>
          </>
        ) : (
          // 비어 있을 때: 안내 높이 유지
          <div className="flex flex-col justify-center items-center gap-2 pointer-events-none h-[140px] md:h-[160px]">
            <Image
              src="/images/image.png"
              alt="image"
              width={24}
              height={24}
              className="rounded object-contain"
              draggable={false}
            />
            <span className="text-[#B1ACC1] text-sm md:text-base">
              이미지 업로드
            </span>
            <span className="text-[#B1ACC1] text-[11px] opacity-70">
              클릭 또는 드래그하여 업로드
            </span>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleInput}
          className="hidden"
        />
      </div>

      <div className="flex justify-end">
        {error && <p className="text-xs text-red-400">{error}</p>}
        <p className="text-[11px] text-[#B1ACC1]/70 ">
          권장: JPG/PNG/WebP · 최대 {maxSizeMB}MB
        </p>
      </div>
    </div>
  );
}

export default function Page() {
  const [form, setForm] = useState();

  const handle =
    (path: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const value = e.target.value;
      setForm((prev) => {
        const next: any = structuredClone(prev);
        const keys = path.split(".");
        let cur = next;
        for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
        cur[keys[keys.length - 1]] = value;
        return next;
      });
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 서버 액션 / API 연동
    // await updateProfile(form)
    console.log("submit payload:", form);
    // router.push("/mypage");
  };

  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-3">
        <span>그룹 생성</span>
      </div>
      <div className="h-20"></div>

      {/* 본문 */}
      <div className="p-8 flex flex-col border-2 border-[#25242A] rounded bg-[#25242A33] w-full min-h-[480px] h-auto">
        {/* 그룹 이름 */}
        <div className="flex flex-col">
          <span className="text-white text-sm">학과</span>
          <input
            className="bg-[#323036] border border-[#323036] rounded my-4 px-3 py-2 text-white"
            onChange={handle("major")}
            placeholder="그룹이름"
          />
        </div>

        {/* 그룹 소개 */}
        <div className="flex flex-col my-10">
          <span className="text-white text-sm self-start mt-[2px]">
            그룹 소개
          </span>
          <textarea
            className="my-4 text-sm leading-relaxed text-left break-words max-h-[140px] overflow-y-auto scrollbar-none bg-[#323036] border border-[#323036] rounded px-3 py-2 text-white resize-none"
            onChange={handle("description")}
            rows={5}
            placeholder="자기소개를 입력하세요"
          />
        </div>

        {/* 그룹 이미지 */}
        <div className="flex flex-col">
          <span className="text-white text-sm">그룹 이미지</span>
          <GroupImageUpload
            onChange={(file) => {
              // 업로드 직후 서버 전송 로직 연결 가능
              // 예: setForm((s) => ({ ...s, groupImageFile: file }));
            }}
            className="my-4"
          />
        </div>
      </div>

      <div className="flex justify-end mt-5">
        <Link
          href={`/groups`}
          className="flex items-center justify-center border border-[#323036] w-[120px] h-[44px] text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-2"
        >
          취소
        </Link>
        <Link
          href={`/recruits/edit`}
          className="flex items-center justify-center w-[120px] h-[44px] font-semibold text-white rounded bg-[#FF567933] text-center"
        >
          그룹 생성하기(요청 로직 작성 필요)
        </Link>
      </div>
    </>
  );
}
