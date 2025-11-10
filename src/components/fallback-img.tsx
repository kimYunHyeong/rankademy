"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export type FallBackImageProps = Omit<ImageProps, "src"> & {
  src: string;
  fallbackSrc?: string;
  fallbackClassName?: string;
  unoptimizedFallback?: boolean;
  onError?: ImageProps["onError"];
  onLoad?: ImageProps["onLoad"];
  fallbackDelayMs?: number; // 기본 100ms 지연
};

function isValidNextImageSrc(s?: string) {
  if (!s) return false;
  return (
    s.startsWith("/") ||
    /^https?:\/\//i.test(s) ||
    s.startsWith("data:") ||
    s.startsWith("blob:")
  );
}

export default function FallBackImage(props: FallBackImageProps) {
  const {
    src,
    alt,
    className,
    fallbackSrc = "/images/logo-underside-512x512.png",
    fallbackClassName,
    unoptimizedFallback = false,
    onError: userOnError,
    onLoad: userOnLoad,
    fallbackDelayMs = 100,
    ...rest
  } = props;

  const initialIsInvalid = !isValidNextImageSrc(src);
  const [hasError, setHasError] = useState(initialIsInvalid);

  // 현재 시도 중인 원본 src 추적 (지연 중에 src가 바뀌면 fallback 전환 방지)
  const lastSrcRef = useRef(src);
  const errorTimerRef = useRef<number | null>(null);

  // src 변경 시: 타이머 정리 & 오류 상태 재평가
  useEffect(() => {
    lastSrcRef.current = src;
    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current);
      errorTimerRef.current = null;
    }
    setHasError(!isValidNextImageSrc(src));
    // cleanup on unmount
    return () => {
      if (errorTimerRef.current) {
        clearTimeout(errorTimerRef.current);
        errorTimerRef.current = null;
      }
    };
  }, [src]);

  const usingFallback = hasError || initialIsInvalid;

  const { currentSrc, currentClassName } = useMemo(() => {
    return {
      currentSrc: usingFallback ? fallbackSrc : src,
      currentClassName: usingFallback
        ? [className, fallbackClassName].filter(Boolean).join(" ")
        : className ?? "",
    };
  }, [src, className, fallbackClassName, usingFallback, fallbackSrc]);

  return (
    <Image
      {...rest}
      src={currentSrc}
      alt={alt}
      className={currentClassName}
      // 로드 성공 시: 지연 타이머 취소 & 오류상태 해제
      onLoad={(e) => {
        if (errorTimerRef.current) {
          clearTimeout(errorTimerRef.current);
          errorTimerRef.current = null;
        }
        setHasError(false);
        userOnLoad?.(e);
      }}
      onError={(e) => {
        userOnError?.(e);

        // 이미 fallback을 쓰는 중이거나, 초기 형식 자체가 잘못된 경우는 즉시 유지
        if (usingFallback) return;

        // fallbackSrc 자체 로딩 실패 루프 방지
        if (currentSrc === fallbackSrc) return;

        if (errorTimerRef.current) {
          clearTimeout(errorTimerRef.current);
        }
        errorTimerRef.current = window.setTimeout(() => {
          if (lastSrcRef.current === src) {
            setHasError(true);
          }
          errorTimerRef.current = null;
        }, fallbackDelayMs);
      }}
      unoptimized={unoptimizedFallback && usingFallback}
    />
  );
}
