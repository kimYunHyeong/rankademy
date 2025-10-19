"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

type SearchBoxProps = {
  placeholder?: string;
  width?: string | number;
  onChange?: (value: string) => void;
};

export default function SearchBox({
  placeholder = "학교 이름",
  width = 300,
  onChange,
}: SearchBoxProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onChange?.(value);
  };

  return (
    <div
      className="relative text-white  rounded-md shadow-md"
      style={{ width: typeof width === "number" ? `${width}px` : width }}
    >
      <Image
        src="/images/search.png"
        alt="search"
        width={18}
        height={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
      />

      <Input
        className="pl-10 h-[44px] bg-[#1D1921] border-[#323036]"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}
