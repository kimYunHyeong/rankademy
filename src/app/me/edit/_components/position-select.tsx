"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Position } from "@/types";
import { POSITION_IMG_URL } from "@/lib/api";
import Image from "next/image";

const positionIcon = (p?: Position) =>
  `${POSITION_IMG_URL}${p?.toLowerCase()}-light.svg`;
const positionIconSelected = (p?: Position) =>
  `${POSITION_IMG_URL}${p?.toLowerCase()}.svg`;

const POSITIONS = [
  "TOP",
  "JUNGLE",
  "MIDDLE",
  "BOTTOM",
  "UTILITY",
] as Position[];

/* 포지션 선택 팝업 */
function PositionSquare({ value }: { value?: Position }) {
  const active = Boolean(value);

  return (
    <div
      className={
        "relative rounded border w-[50px] h-[50px] flex items-center justify-center " +
        (active
          ? "border-[#25242A] bg-[#323036]"
          : "border-[#FF5679] bg-[#25242A]")
      }
    >
      {active ? (
        <Image
          src={positionIconSelected(value)}
          alt={value!}
          width={50}
          height={50}
        />
      ) : null}
      {active && (
        <span className="pointer-events-none absolute inset-0 rounded ring-2 ring-[#25242A]/60" />
      )}
    </div>
  );
}

export default function PositionPicker({
  value,
  onChange,
}: {
  value: Position;
  onChange: (v: Position) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button type="button" className="rounded focus:outline-none">
            <PositionSquare value={value} />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-auto p-2 bg-[#323036] border border-black/60"
        >
          <div className="grid grid-cols-5 gap-2">
            {POSITIONS.map((p) => {
              const active = value === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    onChange(p);
                    setOpen(false);
                  }}
                  className={
                    "relative rounded border w-[46px] h-[46px] flex items-center justify-center transition " +
                    (active
                      ? "border-[#FF5679] bg-[#FF5679]"
                      : "border-[#323036] hover:border-[#FF5679]/60 hover:bg-white/5")
                  }
                  title={p}
                >
                  <Image src={positionIcon(p)} alt={p} width={42} height={42} />
                  {active && (
                    <span className="pointer-events-none absolute inset-0 rounded ring-2 ring-[#FF5679]/60" />
                  )}
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
