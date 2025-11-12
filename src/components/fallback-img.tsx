"use client";

import Image, { ImageProps } from "next/image";
import { useMemo, useState, useEffect } from "react";

/** next/image가 허용하는 src 형식 검증 */
function isValidNextImageSrc(s?: string) {
  if (!s) return false;
  return (
    s.startsWith("/") ||
    /^https?:\/\//i.test(s) ||
    s.startsWith("data:") ||
    s.startsWith("blob:")
  );
}

export type FallBackImageProps = Omit<ImageProps, "src"> & {
  src: string;
  fallbackSrc?: string;
  fallbackClassName?: string;
  unoptimizedFallback?: boolean;
};

export default function FallBackImage({
  src,
  className,
  fallbackSrc = "/images/logo-underside-512x512.png",
  fallbackClassName,
  unoptimizedFallback = false,
  ...rest
}: FallBackImageProps) {
  const initialInvalid = !isValidNextImageSrc(src);
  const [failed, setFailed] = useState<boolean>(initialInvalid);
  const [show, setShow] = useState(false);

  // 100ms 지연 후 렌더링
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const usingFallback = failed || initialInvalid;

  const display = useMemo(
    () => ({
      src: usingFallback ? fallbackSrc : src,
      className: usingFallback
        ? [className, fallbackClassName].filter(Boolean).join(" ")
        : className ?? "",
      unoptimized: usingFallback && unoptimizedFallback,
    }),
    [
      usingFallback,
      fallbackSrc,
      src,
      className,
      fallbackClassName,
      unoptimizedFallback,
    ]
  );

  if (!show) return null;

  return (
    <Image
      {...rest}
      src={display.src}
      alt={display.src}
      className={display.className}
      unoptimized={display.unoptimized}
      onError={() => {
        if (!failed) setFailed(true);
        rest.onError?.(new Event("error") as any);
      }}
    />
  );
}
