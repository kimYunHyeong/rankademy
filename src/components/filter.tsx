"use client";

import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import FallBackImage from "@/components/fallback-img";
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
    return { label: `${String(year).slice(2)}학번`, value: String(year) };
  }
).reverse();

const POSITION_OPTIONS: FilterOption[] = [
  { label: "탑", value: "TOP" },
  { label: "정글", value: "JUNGLE" },
  { label: "미드", value: "MIDDLE" },
  { label: "바텀", value: "BOTTOM" },
  { label: "서포터", value: "UTILITY" },
  { label: "상관 없음", value: "ANY" },
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
      <div className="flex items-center">
        <Select
          value={value.major || undefined}
          onValueChange={(v) => set({ major: v })}
        >
          <SelectTrigger className="w-[190px] bg-[#1D1921] border-[#323036] text-white rounded">
            <SelectValue placeholder="전공" />
          </SelectTrigger>
          <SelectContent className="w-[190px] bg-[#1D1921] border-[#323036] text-white rounded">
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
      </div>

      {/* 학번 */}
      <div className="flex items-center">
        <Select
          value={value.admissionYear || undefined}
          onValueChange={(v) => set({ admissionYear: v })}
        >
          <SelectTrigger className="w-[85px] bg-[#1D1921] border-[#323036] text-white rounded">
            <SelectValue placeholder="학번" />
          </SelectTrigger>
          <SelectContent className="w-[85px] bg-[#1D1921] border-[#323036] text-white rounded">
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
      </div>

      {/* 라인 */}
      <div className="flex items-center">
        <Select
          value={value.mainPosition || undefined}
          onValueChange={(v) => set({ mainPosition: v })}
        >
          <SelectTrigger className="w-[110px] bg-[#1D1921] border-[#323036] text-white rounded">
            <SelectValue placeholder="라인" />
          </SelectTrigger>
          <SelectContent className="w-[110px] bg-[#1D1921] border-[#323036] text-white rounded">
            {POSITION_OPTIONS.map((o) => (
              <SelectItem
                key={o.value}
                value={o.value}
                className="hover:bg-[#24192F] focus:bg-[#24192F] focus:text-white gap-2"
              >
                <span className="inline-flex items-center gap-2">
                  {o.value === "ANY" ? (
                    <FallBackImage
                      src={`/images/position-any-fill.png`}
                      alt={o.value.toLowerCase()}
                      width={16}
                      height={16}
                    />
                  ) : (
                    <FallBackImage
                      src={`${POSITION_IMG_URL}${o.value.toLowerCase()}.svg`}
                      alt={o.value.toLowerCase()}
                      width={16}
                      height={16}
                    />
                  )}

                  {o.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
