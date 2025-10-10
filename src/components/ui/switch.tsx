"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        // 상태별 색상 정의
        "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border shadow-xs transition-all outline-none",
        // Off 상태
        "data-[state=unchecked]:bg-[#25242A] data-[state=unchecked]:border-white",
        // On 상태
        "data-[state=checked]:bg-transparent data-[state=checked]:border-[#FF5679]",
        // 공통 포커스, 비활성화 스타일
        "focus-visible:ring-[3px] focus-visible:ring-[#FF5679]/40 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-4 rounded-full ring-0 transition-transform",
          // Off 상태
          "data-[state=unchecked]:bg-white data-[state=unchecked]:translate-x-0",
          // On 상태
          "data-[state=checked]:bg-[#FF5679] data-[state=checked]:translate-x-[calc(100%-2px)]"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
