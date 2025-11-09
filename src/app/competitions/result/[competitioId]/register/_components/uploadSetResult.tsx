import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { OcrResult } from "@/types";

export default function UploadCompeitionReusltImage({
  teamA,
  teamAMembers,
  teamB,
  teamBMembers,
  requestOcr,
  onChange,
  onOcrResult,
  initialPreviewUrl,
  accept,
}: {
  teamA: string;
  teamAMembers: string[];
  teamB: string;
  teamBMembers: string[];
  requestOcr: (formData: FormData) => Promise<OcrResult>;
  onChange?: (file: File | null) => void;
  onOcrResult?: (result: OcrResult | null) => void;
  initialPreviewUrl?: string;
  accept?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialPreviewUrl ?? null
  );
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  // OCR 상태
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrResult, setOcrResult] = useState<OcrResult | null>(null);

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

  // 파일 검증 + 설정 + OCR 요청
  const validateAndSet = (file: File) => {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("이미지 파일만 업로드할 수 있어요.");
      return;
    }
    const limit = 5 * 1024 * 1024;
    if (file.size > limit) {
      setError(`파일 용량이 너무 커요. 최대 5MB까지 가능합니다.`);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onChange?.(file);

    // 이미지가 유효하면 즉시 OCR 요청
    submitOcr(file).catch((e) => {
      // 에러는 내부에서 처리하지만, 혹시 모를 누락 대비
      console.error("[OCR] Unhandled error:", e);
    });
  };

  // OCR 요청 수행
  const submitOcr = async (file: File) => {
    try {
      setOcrLoading(true);
      setOcrResult(null);
      setError(null);

      const fd = new FormData();
      fd.append("image", file);
      fd.append("teamA", teamA);
      fd.append("teamB", teamB);
      // 배열은 서버에서 JSON으로 파싱하기 쉽게 문자열화
      fd.append("teamAMembers", JSON.stringify(teamAMembers));
      fd.append("teamBMembers", JSON.stringify(teamBMembers));

      // 콘솔에 요청 바디(요약) 출력
      console.log("✍️ [OCR Request] FormData", {
        image: { name: file.name, type: file.type, size: file.size },
        teamA,
        teamB,
        teamAMembers,
        teamBMembers,
      });

      const res = await requestOcr(fd);
      setOcrResult(res);
    } catch (e: any) {
      console.error("❌ [OCR Error]", e);
      setError(e?.message ?? "OCR 요청 중 오류가 발생했습니다.");
    } finally {
      setOcrLoading(false);
    }
  };

  /* 드롭 */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) validateAndSet(f);
  };

  /* 파일 선택 */
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) validateAndSet(f);
  };

  /* 이미지 제거 */
  const clearImage = () => {
    setPreviewUrl(null);
    setAspectRatio(null);
    setOcrResult(null);
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
          "border border-[#323036] bg-[#323036] text-[#B1ACC1] my-4",
          "flex items-center justify-center overflow-hidden",
          "transition-colors",
          isDragging ? "outline outline-[#B1ACC1]/60" : "",
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

            {/* OCR 상태 뱃지(선택) */}
            {ocrLoading && (
              <div className="absolute left-2 bottom-2 rounded bg-black/60 px-2 py-1 text-[11px]">
                OCR 분석 중…
              </div>
            )}
            {ocrResult && (
              <div className="absolute left-2 bottom-2 rounded bg-black/60 px-2 py-1 text-[11px]">
                {`승자: ${ocrResult.winner} / 경기시간: ${ocrResult.gameTime}`}
              </div>
            )}
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
          accept={accept ?? "image/*"}
          onChange={handleInput}
          className="hidden"
        />
      </div>

      {/* 에러 메시지 */}
      {error && <div className="text-xs text-red-400 mt-1">{error}</div>}
    </div>
  );
}
