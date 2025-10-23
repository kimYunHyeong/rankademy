"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { X } from "lucide-react";

type SearchBoxProps = {
  placeholder?: string;
  width?: string | number;
  onSubmit?: (value: string) => void;
};

export default function SearchBox({
  placeholder,
  width = 300,
  onSubmit,
}: SearchBoxProps) {
  const [query, setQuery] = useState("");

  //  입력 변경 시
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  //  엔터 키 입력 시 검색
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit?.(query.trim());
    }
  };

  //  X 버튼 클릭 시 입력값 초기화
  const handleClear = () => {
    setQuery("");
    onSubmit?.("");
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
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
      />

      {/* 입력창 */}
      <Input
        className="pl-10 pr-8 h-[44px] bg-[#1D1921] border-[#323036] text-white placeholder:text-gray-400"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {/*X 버튼 (입력 있을 때만 표시) */}
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
