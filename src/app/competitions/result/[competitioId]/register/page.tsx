"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

/** 이미지 업로드 컴포넌트 */
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
        style={
          previewUrl && aspectRatio
            ? { aspectRatio } // 이미지 비율 유지
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

      {/* 에러 메시지 */}
      {error && <div className="text-xs text-red-400 mt-1">{error}</div>}
    </div>
  );
}

/** 페이지 */
export default function Page() {
  const [form, setForm] = useState<any>({});
  // 세트: 초기 1개, 최대 5개
  const [sets, setSets] = useState<Array<{ file: File | null }>>([
    { file: null },
  ]);

  const addSet = () => {
    setSets((prev) => (prev.length >= 5 ? prev : [...prev, { file: null }]));
  };

  const setFileAt = (idx: number, file: File | null) => {
    setSets((prev) => {
      const next = [...prev];
      next[idx] = { file };
      return next;
    });
  };

  const handle =
    (path: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const value = e.target.value;
      setForm((prev: any) => {
        const next: any = structuredClone(prev ?? {});
        const keys = path.split(".");
        let cur = next;
        for (let i = 0; i < keys.length - 1; i++) {
          cur[keys[i]] = cur[keys[i]] ?? {};
          cur = cur[keys[i]];
        }
        cur[keys[keys.length - 1]] = value;
        return next;
      });
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 서버 액션 / API 연동
    // payload 예시: { ...form, sets: sets.map(s => s.file) }
    console.log("submit payload:", { ...form, sets });
    // router.push("/mypage");
  };

  const router = useRouter();

  return (
    <>
      {/* 헤더 */}
      <div className="flex items-center justify-center text-white my-3">
        <span>결과 등록</span>
      </div>
      <div className="h-5" />

      {/* 세트 결과 업로드 섹션들 */}
      {sets.map((s, idx) => (
        <div
          key={idx}
          className="p-8 flex border-2 border-[#25242A] rounded bg-[#25242A33] w-full h-auto mb-5"
        >
          {/* 결과 이미지 업로드 */}
          <div className="flex flex-col w-[260px]">
            <GroupImageUpload
              onChange={(file) => setFileAt(idx, file)}
              className="my-4"
            />
            <span className="text-[#B1ACC1] text-xs opacity-70">
              세트 {idx + 1}
            </span>
          </div>

          {/* 팀 정보 */}
          <div className="flex flex-col ml-10 items-center justify-center">
            <span className="text-[#B1ACC1] text-2xl">
              {"서울과학기술대학교 팀"}
            </span>
            <div className="my-4" />
            <span className="text-[#B1ACC1] text-2xl">
              {"서울과학기술대학교 팀"}
            </span>
          </div>
        </div>
      ))}

      {/* 세트 추가 버튼 (최대 5개) */}
      <button
        type="button"
        onClick={addSet}
        disabled={sets.length >= 5}
        className={[
          "p-8 flex items-center border-2 border-[#25242A] rounded bg-[#25242A33] text-[#B1ACC1] w-full h-auto",
          sets.length >= 5
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[#2b2830]",
        ].join(" ")}
      >
        <Image src="/images/plus.png" alt={"plus"} width={20} height={20} />
        <span className="ml-5">세트 추가 {sets.length}/5</span>
      </button>

      {/* 메모 */}
      <div className="flex flex-col my-10">
        <textarea
          className="my-4 text-sm leading-relaxed text-left break-words max-h-[140px] overflow-y-auto scrollbar-none bg-[#323036] border border-[#323036] rounded px-3 py-2 text-white resize-none"
          onChange={handle("description")}
          rows={5}
          placeholder="메모"
        />
      </div>

      {/* 하단 버튼 */}
      <div className="flex justify-end mt-5">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center border border-[#323036] w-[195px] h-[44px] text-[#B1ACC1] rounded bg-[#25242A33] text-center mr-3"
        >
          취소
        </button>
        <Link
          href={`/recruits/edit`}
          className="flex items-center justify-center w-[120px] h-[44px] text-white rounded bg-[#FF567933] text-center"
        >
          제출하기(요청 로직 작성 필요)
        </Link>
      </div>
    </>
  );
}
