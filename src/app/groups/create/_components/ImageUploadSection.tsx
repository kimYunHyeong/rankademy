"use client";

import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid"; //랜덤 문자열
import Image from "next/image";

export default function GroupLogoUploadSectiond({
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

  /* 사진 비율 설정 */
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

  /* 사진 설정 */
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

    // 랜덤 문자열 생성
    const randomId = uuidv4().slice(0, 16); // 8자리로 짧게 자르기
    const ext = file.name.split(".").pop() ?? "png";
    const newName = `group-logo-${randomId}.${ext}`;

    // 새 파일 객체 생성
    const renamedFile = new File([file], newName, { type: file.type });

    // 미리보기 URL
    const url = URL.createObjectURL(renamedFile);
    setPreviewUrl(url);

    // 부모로 전달
    onChange?.(renamedFile);
  };

  /* 사진을 끌어놨을 때의 액션 */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) validateAndSet(f);
  };

  /* 사진을 직접 첨부했을 때의 액션 */
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) validateAndSet(f);
  };

  /* 이미지 없애기 */
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
          <div className="flex flex-col justify-center items-center gap-2 pointer-events-none h-[140px] md:h-40">
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
