"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type QueryObject = Record<string, string>;

type SearchBoxProps = {
  /** 백엔드 쿼리 파라미터 키 (예: "univName", "name" 등) */
  queryKey: string;
  /** placeholder 텍스트 */
  placeholder?: string;
  /** px 또는 css width */
  width?: string | number;
  /** 엔터로 검색 시 호출 */
  onSubmit?: (q: QueryObject) => void;
  /** URL ?queryKey=value 로 동기화할지 여부 */
  syncToUrl?: boolean;
  /** 초기값을 URL에서 가져올지 여부 */
  initFromUrl?: boolean;
};

export default function SearchBox({
  queryKey,
  placeholder = "검색어",
  width = 300,
  onSubmit,
  syncToUrl = false,
  initFromUrl = true,
}: SearchBoxProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL에서 초기화 (옵션)
  const initial = useMemo(() => {
    if (initFromUrl) return searchParams.get(queryKey) ?? "";
    return "";
  }, [initFromUrl, searchParams, queryKey]);

  const [value, setValue] = useState(initial);

  /** ✅ Enter 또는 아이콘 클릭 시 검색 실행 */
  const commit = () => {
    const payload = { [queryKey]: value };
    onSubmit?.(payload);

    if (syncToUrl) {
      const sp = new URLSearchParams(searchParams.toString());
      if (value) sp.set(queryKey, value);
      else sp.delete(queryKey);
      router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
    }
  };

  /** ESC → 지우기 */
  const clear = () => {
    setValue("");
    onSubmit?.({ [queryKey]: "" });
    if (syncToUrl) {
      const sp = new URLSearchParams(searchParams.toString());
      sp.delete(queryKey);
      router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
    }
  };

  return (
    <div
      className="relative text-white rounded-md shadow-md"
      style={{ width: typeof width === "number" ? `${width}px` : width }}
    >
      {/* 검색 아이콘 */}
      <Image
        src="/images/search.png"
        alt="search"
        width={18}
        height={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={commit}
      />

      {/* 입력 필드 */}
      <Input
        className="pl-10 pr-10 h-[44px] bg-[#1D1921] border-[#323036]"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") clear();
        }}
      />

      {/* X버튼 */}
      {value && (
        <button
          type="button"
          onClick={clear}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-sm opacity-70 hover:opacity-100"
          aria-label="clear"
        >
          ✕
        </button>
      )}
    </div>
  );
}
