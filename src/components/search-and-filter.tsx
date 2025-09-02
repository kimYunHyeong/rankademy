"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

export default function SearchAndFilter() {
  return (
    <div className="text-white mx-auto rounded-md shadow-md">
      <div className="h-2"></div>
      <div className="flex justify-between">
        <Select>
          <SelectTrigger className="w-[140px] h-[44px] bg-[#1D1921]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="competitonWinCnt">대항전 승리순</SelectItem>
            <SelectItem value="competitonCnt">대항전 횟수순</SelectItem>
            <SelectItem value="studentCnt">학생 순</SelectItem>
          </SelectContent>
        </Select>

        <Input
          className="w-[300px] h-[44px] bg-[#1D1921]"
          placeholder="학교 이름"
        />
      </div>
      <div className="h-2"></div>
    </div>
  );
}
