"use client";

import Image from "next/image";
import { useState } from "react";

interface FallBackImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallbackSrc?: string; // 대체 이미지 경로
  fallbackClassName?: string;
}

export default function FallBackImage({
  src,
  alt,
  width,
  height,
  className,
  fallbackSrc = "/images/logo-underside-512x512.png",
  fallbackClassName,
}: FallBackImageProps) {
  const [error, setError] = useState(false);

  return (
    <Image
      src={error ? fallbackSrc : src}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${fallbackClassName}`}
      onError={() => setError(true)} // 실패 시 fallbackSrc로 교체
    />
  );
}
