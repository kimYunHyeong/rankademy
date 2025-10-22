"use client";

import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Image from "next/image";
import { POSITION_IMG_URL } from "@/lib/api";

export type FilterOption = { label: string; value: string };

export type FilterOptions = {
  major: FilterOption[];
};

export type FilterValue = {
  major: string;
  admissionYear: string;
  mainPosition: string;
};

const ADMISSION_YEAR_OPTIONS: FilterOption[] = Array.from(
  { length: 2025 - 1979 + 1 },
  (_, i) => {
    const year = 1979 + i;
    const shortYear = String(year).slice(2); // 예: '1979' -> '79'
    return { label: `${shortYear}학번`, value: shortYear };
  }
).reverse();

const POSITION_OPTIONS: FilterOption[] = [
  { label: "탑", value: "TOP" },
  { label: "정글", value: "JUNGLE" },
  { label: "미드", value: "MIDDLE" },
  { label: "바텀", value: "BOTTOM" },
  { label: "서포터", value: "UTILITY" },
];

export default function Filter({
  options,
  value,
  onChange,
}: {
  options: FilterOptions;
  value: FilterValue;
  onChange: (v: FilterValue) => void;
}) {
  const set = (patch: Partial<FilterValue>) => onChange({ ...value, ...patch });

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* 전공 */}
      <Select value={value.major} onValueChange={(v) => set({ major: v })}>
        <SelectTrigger className="w-[190px] bg-[#1D1921] border-[#323036] text-white rounded">
          <SelectValue placeholder="전공" />
        </SelectTrigger>

        <SelectContent className="w-[190px] bg-[#1D1921] border-[#323036] text-white rounded">
          <SelectItem
            key={"all"}
            value={" "}
            className="hover:bg-[#24192F] focus:bg-[#24192F] text-[#323036] focus:text-white "
          >
            {"전공"}
          </SelectItem>
          {options.major.map((o) => (
            <SelectItem
              key={o.value}
              value={o.value}
              className="hover:bg-[#24192F] focus:bg-[#24192F] focus:text-white"
            >
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 학번 */}
      <Select
        value={value.admissionYear}
        onValueChange={(v) => set({ admissionYear: v })}
      >
        <SelectTrigger className="w-[85px] bg-[#1D1921] border-[#323036] text-white rounded">
          <SelectValue placeholder="학번" />
        </SelectTrigger>
        <SelectContent className="w-[85px] bg-[#1D1921] border-[#323036] text-white rounded">
          <SelectItem
            key={"all"}
            value={" "}
            className="hover:bg-[#24192F] focus:bg-[#24192F] text-[#323036] focus:text-white"
          >
            {"학번"}
          </SelectItem>
          {ADMISSION_YEAR_OPTIONS.map((o) => (
            <SelectItem
              key={o.value}
              value={o.value}
              className="hover:bg-[#24192F] focus:bg-[#24192F] focus:text-white"
            >
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* 라인*/}
      <Select
        value={value.mainPosition}
        onValueChange={(v) => set({ mainPosition: v })}
      >
        <SelectTrigger className="w-[85px] bg-[#1D1921] border-[#323036]  text-white rounded">
          <SelectValue placeholder="라인" />
        </SelectTrigger>
        <SelectContent className="w-[85px] bg-[#1D1921] border-[#323036] text-white rounded">
          <SelectItem
            key={"all"}
            value={" "}
            className="hover:bg-[#24192F] focus:bg-[#24192F] text-[#323036] focus:text-white"
          >
            {"학번"}
          </SelectItem>
          {POSITION_OPTIONS.map((o) => (
            <SelectItem
              key={o.value}
              value={o.value}
              className=" hover:bg-[#24192F] focus:bg-[#24192F] focus:text-white"
            >
              <Image
                src={`${POSITION_IMG_URL}${o.value.toLocaleLowerCase()}.svg`}
                alt={o.value.toLocaleLowerCase()}
                width={16}
                height={16}
              />
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
