"use client";
import { SelectProps, SelectOption } from "@/types";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

type SearchBoxProps = {
  onSearch: (q: string) => void;
  placeholder?: string; // 기본값: "학교 이름"
  width?: string | number; // Tailwind 클래스 대신 직접 값 조정 가능
};

export function SearchBox({
  onSearch,
  placeholder = "학교 이름",
  width = 300,
}: SearchBoxProps) {
  const [query, setQuery] = useState("");

  return (
    <div
      className="relative"
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
        onChange={(e) => {
          const value = e.target.value;
          setQuery(value);
          onSearch(value);
        }}
      />
    </div>
  );
}

export function Filter<V = string, M = unknown>({
  value,
  defaultValue,
  onChange,
  options,
  placeholder = "Select",
  valueToString = (v: V) => String(v),
  stringToValue = (s: string, opt?: SelectOption<V, M>) =>
    opt ? (opt.value as V) : (s as unknown as V),
  triggerClassName,
  contentClassName,
  itemClassName,
}: SelectProps<V, M>) {
  const current: string | undefined =
    value !== undefined ? valueToString(value) : undefined;

  const defaultStr: string | undefined =
    defaultValue !== undefined ? valueToString(defaultValue) : undefined;

  return (
    <Select
      value={current}
      defaultValue={defaultStr}
      onValueChange={(s: string) => {
        const matched = options.find(
          (o: SelectOption<V, M>) => valueToString(o.value) === s
        );
        const v = stringToValue(s, matched);
        onChange?.(v, matched?.meta);
      }}
    >
      <SelectTrigger
        className={cn(
          "text-[#B1ACC1] w-[140px] h-[44px] bg-[#1D1921] border-[#323036] rounded-[4px] hover:bg-[#1D1921]",
          triggerClassName
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent
        className={cn(
          "bg-[#1D1921] text-[#B1ACC1] border border-[#323036] rounded-[4px]",
          contentClassName
        )}
      >
        {options.map((opt: SelectOption<V, M>) => (
          <SelectItem
            key={valueToString(opt.value)}
            value={valueToString(opt.value)}
            className={cn(
              "data-[highlighted]:bg-[#2E223F] data-[highlighted]:text-[#B1ACC1] data-[state=checked]:bg-[#2E223F] rounded-[2px]",
              itemClassName
            )}
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

type SearchAndFilterProps<V = string, M = unknown> = {
  /** 검색 텍스트 변경 시 호출 */
  onSearch: (q: string) => void;
  /** 필터(Select)에 그대로 전달할 props */
  filterProps: SelectProps<V, M>;
  className?: string;
};

export default function SearchAndFilter<V = string, M = unknown>({
  onSearch,
  filterProps,
  className = "",
}: SearchAndFilterProps<V, M>) {
  return (
    <div className={cn("text-white mx-auto rounded-md shadow-md", className)}>
      <div className="h-2" />
      <div className="flex justify-between">
        <Filter<V, M> {...filterProps} />
        <SearchBox onSearch={onSearch} />
      </div>
      <div className="h-2" />
    </div>
  );
}
