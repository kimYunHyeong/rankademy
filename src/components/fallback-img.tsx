"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

interface FallBackImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallbackSrc?: string;
  fallbackClassName?: string;
  draggable?: boolean;
  unoptimizedFallback?: boolean; // 외부 도메인 미설정 대비(선택)
}

function isValidNextImageSrc(s?: string) {
  if (!s) return false;
  // next/image가 허용하는 형태: / 로 시작, http(s)://, data:, blob:
  return (
    s.startsWith("/") ||
    /^https?:\/\//i.test(s) ||
    s.startsWith("data:") ||
    s.startsWith("blob:")
  );
}

export default function FallBackImage({
  src,
  alt,
  width,
  height,
  className,
  fallbackSrc = "/images/logo-underside-512x512.png",
  fallbackClassName,
  draggable,
  unoptimizedFallback = false,
}: FallBackImageProps) {
  // 1) 렌더 전 형식 검증 → 잘못된 형식이면 바로 fallback 사용
  const initialIsInvalid = !isValidNextImageSrc(src);
  const [hasError, setHasError] = useState<boolean>(initialIsInvalid);

  // 현재 표시할 이미지 src/className 계산
  const { currentSrc, currentClassName } = useMemo(() => {
    const usingFallback = hasError || initialIsInvalid;
    return {
      currentSrc: usingFallback ? fallbackSrc : src,
      currentClassName: usingFallback
        ? [className, fallbackClassName].filter(Boolean).join(" ")
        : className ?? "",
    };
  }, [
    src,
    className,
    fallbackClassName,
    hasError,
    initialIsInvalid,
    fallbackSrc,
  ]);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      className={currentClassName}
      draggable={draggable}
      // 2) 네트워크 실패(404/403 등) 시 fallback으로 전환
      onError={() => {
        // 이미 fallback을 쓰는 중이라면 더 이상 루프 방지
        if (!hasError) setHasError(true);
      }}
      // 외부 도메인 미설정으로 인한 최적화 실패 대응이 필요할 때만 사용
      unoptimized={unoptimizedFallback && (hasError || initialIsInvalid)}
    />
  );
}
